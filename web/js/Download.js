const request = require('request');
const fs = require('fs');
const path = require('path');

class StreamDownload {
  constructor () {
    this.downloadCallback = null;
  }

  // 计算chunk
  showProgress (received, total) {
    const percentage = (received * 100) / total;
    if (percentage >= 100) return;
    this.downloadCallback(Math.floor(percentage));
  }

  /** 下载文件函数
   * option 下载文件配置设置
   * option.downloadDir  存储位置 绝对路劲
   * option.downloadFileUrl  下载请求路径 http
   * option.filenName 下载文件名 可不填
   * option.method 下载请求方式 可不填 默认GET 可填post
   * option.data post下可用 需要post的参数
   */
  downloadFile (option, callback) {
    if (!option.downloadDir || !option.downloadFileUrl) return;
    this.downloadCallback = callback;
    // 获取downloadFileUrl 中文件名
    let downArr = option.downloadFileUrl.split('/');
    const downFile = downArr[downArr.length - 1];
    let receivedBytes = 0;
    let totalBytes = 0;
    let obj = {};
    if (!option.method || option.method.toLowerCase() === 'get') {
      obj = {
        method: 'GET',
        uri: option.downloadFileUrl
      };
    } else {
      obj = {
        method: 'POST',
        uri: option.downloadFileUrl,
        body: option.data ? JSON.stringify(option.data) : '',
        headers: { 'Content-Type': 'application/json' }
      };
    }
    const req = request(obj);
    // 下载输出文件位置 和 文件名称
    const out = fs.createWriteStream(
      path.join(
        option.downloadDir, // 下载文件路劲
        option.fileName ? option.fileName : downFile // 文件名称
      )
    );
    req.pipe(out);
    req.on('response', data => {
      totalBytes = parseInt(data.headers['content-length'], 10);
    });
    req.on('data', chunk => {
      receivedBytes += chunk.length;
      this.showProgress(receivedBytes, totalBytes);
    });
    req.on('end', () => {
      this.downloadCallback(100);
    });
  }
}

export default new StreamDownload();
