/** WEB JS 常用工具
 * author: fivexu
 * date: 2019/11/25
 */

/** localStorage 存储
 * set 存
 * get 取
 * remove 指定去除存
 * clear 清空
 */
export const Local = {
  set: (name, data) => {
    if (!name || name === '' || !data) return null;
    window.localStorage.setItem(name, JSON.stringify(data));
  },
  get: name => {
    if (!name || name === '') return null;
    return JSON.parse(window.localStorage.getItem(name));
  },
  clear: () => {
    window.localStorage.clear();
  },
  remove: name => {
    if (!name || name === '') return null;
    window.localStorage.removeItem(name);
  }
};

/** sessionStorage 存储
 * set 存
 * get 取
 * remove 指定去除存
 * clear 清空
 */
export const Session = {
  set: (name, data) => {
    if (!name || name === '' || !data) return null;
    window.sessionStorage.setItem(name, JSON.stringify(data));
  },
  get: name => {
    if (!name || name === '') return null;
    return JSON.parse(window.sessionStorage.getItem(name));
  },
  clear: () => {
    window.sessionStorage.clear();
  },
  remove: name => {
    if (!name || name === '') return null;
    window.sessionStorage.removeItem(name);
  }
};

/** 判断客户端系统
 * 返回 Mac IMAC系统
 * 返回 Unix Unix系统
 * 返回 Linux Linux系统
 * 返回 Win2000 Win2000系统
 * 返回 WinXP WinXP系统
 * 返回 Win2003 Win2003系统
 * 返回 WinVista WinVista系统
 * 返回 Win7 Win7系统
 * 返回 Win10 Win10系统
 */
export const detectOS = () => {
  let sUserAgent = navigator.userAgent;
  let isWin =
    navigator.platform === 'Win32' || navigator.platform === 'Windows';
  let isMac =
    navigator.platform === 'Mac68K' ||
    navigator.platform === 'MacPPC' ||
    navigator.platform === 'Macintosh' ||
    navigator.platform === 'MacIntel';
  if (isMac) return 'Mac';
  let isUnix = navigator.platform === 'X11' && !isWin && !isMac;
  if (isUnix) return 'Unix';
  let isLinux = String(navigator.platform).indexOf('Linux') > -1;
  if (isLinux) return 'Linux';
  if (isWin) {
    let isWin2K =
      sUserAgent.indexOf('Windows NT 5.0') > -1 ||
      sUserAgent.indexOf('Windows 2000') > -1;
    if (isWin2K) return 'Win2000';
    let isWinXP =
      sUserAgent.indexOf('Windows NT 5.1') > -1 ||
      sUserAgent.indexOf('Windows XP') > -1;
    if (isWinXP) return 'WinXP';
    let isWin2003 =
      sUserAgent.indexOf('Windows NT 5.2') > -1 ||
      sUserAgent.indexOf('Windows 2003') > -1;
    if (isWin2003) return 'Win2003';
    let isWinVista =
      sUserAgent.indexOf('Windows NT 6.0') > -1 ||
      sUserAgent.indexOf('Windows Vista') > -1;
    if (isWinVista) return 'WinVista';
    let isWin7 =
      sUserAgent.indexOf('Windows NT 6.1') > -1 ||
      sUserAgent.indexOf('Windows 7') > -1;
    if (isWin7) return 'Win7';
    let isWin10 =
      sUserAgent.indexOf('Windows NT 10.0') > -1 ||
      sUserAgent.indexOf('Windows 10') > -1;
    if (isWin10) return 'Win10';
  }
  return 'other';
};

/** 判断客户端浏览器类型
 * 返回 Opera  Opera 浏览器
 * 返回 FF  Firefox 浏览器
 * 返回 Chrome  Chrome 浏览器
 * 返回 Safari  Safari 浏览器
 * 返回 IE  IE 浏览器
 */
export const browser = () => {
  let userAgent = navigator.userAgent;
  let isOpera = userAgent.indexOf('Opera') > -1;
  if (isOpera) return 'Opera';
  // 判断是否Opera浏览器
  if (userAgent.indexOf('Firefox') > -1) return 'FF';
  // 判断是否Firefox浏览器
  if (userAgent.indexOf('Chrome') > -1) return 'Chrome';
  // 判断是否Safari浏览器
  if (userAgent.indexOf('Safari') > -1) return 'Safari';
  // 判断是否IE浏览器
  if (
    userAgent.indexOf('compatible') > -1 &&
    userAgent.indexOf('MSIE') > -1 &&
    !isOpera
  ) {
    return 'IE';
  }
  return 'other';
};

/** 是否PC端判断
 * 返回 true PC端
 * 返回 false 非PC端
 */
export const isPC = () => {
  let userAgentInfo = navigator.userAgent;
  let Agents = [
    'Android',
    'iPhone',
    'SymbianOS',
    'Windows Phone',
    'iPad',
    'iPod'
  ];
  return !Agents.some(item => {
    return item === userAgentInfo;
  });
};

/** 获取css属性值
 * dom DOM元素
 * attr css 属性名
 */
export const getStyle = (dom, attr) => {
  dom = dom.nodeType ? dom : document.querySelector(dom);
  if (dom.currentStyle) {
    return dom.currentStyle[attr];
  } else {
    return document.defaultView.getComputedStyle(dom, null)[attr];
  }
};

/** 鼠标滚轮兼容
 * callback 回调函数
 * dom 监听滚动在某个dom上 默认 window全局
 */
