var WINDOW_WIDTH=1024;
var WINDOW_HEIGHT=768;
var RADIUS=8;
var MARGIN_TOP=60;
var MARGIN_LEFT=30;
window.onload=function(){
    var canvas=document.getElementById('canvas');
    var context=canvas.getContext("2d");
    canvas.width=WINDOW_WIDTH;
    canvas.height=WINDOW_HEIGHT;
    render(context);
}
function render(cxt){
    renderDigit(MARGIN_LEFT+5*(RADIUS+1),MARGIN_TOP,parseInt(10%10),cxt);
    renderDigit(MARGIN_LEFT+25*(RADIUS+1),MARGIN_TOP,parseInt(11%10),cxt);
    renderDigit(MARGIN_LEFT+40*(RADIUS+1),MARGIN_TOP,parseInt(12%10),cxt);
    renderDigit(MARGIN_LEFT+55*(RADIUS+1),MARGIN_TOP,parseInt(13%10),cxt);
    renderDigit(MARGIN_LEFT+70*(RADIUS+1),MARGIN_TOP,parseInt(14%10),cxt);
    renderDigit(MARGIN_LEFT+90*(RADIUS+1),MARGIN_TOP,parseInt(15%10),cxt);
}
function renderDigit(x,y,num,cxt){
    cxt.fillStyle="rgb(0,102,153)";
    for(var i=0;i<digit[num].length;i++){
        for(var j=0;j<digit[num][i].length;j++){
            if(digit[num][i][j]==1){
                cxt.beginPath();
                cxt.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS+1),RADIUS,0,2*Math.PI);
                cxt.closePath();
                cxt.fill();
            };
        }
    }
};
