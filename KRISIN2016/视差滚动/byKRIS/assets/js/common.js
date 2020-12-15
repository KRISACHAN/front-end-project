function dom(el){
	if( el === document || el === window ) {
		return el;
	}else if( el.indexOf(".") === -1 && el.indexOf("#") === -1 && el.indexOf(" ") === -1 && el.indexOf(">") !== -1 ){
		return document.getElementsByTagName(el)[0];
	}else if(((el.indexOf(".") !== -1  ) && el.indexOf(" ") !== -1 ) || (el.indexOf(">") !== -1 || ((el.indexOf("#") !== -1  ) && el.indexOf(" ") !== -1 ) || (el.indexOf(">") !== -1 )) || document.querySelectorAll(el).length > 1 ){
		return document.querySelectorAll(el);
	};
	return document.querySelector(el);
};

function FzResize(){
	document.documentElement.style.fontSize = window.innerHeight/10 + "px";
	dom(".bg").forEach(function(e){
		e.style.height = window.innerHeight + "px";
	});
};

function siblings(element,fn) {
	var aTmp = [], oParent = element.parentElement || element.parentNode, i;
	for(i = 0; i < oParent.children.length; i++) {
		element != oParent.children[i] && aTmp.push(oParent.children[i]);
	}
	fn && aTmp.forEach(fn);
	return aTmp;
};

function Offset(el){
	var obj = dom(el);
	var scrollTop = obj.getBoundingClientRect().top+document.body.scrollTop+document.documentElement.scrollTop;
	var scrollLeft = obj.getBoundingClientRect().left+document.body.scrollLeft+document.documentElement.scrollLeft;
	return {
		top: scrollTop,
		left: scrollLeft
	}
};


function Animate(){
	console.log(Offset(".bg1").top);
};

(function(){
	if(!!document.addEventListener){
		document.addEventListener("DOMContentLoaded",FzResize,false);
		window.addEventListener("resize",FzResize,false);
		window.addEventListener('scroll',Animate,false);
	}else{
		document.attachEvent("onDOMContentLoaded",FzResize);
		window.attachEvent("onresize",FzResize);
		window.attachEvent('scroll',Animate);
	};
}());
