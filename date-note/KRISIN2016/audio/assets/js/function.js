var KRIS = {
	dom: function(el){
		if( el === document || el === window ) {
			return el;
		}else if( el.indexOf(".") === -1 && el.indexOf("#") === -1 && el.indexOf(" ") === -1 && el.indexOf(">") !== -1 ){
			return document.getElementsByTagName(el)[0];
		}else if(((el.indexOf(".") !== -1  ) && el.indexOf(" ") !== -1 ) || (el.indexOf(">") !== -1 || ((el.indexOf("#") !== -1  ) && el.indexOf(" ") !== -1 ) || (el.indexOf(">") !== -1 ))|| document.querySelectorAll(el).length > 1 ){
			return document.querySelectorAll(el);
		};
		return document.querySelector(el);
	},
	addClass: function(el,className){
		if(el.classList){
			DOMTokenList.prototype.adds = function(tokens) {
				 tokens.split(" ").forEach(function(token) {
						 this.add(token);
				 }.bind(this));
				 return this;
			};
			el.classList.adds(className).toString();
		}else{
			el.className += ' ' + className;
		};
	},
	removeClass: function(el,className){
		if(el.classList){
			DOMTokenList.prototype.removes = function(tokens) {
				 tokens.split(" ").forEach(function(token) {
						 this.remove(token);
				 }.bind(this));
				 return this;
			};
			el.classList.removes(className).toString();
		}else{
			el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
		};
	},
	formatTime: function(seconds){
		var min = Math.floor(seconds / 60),
				second = (seconds % 60).toFixed(2),
				hour, newMin, time;
		if (min > 60) {
			hour = Math.floor(min / 60);
			newMin = (min % 60);
		}
		if (second < 10) {
			second = '0' + second;
		}
		if (min < 10) {
			min = '0' + min;
		};
		return time = hour? (hour + ':' + newMin + ':' + second) : (min + ':' + second);
	}
};

