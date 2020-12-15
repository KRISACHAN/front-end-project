# CANVAS

## **环境开启**

```javascript
const canvas = document.querySelector(canvas tag); // 获取canvas元素
const conetext = canvas.getContext('2d'); // 设置canvas作图环境为2D
canvas.width = 300; // 设置canvas宽度为300px
canvas.height = 300; // 设置canvas高度为300px
```



## 颜色、样式和阴影

| 属性                                       | 描述                   |
| ---------------------------------------- | -------------------- |
| [fillStyle](http://www.w3school.com.cn/tags/canvas_fillstyle.asp) | 设置或返回用于填充绘画的颜色、渐变或模式 |
| [strokeStyle](http://www.w3school.com.cn/tags/canvas_strokestyle.asp) | 设置或返回用于笔触的颜色、渐变或模式   |
| [shadowColor](http://www.w3school.com.cn/tags/canvas_shadowcolor.asp) | 设置或返回用于阴影的颜色         |
| [shadowBlur](http://www.w3school.com.cn/tags/canvas_shadowblur.asp) | 设置或返回用于阴影的模糊级别       |
| [shadowOffsetX](http://www.w3school.com.cn/tags/canvas_shadowoffsetx.asp) | 设置或返回阴影距形状的水平距离      |
| [shadowOffsetY](http://www.w3school.com.cn/tags/canvas_shadowoffsety.asp) | 设置或返回阴影距形状的垂直距离      |

| 方法                                       | 描述                   |
| ---------------------------------------- | -------------------- |
| [createLinearGradient()](http://www.w3school.com.cn/tags/canvas_createlineargradient.asp) | 创建线性渐变（用在画布内容上）      |
| [createPattern()](http://www.w3school.com.cn/tags/canvas_createpattern.asp) | 在指定的方向上重复指定的元素       |
| [createRadialGradient()](http://www.w3school.com.cn/tags/canvas_createradialgradient.asp) | 创建放射状/环形的渐变（用在画布内容上） |
| [addColorStop()](http://www.w3school.com.cn/tags/canvas_addcolorstop.asp) | 规定渐变对象中的颜色和停止位置      |



## 线条样式

| 属性                                       | 描述                   |
| ---------------------------------------- | -------------------- |
| [lineCap](http://www.w3school.com.cn/tags/canvas_linecap.asp) | 设置或返回线条的结束端点样式       |
| [lineJoin](http://www.w3school.com.cn/tags/canvas_linejoin.asp) | 设置或返回两条线相交时，所创建的拐角类型 |
| [lineWidth](http://www.w3school.com.cn/tags/canvas_linewidth.asp) | 设置或返回当前的线条宽度         |
| [miterLimit](http://www.w3school.com.cn/tags/canvas_miterlimit.asp) | 设置或返回最大斜接长度          |



## 矩形

| 方法                                       | 描述             |
| ---------------------------------------- | -------------- |
| [rect()](http://www.w3school.com.cn/tags/canvas_rect.asp) | 创建矩形           |
| [fillRect()](http://www.w3school.com.cn/tags/canvas_fillrect.asp) | 绘制“被填充”的矩形     |
| [strokeRect()](http://www.w3school.com.cn/tags/canvas_strokerect.asp) | 绘制矩形（无填充）      |
| [clearRect()](http://www.w3school.com.cn/tags/canvas_clearrect.asp) | 在给定的矩形内清除指定的像素 |



## 路径

| 方法                                       | 描述                                |
| ---------------------------------------- | --------------------------------- |
| [fill()](http://www.w3school.com.cn/tags/canvas_fill.asp) | 填充当前绘图（路径）                        |
| [stroke()](http://www.w3school.com.cn/tags/canvas_stroke.asp) | 绘制已定义的路径                          |
| [beginPath()](http://www.w3school.com.cn/tags/canvas_beginpath.asp) | 起始一条路径，或重置当前路径                    |
| [moveTo()](http://www.w3school.com.cn/tags/canvas_moveto.asp) | 把路径移动到画布中的指定点，不创建线条               |
| [closePath()](http://www.w3school.com.cn/tags/canvas_closepath.asp) | 创建从当前点回到起始点的路径                    |
| [lineTo()](http://www.w3school.com.cn/tags/canvas_lineto.asp) | 添加一个新点，然后在画布中创建从该点到最后指定点的线条       |
| [clip()](http://www.w3school.com.cn/tags/canvas_clip.asp) | 从原始画布剪切任意形状和尺寸的区域                 |
| [quadraticCurveTo()](http://www.w3school.com.cn/tags/canvas_quadraticcurveto.asp) | 创建二次贝塞尔曲线                         |
| [bezierCurveTo()](http://www.w3school.com.cn/tags/canvas_beziercurveto.asp) | 创建三次方贝塞尔曲线                        |
| [arc()](http://www.w3school.com.cn/tags/canvas_arc.asp) | 创建弧/曲线（用于创建圆形或部分圆）                |
| [arcTo()](http://www.w3school.com.cn/tags/canvas_arcto.asp) | 创建两切线之间的弧/曲线                      |
| [isPointInPath()](http://www.w3school.com.cn/tags/canvas_ispointinpath.asp) | 如果指定的点位于当前路径中，则返回 true，否则返回 false |



## 转换

| 方法                                       | 描述                            |
| ---------------------------------------- | ----------------------------- |
| [scale()](http://www.w3school.com.cn/tags/canvas_scale.asp) | 缩放当前绘图至更大或更小                  |
| [rotate()](http://www.w3school.com.cn/tags/canvas_rotate.asp) | 旋转当前绘图                        |
| [translate()](http://www.w3school.com.cn/tags/canvas_translate.asp) | 重新映射画布上的 (0,0) 位置             |
| [transform()](http://www.w3school.com.cn/tags/canvas_transform.asp) | 替换绘图的当前转换矩阵                   |
| [setTransform()](http://www.w3school.com.cn/tags/canvas_settransform.asp) | 将当前转换重置为单位矩阵。然后运行 transform() |



## 文本

| 属性                                       | 描述                   |
| ---------------------------------------- | -------------------- |
| [font](http://www.w3school.com.cn/tags/canvas_font.asp) | 设置或返回文本内容的当前字体属性     |
| [textAlign](http://www.w3school.com.cn/tags/canvas_textalign.asp) | 设置或返回文本内容的当前对齐方式     |
| [textBaseline](http://www.w3school.com.cn/tags/canvas_textbaseline.asp) | 设置或返回在绘制文本时使用的当前文本基线 |

| 方法                                       | 描述             |
| ---------------------------------------- | -------------- |
| [fillText()](http://www.w3school.com.cn/tags/canvas_filltext.asp) | 在画布上绘制“被填充的”文本 |
| [strokeText()](http://www.w3school.com.cn/tags/canvas_stroketext.asp) | 在画布上绘制文本（无填充）  |
| [measureText()](http://www.w3school.com.cn/tags/canvas_measuretext.asp) | 返回包含指定文本宽度的对象  |



## 图像绘制

| 方法                                       | 描述             |
| ---------------------------------------- | -------------- |
| [drawImage()](http://www.w3school.com.cn/tags/canvas_drawimage.asp) | 向画布上绘制图像、画布或视频 |



## 像素操作

| 属性                                       | 描述                              |
| ---------------------------------------- | ------------------------------- |
| [width](http://www.w3school.com.cn/tags/canvas_imagedata_width.asp) | 返回 ImageData 对象的宽度              |
| [height](http://www.w3school.com.cn/tags/canvas_imagedata_height.asp) | 返回 ImageData 对象的高度              |
| [data](http://www.w3school.com.cn/tags/canvas_imagedata_data.asp) | 返回一个对象，其包含指定的 ImageData 对象的图像数据 |

| 方法                                       | 描述                                 |
| ---------------------------------------- | ---------------------------------- |
| [createImageData()](http://www.w3school.com.cn/tags/canvas_createimagedata.asp) | 创建新的、空白的 ImageData 对象              |
| [getImageData()](http://www.w3school.com.cn/tags/canvas_getimagedata.asp) | 返回 ImageData 对象，该对象为画布上指定的矩形复制像素数据 |
| [putImageData()](http://www.w3school.com.cn/tags/canvas_putimagedata.asp) | 把图像数据（从指定的 ImageData 对象）放回画布上      |



## 合成

| 属性                                       | 描述                    |
| ---------------------------------------- | --------------------- |
| [globalAlpha](http://www.w3school.com.cn/tags/canvas_globalalpha.asp) | 设置或返回绘图的当前 alpha 或透明值 |
| [globalCompositeOperation](http://www.w3school.com.cn/tags/canvas_globalcompositeoperation.asp) | 设置或返回新图像如何绘制到已有的图像上   |



## 其他

| 方法            | 描述              |
| ------------- | --------------- |
| save()        | 保存当前环境的状态       |
| restore()     | 返回之前保存过的路径状态和属性 |
| createEvent() |                 |
| getContext()  |                 |
| toDataURL()   |                 |