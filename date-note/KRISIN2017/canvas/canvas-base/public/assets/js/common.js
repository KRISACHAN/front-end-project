window.onload=function(){
  var c = document.getElementById("show");
  var ctx = c.getContext("2d");
  var imgDiv = document.getElementById("imgDiv");
  var img = document.getElementById("img");
  var imgWidth = img.offsetWidth;
  var imgHeight = img.offsetHeight;
  c.width = imgWidth;
  c.height = imgHeight;
  $("#imgSelect").change(function(){
    var n = $("#imgSelect").find('option:selected').val();
    var url =$("#img").attr("src","assets/images/"+n+".jpg");
    console.log("assets/images/"+n+".jpg");
  });

  img.onload = function(){
    ctx.drawImage(img,0,0,imgWidth,imgHeight);
    ctx.save();
    ctx.font="25px Microsoft YaHei";
    ctx.fillText(txt,10,50,200);
  }

  $("#imgSelect").change(function(){
    var n = $("#imgSelect").find('option:selected').val();
    var url =$("#img").attr("src","assets/images/"+n+".jpg");
    console.log("assets/images/"+n+".jpg");
  });

  function imgLoad(){
    var txt = $("#mytxt").val();
    console.log(txt);
    ctx.drawImage(img,0,0,imgWidth,imgHeight);
    ctx.save();
    ctx.font="25px Microsoft YaHei";
    ctx.fillText(txt,10,50,300);
    console.log(txt.length);
    if(txt.length>15){
    }
  }

  img.onload = imgLoad;

  function Draw(){
    ctx.clearRect(0,0,imgWidth,imgHeight);
    imgLoad();
  }

  Draw();

  $("#mytxt").keyup(function(){
    Draw();
  });
}
