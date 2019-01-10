import '../css/index.css';
import '../sass/index.scss';

const scale = 1 / window.devicePixelRatio
document.querySelector('meta[name="viewport"]').setAttribute('content', 'width=device-width,initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no')
document.documentElement.style.fontSize = document.documentElement.clientWidth / 10 + 'px'
const CW = document.documentElement.clientWidth
const CH = document.documentElement.clientHeight
const WSW = window.screen.width
const WSH = window.screen.height
const WIW = window.innerWidth
const WIH = window.innerHeight
const OW = document.documentElement.offsetWidth
const OH = document.documentElement.offsetHeight
const SW = document.documentElement.scrollWidth
const SH = document.documentElement.scrollHeight
console.log(`
  布局视口宽度：${CW},
  布局视口高度：${CH},
  屏幕分辨率宽度：${WSW},
  屏幕分辨率高度：${WSH},
  浏览器视口宽度：${WIW},
  浏览器视口高度：${WIH},
  元素可见区域 + 边框 + 滚动条宽度：${OW},
  元素可见区域 + 边框 + 滚动条高度：${OH},
  元素实际宽度：${SW},
  元素实际高度：${SH}
`)