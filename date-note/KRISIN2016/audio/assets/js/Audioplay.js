window.Audioplay = function(json){
	return new _Audioplay(json).init();
};
function _Audioplay(json){
	json = json || {};
	this.container = json.container || "#container";
	this.number = json.number || 1;
};
_Audioplay.prototype = {
	constructor : _Audioplay,
	init : function(){
		var CANTAIN = KRIS.dom(this.container),
				TIMER = null;
		this.NODE(this.container,this.number);
		TIMER = setInterval(function(){
			KRIS.dom("#progress-time").value = KRIS.formatTime(KRIS.dom("audio").currentTime);
			KRIS.dom("#total-time").value = KRIS.formatTime(KRIS.dom("audio").duration);
			KRIS.dom("audio").volume = KRIS.dom("#sound").value/100;
		},1000);
		TIMER;
		this.GETLRC(this.number-1);
		CANTAIN.addEventListener("click",this.EVENTCLICK.bind(this),false);
		CANTAIN.addEventListener("change",this.EVENTCHANGE.bind(this),false);
	},
	NODE : function(){
		var CONTAINER = KRIS.dom(this.container);
		CONTAINER.innerHTML += "<div>song-name:<span id='song-name'>"+SONGURL[this.number-1][0]+"</span></div>";
		CONTAINER.innerHTML += "<div>progress: <input id='progress' type='range' value='0' min='0' step='1' max='100'></div>";
		CONTAINER.innerHTML += "<div>sound: <input id='sound' type='range' value='100' min='0' max='100'></div>";
		CONTAINER.innerHTML += "<div>progress-time:<input id='progress-time' type='text' value=''></div>";
		CONTAINER.innerHTML += "<div>total-time:<input id='total-time' type='text' value=''></div>";
		CONTAINER.innerHTML += "<input id='start' type='button' value='开始'>";
		CONTAINER.innerHTML += "<input id='end' type='button' value='暂停'>";
		CONTAINER.innerHTML += "<input id='prev' type='button' value='上一首'>";
		CONTAINER.innerHTML += "<input id='next' type='button' value='下一首'>";
		CONTAINER.innerHTML += "<div>第<span id='num'>"+ this.number +"</span>首：<input id='change' type='range' value='1' min='1' max='4'></div>";
		CONTAINER.innerHTML += "<div>";
		CONTAINER.innerHTML += "<p>作者：<span id='author'>"+SONGURL[this.number-1][1]+"</span></p>";
		CONTAINER.innerHTML += "<p>歌词：</p>";
		CONTAINER.innerHTML += "<ul id='lyrics'>";
		CONTAINER.innerHTML += "</ul>";
		CONTAINER.innerHTML += "</div>";
		document.body.appendChild(CONTAINER);
	},
	ValueChange : function(){
		KRIS.dom("#total-time").value = KRIS.formatTime(KRIS.dom("audio").duration);
		KRIS.dom("#song-name").innerText = SONGURL[KRIS.dom("#change").value-1][0];
		KRIS.dom("#author").innerText = SONGURL[KRIS.dom("#change").value-1][1];
	},
	AudioChange : function(){
		KRIS.dom("source").src = "assets/audio/"+SONGURL[KRIS.dom("#change").value-1][0]+".mp3";
		KRIS.dom("#num").innerText = KRIS.dom("#change").value;
		KRIS.dom("audio").currentTime = 0;
		this.ValueChange();
	},
	DataChange : function(){
		KRIS.dom("audio").currentTime = KRIS.dom("#progress").value/100 * KRIS.dom("audio").duration;
		this.PROGRESSVALUE();
	},
	PROGRESSVALUE : function(){
		var Duration = KRIS.dom("audio").duration;
		var CurrentTime = KRIS.dom("audio").currentTime;
		KRIS.dom("#progress").value = CurrentTime/Duration*100;
		if(CurrentTime>=Duration && !KRIS.dom("audio").paused ){
			if(KRIS.dom("#change").value < SONGURL.length ){
				KRIS.dom("#change").value++;
			}else{
				KRIS.dom("#change").value = 0;
			}
			this.AudioChange();
			KRIS.dom("audio").play();
		};
	},
	EVENTCLICK : function(e){
		if(e.target.value === "开始"){
			if( KRIS.dom("audio").currentTime == 0 ){
				this.DataChange();
				this.ValueChange();
				this.GETLRC(KRIS.dom("#change").value-1);
			}
			KRIS.dom("audio").play();
		}else if(e.target.value === "暂停"){
			KRIS.dom("audio").pause();
		}else if(e.target.value === "下一首"){
			if(KRIS.dom("#change").value < SONGURL.length ){
				KRIS.dom("#change").value++;
			}else{
				KRIS.dom("#change").value = 0;
			};
			this.GETLRC(KRIS.dom("#change").value-1);
			this.AudioChange();
		}else if(e.target.value === "上一首"){
			if(KRIS.dom("#change").value == 1){
				KRIS.dom("#change").value = SONGURL.length;
			}else{
				KRIS.dom("#change").value--;
			};
			this.GETLRC(KRIS.dom("#change").value-1);
			this.AudioChange();
		};
	},
	EVENTCHANGE : function(e){
		if(e.target.id === "progress"){
			this.DataChange();
			this.ValueChange();
		}else if(e.target.id === "sound"){
			console.log(e.target.value);
			KRIS.dom("audio").volume = KRIS.dom("#sound").value/100;
		}else if(e.target.id === "change"){
			this.AudioChange();
		};
	},
	GETLRC : function(i){
		KRIS.dom("#lyrics").innerHTML = null;
		SONGLRC[i].forEach(function(item,index,array){
			KRIS.dom("#lyrics").innerHTML+="<li class='lrc"+ index +"'><span class='lrc-time'>"+item[0]+"</span> : <span class='lrc-text'>"+item[1]+"</span></li>";
		});
	}
};
