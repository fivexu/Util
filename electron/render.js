/** electron 渲染层 函数 初始化配置
 * auther: fivexu
 * Date: 2019/11/22
 */

import { ipcRenderer, shell } from "electron";
/** 系统拖动 配合main主进程 drag
 * 直接在vue中引入即可
 */
export const $drag = {
  initDrag: false,
  dragStartX: 0,
  dragStartY: 0,
  mouseDown: ev => {
    ev = ev || event;
    ev.stopPropagation();
    ev.preventDefault();
    $drag.initDrag = true;
    $drag.dragStartX = ev.clientX;
    $drag.dragStartY = ev.clientY;
    document.addEventListener("mousemove", $drag.mouseMove);
    document.addEventListener("mouseup", $drag.mouseUp);
  },
  mouseMove: ev => {
    ev = ev || event;
    ev.stopPropagation();
    ev.preventDefault();
    if (!$drag.initDrag) return;
    let disX = ev.clientX - $drag.dragStartX;
    let disY = ev.clientY - $drag.dragStartY;
    ipcRenderer.send("drag", { disX, disY });
  },
  mouseUp: ev => {
    ev = ev || event;
    ev.stopPropagation();
    ev.preventDefault();
    $drag.initDrag = false;
    $drag.dragStartX = 0;
    $drag.dragStartY = 0;
    document.removeEventListener("mousemove", $drag.mouseMove, true);
    document.removeEventListener("mouseup", $drag.mouseUp, true);
  }
};

/** 系统打开 本地文件
 * @param {String} fileUrl 本地文件的绝对路径
 * */
export const $openFile = fileUrl => {
  return new Promise((resolve, reject) => {
    try {
      shell.openItem(fileUrl);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};

/** 系统打开 本地文件夹
 * @param {String} fileUrl 本地文件夹的绝对路径
 * */
export const $openDir = fileUrl => {
  return new Promise((resolve, reject) => {
    try {
      shell.showItemInFolder(fileUrl);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};
