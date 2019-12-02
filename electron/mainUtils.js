/** electron 主进程 函数 初始化配置
 * auther: fivexu
 * Date: 2019/11/22
 */

import { ipcMain, screen, Tray, Menu, globalShortcut } from "electron";
const path = require("path");

/** 系统初始化方法
 * render端 调用
 * minWin 窗口最小化
 * maxWin 窗口 最小化/最大化 切换
 * closeWin 关闭窗口
 * showWin 显示窗口
 */
export const init = mainWindow => {
  // 控制台快捷键 ctrl+alt+shift+F12
  globalShortcut.register("CommandOrControl+Alt+Shift+f12", () => {
    mainWindow.webContents.openDevTools({ mode: "detach" });
  });
  // 最小化窗口
  ipcMain.on("minWin", () => {
    mainWindow.minimize();
  });
  // 关闭窗口
  ipcMain.on("closeWin", () => {
    mainWindow.close();
  });
  // 显示并聚焦窗口
  ipcMain.on("showWin", () => {
    mainWindow.show();
  });
  // 最大化窗口 最小化窗口 切换
  ipcMain.on("maxWin", () => {
    let off = mainWindow.isMaximized();
    if (off) {
      mainWindow.unmaximize();
      mainWindow.center();
    } else {
      mainWindow.maximize();
    }
  });
};

/** 系统拖动事件
 * @param {Object} mainWindow  主进程窗口实例
 * @param {Boolean} isScreen 是否限制拖动位置 true将无限制超出屏幕拖动
 * 渲染层中 $drag 使用
 */
export const drag = (mainWindow, isScreen = false) => {
  ipcMain.on("drag", (event, dis) => {
    const position = mainWindow.getPosition();
    const getSize = mainWindow.getSize();
    const screen = getDisplay();
    let x = position[0] + dis.disX;
    let y = position[1] + dis.disY;
    let currentWin = getDisplayMatching(x, y).workAreaSize;
    if (isScreen && x <= 0) x = 0;
    if (isScreen && x >= screen.width - getSize[0]) {
      x = screen.width - getSize[0];
    }
    if (isScreen && y >= currentWin.height - getSize[1]) {
      y = currentWin.height - getSize[1];
    }
    if (isScreen && y <= 0) y = 0;
    mainWindow.setPosition(x, y);
  });
};

/** 获取用户窗口大小
 * @returns {width,height}  {宽,高}
 */
export const getDisplay = () => {
  const displayArr = screen.getAllDisplays();
  let width = 0;
  let height = 0;
  displayArr.forEach(item => {
    width += Math.abs(item.workAreaSize.width);
    height += item.workAreaSize.height;
  });
  return { width, height };
};

/** 通过鼠标位置 判断当前鼠标在哪个屏幕 (多屏幕兼容)
 * @param {Number} x: 鼠标X轴
 * @param {Number} y: 鼠标Y轴
 */
export const getDisplayMatching = (x = 0, y = 0) => {
  return screen.getDisplayMatching({ x: x, y: y, width: 0, height: 0 });
};

/** 设置窗口大小
 * @param {Object} mainWindow 主窗口
 * @param {Boolean} isResize: 是否用户是否还能改变窗口大小
 */
export const setSize = (mainWindow, isResize = false) => {
  ipcMain.on("setSize", (event, sizeArr) => {
    // 开启可以改变大小
    if (isResize) mainWindow.setResizable(true);
    mainWindow.setSize(sizeArr[0], sizeArr[1]);
    mainWindow.setMinimumSize(sizeArr[0], sizeArr[1]);
    mainWindow.setMaximumSize(sizeArr[0], sizeArr[1]);
    toCenter(sizeArr[0], sizeArr[1], mainWindow);
    // 关闭可以改变大小
    if (isResize) mainWindow.setResizable(false);
  });
};

/** 将窗口定位到中间
 * @param {Number} width: 当前窗口宽度
 * @param {Number} height: 当前窗口高度
 * @param {Object} mainWindow: 主窗口
 */
export const toCenter = (width, height, mainWindow) => {
  // 当前定位
  const position = mainWindow.getPosition();
  // 获取当前屏幕大小
  const getScreenSize = getDisplayMatching(position[0], position[1])
    .workAreaSize;
  // 获取当前屏幕id
  const currentId = getDisplayMatching(position[0], position[1]).id;
  if (position[0] <= getScreenSize.width) {
    const disW = (getScreenSize.width - width) / 2;
    const disH = (getScreenSize.height - height) / 2;
    mainWindow.setPosition(disW, disH);
  } else {
    let currentWidth = 0;
    let currentHeight = 0;
    screen.getAllDisplays().forEach(item => {
      item.id === currentId
        ? (currentHeight = item.workAreaSize.height)
        : (currentWidth = item.workAreaSize.width);
    });
    const disW = currentWidth + (getScreenSize.width - width) / 2;
    const disH = (currentHeight - height) / 2;
    mainWindow.setPosition(disW, disH);
  }
};

/** 系统托盘
 * 内置两个 render端调用
 * prompt-start 图片闪烁开始
 * prompt-end 图片闪烁结束
 */
export const initMenu = () => {
  let trayMenuTemplate = [
    {
      label: "退出",
      click: () => {
        this.mainWindow.close();
      }
    }
  ];
  let appTray = new Tray(path.join(__static, "./icon.ico"));
  const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);
  appTray.setToolTip("译图转排王");
  appTray.setContextMenu(contextMenu);
  appTray.on("click", () => {
    this.mainWindow.show();
    clearInterval(timer);
    appTray.setImage(path.join(__static, "./icon.ico"));
  });
  let timer = null;
  // 图标闪烁 开始
  ipcMain.on("prompt-start", event => {
    clearInterval(timer);
    let n = 0;
    timer = setInterval(() => {
      n++;
      n % 2
        ? appTray.setImage(path.join(__static, "./empty.ico"))
        : appTray.setImage(path.join(__static, "./icon.ico"));
    }, 300);
  });
  // 图标闪烁 关闭
  ipcMain.on("prompt-end", () => {
    clearInterval(timer);
    appTray.setImage(path.join(__static, "./icon.ico"));
  });
};
