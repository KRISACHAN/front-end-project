// JavaScript Document

  setInterval(function(){
	    var time=new Date(),
		    H=time.getHours(),
			M=time.getMinutes(),
			S=time.getSeconds();
		showHours("hours",H,12);
		showHours("minutes",M,30);
		showHours("seconds",S,30);
	  },30)
	  
	  function showHours(oClass,num,n){
		     var aEle=getByClass(oClass)[0].children,
			     Rdeg=num > n ? n : num,
				 Ldeg=num > n ? num - n : 0;
			aEle[2].innerHTML="<span>"+num+"</span>";
			
			aEle[1].children[0].style.transform="rotateZ("+ (360/(2*n)*Rdeg-180) + "deg)";
			aEle[0].children[0].style.transform="rotateZ("+ (360/(2*n)*Ldeg-180) + "deg)";
		  }
		  function getByClass(oClass){
			     return document.getElementsByClassName(oClass);
			  }
  
  
  
   