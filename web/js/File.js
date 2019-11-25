/** node fs 模块 读写数据 函数
 * author: fivexu
 * date: 2019/11/25
 */

const fs = require('fs');
const path = require('path');

const pathJoin = url => {
  // __static electron 专用
  return path.join(__static, url);
};

/* 写入文件
 * url 创建或写入文件地址
 * data 写人的内容 此项目多用于json  默认会转为json 字符串
 * isObject 写人非json时为false
 * */
export const writeFile = (url, data, isObject = true) => {
  return new Promise((resolve, reject) => {
    data = isObject ? JSON.stringify(data) : data;
    fs.writeFile(pathJoin(url), data, 'utf8', err => {
      if (err) {
        reject(err);
        throw err;
      }
      resolve(data);
    });
  });
};

/* 读取文件 promise 异步处理
 * url 创建或写入文件地址
 * isObject 写人非json时为false
 * isUrl 读取路劲是否已经是绝对路径
 * */
export const readFileSync = (url, isObject = true, isUrl = false) => {
  return new Promise((resolve, reject) => {
    try {
      let data = fs.readFileSync(isUrl ? url : pathJoin(url), 'utf-8');
      data = isObject ? JSON.parse(data.toString()) : data;
      resolve(data);
    } catch (err) {
      reject(err);
    }
  });
};

/* 删除文件
 * url 要删除文件的绝对路劲
 * */
export const deleteFile = url => {
  return new Promise((resolve, reject) => {
    fs.unlink(url, err => {
      if (err) reject(err);
      resolve();
    });
  });
};

/* 判定当前文件是否已经被删除
 * url 需要判定的文件绝对路劲
 * */
export const isAccessFile = url => {
  try {
    fs.accessSync(url, fs.constants.R_OK | fs.constants.W_OK);
    return true;
  } catch (err) {
    return false;
  }
};

/* 判定当前文件是否已经被删除
 * url 需要判定的文件绝对路劲
 * */
export const isExists = url => {
  return fs.existsSync(url);
};

/* 重命名文件
 * 原文件绝对路劲 (包含名字)
 * 重命名 名字 (包含名字)
 * */
export const rename = (name, rename) => {
  return new Promise((resolve, reject) => {
    try {
      isAccessFile(name);
      console.log(isAccessFile(name));
    } catch (err) {
      reject(err);
    }
    fs.rename(name, rename, err => {
      if (err) reject(err);
      resolve();
    });
  });
};
