/** rem 字体实时转化函数 用于移动端
 * author: fivexu
 * date: 2019/11/25
 */

((doc = document, win = window) => {
  let docEl = doc.documentElement;
  let resizeEvt =
    'orientationchange' in window ? 'orientationchange' : 'resize';
  let recalc = function () {
    let clientWidth = docEl.clientWidth;
    if (!clientWidth) return;
    if (clientWidth >= 1920) {
      docEl.style.fontSize = '100px';
    } else {
      docEl.style.fontSize = 100 * (clientWidth / 1920) + 'px';
    }
  };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})();
