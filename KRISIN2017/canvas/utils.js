'use strict';
var _UTILS = (function (win, doc) {

  // 捕获坐标的方法 
  // PC 鼠标
  var _CAPTUREMOUSE = function (el) {
    var mouse = {
      x: 0,
      y: 0
    };

    var isTouch = 'ontouchstart' in win ? true : false;

    el.addEventListener(
      'mousemove', 
      function (ev) {
        var x = ev.pageX ? ev.pageX : ev.clientX + doc.body.scrollLeft + doc.documentElement.scrollLeft,
           y = ev.pageY ? ev.pageY : ev.clientY + doc.body.scrollTop + doc.documentElement.scrollTop;

        // 将当前的坐标值减去元素的偏移位置
        x -= el.offsetLeft;
        y -= el.offsetTop;

        mouse.x = x;
        mouse.y = y;
      }, 
      false
    );

    return mouse;
  };

  // 移动 touch
  var _CAPTURETOUCH = function (el) {
    var touch = {
      x: null,
      y: null,
      isPressed: false,
      event: null
    };

    var body_scrollLeft = doc.body.scrollLeft,
        el_scrollLeft = doc.documentElement.scrollLeft,
        body_scrollTop = doc.body.scrollTop,
        el_scrollTop = doc.documentElement.scrollTop,
        offsetLeft = el.offsetLeft,
        offsetTop = el.offsetTop;

    el.addEventListener(
      'touchstart',
      function (ev) {
        touch.isPressed = true;
        touch.event = ev;
      },
      false
    );

    el.addEventListener(
      'touchstart',
      function (ev) {
        touch.isPressed = false;
        touch.x = null;
        touch.y = null;
        touch.event = ev;
      },
      false
    );

    el.addEventListener(
      'touchmove', 
      function (ev) {
        var x, 
            y,
            touch_event = ev.touches[0];
        x = touch_event.pageX ? touch_event.pageX : touch_event.clientX + body_scrollLeft + el_scrollLeft;
        y = touch_event.pageY ? touch_event.pageY : touch_event.clientY + body_scrollLeft + el_scrollLeft;

        //减去偏移量
        x -= offsetLeft;
        y -= offsetTop;
        touch.x = x;
        touch.y = y;
        touch.event = event;
      }, 
      false
    );
  //返回touch对象
    return touch;
  };

  return {
    captureMouse: _CAPTUREMOUSE,
    captureTouch: _CAPTURETOUCH
  };
})(window, document);

window.utils = _UTILS;