export const addMouseWheel = (callback, dom = window) => {
  //  let delta = ev.wheelDelta || -ev.detail
  if (navigator.userAgent.toLowerCase().indexOf('firefox') !== -1) {
    dom.addEventListener('DOMMouseScroll', callback, false);
  } else if (dom.addEventListener) {
    dom.addEventListener('mousewheel', callback, false);
  } else if (dom.attachEvent) {
    dom.attachEvent('onmousewheel', callback);
  } else {
    dom.onmousewheel = callback;
  }
};

/** 获取滚动条高度
 * 返回 滚动条位置
 */
export const getScrollTop = () => {
  let scrollTop = 0;
  if (document.documentElement && document.documentElement.scrollTop) {
    scrollTop = document.documentElement.scrollTop;
  } else if (document.body) {
    scrollTop = document.body.scrollTop;
  }
  return scrollTop;
};

// 骇客技术添加css样式
export const prefixStyle = style => {
  let vendor = (() => {
    let transformName = {
      webkit: 'webkitTransform',
      Moz: 'MozTransform',
      O: 'OTransform',
      ms: 'msTransform',
      standard: 'transform'
    };
    for (let key in transformName) {
      let domKey = document.createElement('div').style[transformName[key]];
      if (domKey !== undefined) return key;
    }
    return false;
  })();
  if (vendor === false) return false;
  if (vendor === 'standard') return style;
  return vendor + style.charAt(0).toUpperCase() + style.substr(1);
};

/** 数组<对象> 去重
 * arr 去重数组
 * key 数组中对象 key
 */
export const setArrRepeat = (arr, key) => {
  let obj = {};
  return arr.reduce((cur, next) => {
    if (obj[next[key]] === '') {
      obj[next[key]] = true;
    } else {
      cur.push(next);
    }
    return cur;
  }, []);
};

/*  时间过滤器
 * type 转时间方式  YYYY=年2019 YY=年19 MM=月 DD=天 hh:时 mm:分 ss:秒
 * val 时间格式 可以是时间戳 可以是时间
 * */
export const dateFormat = (type, val) => {
  let date = val ? new Date(/^[0-9]*$/g.test(val) ? val * 1 : val) : new Date();
  let YYYY = date.getFullYear();
  let YY = String(date.getFullYear()).substr(2);
  let m = date.getMonth() + 1;
  let MM = m > 9 ? m : '0' + m;
  let d = date.getDate();
  let DD = d > 9 ? d : '0' + d;
  let h = date.getHours();
  let hh = h > 9 ? h : '0' + h;
  let $m = date.getMinutes();
  let mm = $m > 9 ? $m : '0' + $m;
  let s = date.getSeconds();
  let ss = s > 9 ? s : '0' + s;
  let obj = { YYYY, YY, MM, DD, hh, mm, ss };
  return type.replace(/(YYYY)|(YY)|(MM)|(DD)|(hh)|(mm)|(ss)/g, key => obj[key]);
};

/* 时间差 函数
 * type 时间差显示格式 DD=天 hh=小时 mm=分钟 ss=秒钟 ms=毫秒
 * date 传入时间
 * isUnit 是否需要单位 默认true 需要
 * */
export const getDateDifferent = (type, date, isUnit = true) => {
  date = new Date(date).getTime() - new Date().getTime();
  let day = Math.floor(date / 1000 / 60 / 60 / 24);
  let hour = Math.floor(date / 1000 / 60 / 60) % 24;
  let min = Math.floor(date / 1000 / 60) % 60;
  let sec = Math.floor(date / 1000) % 60;
  let mSec = Math.floor(date) % 1000;
  let DD = day > 9 ? `${day}` : `0${day}`;
  DD = isUnit ? `${DD}天` : DD;
  let hh = hour > 9 ? `${hour}` : `0${hour}`;
  hh = isUnit ? `${hh}时` : hh;
  let mm = min > 9 ? `${min}` : `0${min}`;
  mm = isUnit ? `${mm}分` : mm;
  let ss = sec > 9 ? `${sec}` : `0${sec}`;
  ss = isUnit ? `${ss}秒` : ss;
  let ms = mSec > 9 ? `${mSec}` : `0${mSec}`;
  ms = isUnit ? `${ms}毫秒` : ms;
  let obj = { DD, hh, mm, ss, ms };
  return type.replace(/(DD)|(hh)|(mm)|(ss)|(ms)/g, key => obj[key]);
};

/* 获取文件的后缀名
 * name 带后缀的文件名
 * */
export const getFileType = name => {
  let arr = name.split('.');
  return arr.length <= 1 ? name : arr[arr.length - 1].toLowerCase();
};

/* 获取文件的名字
 * name 带后缀的文件名
 * */
export const getFileName = name => {
  let arr = name.split('.');
  let fileName = '';
  arr.forEach((item, index) => {
    if (index < arr.length - 1) fileName += `${item}.`;
  });
  return fileName.substring(0, fileName.length - 1);
};

/* 文件后缀名 判定 返回布尔值
 * name 传入需要判定的文件后缀名
 * type string *必须逗号(,)分割文件后缀名
 * 返回 true 表示该文件名包含在 type 中
 * */
export const isFileType = (name, type) => {
  if (!name || name === '' || !type || type === '') return false;
  let typeArr = type.split(',');
  let arr = name.split('.');
  let rel = arr.length <= 1 ? name : arr[arr.length - 1];
  return typeArr.some(item => {
    return item.toLowerCase() === rel.toLowerCase();
  });
};

/* 下载文件
 * fileUrl 文件路劲
 * fileName 文件名称 可不填 默认为 下载路径名字
 * */
export const download = (fileUrl, fileName = fileUrl) => {
  fetch(fileUrl).then(res =>
    res.blob().then(blob => {
      let a = document.createElement('a');
      let url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    })
  );
};
