window.onload=function(){
    var content=document.getElementById('content');
    var oDiv=content.getElementsByTagName("div");
    var firstDiv=oDiv[0];
    var divisscrolling=false;
    var movingValue=0;
    var requestAnimationFrameId;
    var currentDivFrame=0;
    var divFrameLength=oDiv.length;
    var wheelTimerID=null;
    content.addEventListener("wheel",wheelListener,false);
    //控制wheel时间间隔,如果一定时间内没有没有变化
    var getScrollDownFlag=(function(){
        var scrollDownFlag=false;
        return function(deltaYIn){
            if(deltaYIn<0){
                scrollDownFlag=false;
            }else if(deltaYIn>0){
                scrollDownFlag=true;
            }
            return scrollDownFlag;
        }
    }());            
    function wheelListener(event){
        clearTimeout(wheelTimerID);
        var scrollDownFlag=getScrollDownFlag(event.deltaY);
        wheelTimerID=setTimeout(function(){
            if(divisscrolling){
                event.preventDefault();
                return;
            }
        doWhenWheelEvent(scrollDownFlag);
        },100);
    }
    function doWhenWheelEvent(scrollDownFlag){
        console.log(scrollDownFlag,divisscrolling);
        if(!divisscrolling&&(currentDivFrame>=0&&currentDivFrame<=divFrameLength-1)){
        //console.log(scrollDownFlag,currentDivFrame);
            if((scrollDownFlag&&currentDivFrame<divFrameLength-1)||(!scrollDownFlag&&currentDivFrame>0&&currentDivFrame<=divFrameLength-1)){
                divisscrolling=true;
                content.removeEventListener("wheel",wheelListener,false);
                doScorllAnimation(scrollDownFlag);
            }
        }
    }
    function doScorllAnimation(scrollDownFlag){
        if(movingValue+10<=100){
            movingValue=movingValue+10;
            firstDiv.style.marginTop=((currentDivFrame)*100*-1+(movingValue)*(scrollDownFlag?-1:1))+"vh";
            requestAnimationFrameId=requestAnimationFrame(doScorllAnimation.bind(null,scrollDownFlag));
        }else{
            divisscrolling=false;
            movingValue=0;
            content.addEventListener("wheel",wheelListener,false);
            currentDivFrame=currentDivFrame+(scrollDownFlag?1:-1);
        }
    }
};
