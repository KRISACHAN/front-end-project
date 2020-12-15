(function(window,document){
    var currentPosition = 0; //记录当前页面位置
    var currentPoint = -1;   //记录当前点的位置
    var pageNow = 1;   //当前页码
    var points = null; //页码数

    var app = {
        init:function(){
           if(/(windows)/i.test(navigator.userAgent)){
               location.href = 'views/pc.html';
           }
           document.addEventListener('DOMContentLoaded',function(){
               points = document.querySelectorAll('.pagenumber div') ;
               app.bindTouchEvent(); //绑定触摸事件
               app.bindBtnClick();   //绑定按钮点击事件
               app.setPageNow();     //设置初始页码
           }.bind(app),false);
        }(),


        bindBtnClick:function(){
            var button = document.querySelector('#testbtn');
            button.addEventListener('touchstart',function(){
                console.log('touch')
            })
            //button.addEventListener('click',function(){
            //    console.log('click')
            //})
        },


        //页面平移
        transform:function(translate){
           this.style.webkitTransform = "translate3d("+translate+"px,0,0)";
           currentPosition = translate;

        },

        /**
         * 设置当前页码
         */
        setPageNow:function(){
            if (currentPoint != -1){
                points[currentPoint].className = '';
            }
            currentPoint = pageNow - 1;
            points[currentPoint].className = 'now';
        },

        /**
         * 绑定触摸事件
         */
        bindTouchEvent:function(){
           var viewport =  document.querySelector('#viewport');
           var pageWidth = window.innerWidth; //页面宽度
           var maxWidth = - pageWidth * (points.length-1); //页面滑动最后一页的位置
           var startX,startY;
           var initialPos = 0;  // 手指按下的屏幕位置
           var moveLength = 0;  // 手指当前滑动的距离
           var direction = "left"; //滑动的方向
           var isMove = false; //是否发生左右滑动
           var startT = 0; //记录手指按下去的时间

           /*手指放在屏幕上*/
           document.addEventListener("touchstart",function(e){
               e.preventDefault();
               var touch = e.touches[0];
               startX = touch.pageX;
               startY = touch.pageY;
               initialPos = currentPosition;   //本次滑动前的初始位置
               viewport.style.webkitTransition = ""; //取消动画效果
               startT = new Date().getTime(); //记录手指按下的开始时间
               isMove = false; //是否产生滑动
           }.bind(this),false);

           /*手指在屏幕上滑动，页面跟随手指移动*/
           document.addEventListener("touchmove",function(e){
               e.preventDefault();
               var touch = e.touches[0];
               var deltaX = touch.pageX - startX;
               var deltaY = touch.pageY - startY;
               //如果X方向上的位移大于Y方向，则认为是左右滑动
               if (Math.abs(deltaX) > Math.abs(deltaY)){
                   moveLength = deltaX;
                   var translate = initialPos + deltaX; //当前需要移动到的位置
                   //如果translate>0 或 < maxWidth,则表示页面超出边界
                   if (translate <=0 && translate >= maxWidth){
                       this.transform.call(viewport,translate);
                       isMove = true;
                   }
                   direction = deltaX>0?"right":"left"; //判断手指滑动的方向
               }
           }.bind(this),false);

           /*手指离开屏幕时，计算最终需要停留在哪一页*/
           document.addEventListener("touchend",function(e){
               e.preventDefault();
               var translate = 0;
               //计算手指在屏幕上停留的时间
               var deltaT = new Date().getTime() - startT;
               if (isMove){ //发生了左右滑动
                    //使用动画过渡让页面滑动到最终的位置
                    viewport.style.webkitTransition = "0.3s ease -webkit-transform";
                    if(deltaT < 300){ //如果停留时间小于300ms,则认为是快速滑动，无论滑动距离是多少，都停留到下一页
                        translate = direction == 'left'?
                        currentPosition-(pageWidth+moveLength):currentPosition+pageWidth-moveLength;
                        //如果最终位置超过边界位置，则停留在边界位置
                        translate = translate > 0 ? 0 : translate; //左边界
                        translate = translate < maxWidth ? maxWidth : translate; //右边界
                    }else {
                        //如果滑动距离小于屏幕的50%，则退回到上一页
                        if (Math.abs(moveLength)/pageWidth < 0.5){
                            translate = currentPosition-moveLength;
                        }else{
                            //如果滑动距离大于屏幕的50%，则滑动到下一页
                            translate = direction == 'left'?
                            currentPosition-(pageWidth+moveLength):currentPosition+pageWidth-moveLength;
                            translate = translate > 0 ? 0 : translate;
                            translate = translate < maxWidth ? maxWidth : translate;
                        }
                    }
                    //执行滑动，让页面完整的显示到屏幕上
                    this.transform.call(viewport,translate);
                    //计算当前的页码
                    pageNow = Math.round(Math.abs(translate) / pageWidth) + 1;

                    setTimeout(function(){
                        //设置页码，DOM操作需要放到子线程中，否则会出现卡顿
                        this.setPageNow();
                    }.bind(this),100);
                }
           }.bind(this),false);
       }
    }
})(window,document);
