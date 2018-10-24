/*地鼠*/
var Dishu = function(imgs){
	this.imgArr = imgs;
	this.random = parseInt(Math.random()*this.imgArr.length);
	this.img = this.imgArr[this.random];
	// 记录地鼠的宽高
	this.width = this.img.width/5;
	this.height = this.img.height;
	// 地鼠的生命周期
	this.liveTime = 0;
	// 地鼠生长状态
	this.lifeState = 0;
}
// 地鼠生长
Dishu.prototype.growUp = function(){
	this.liveTime ++;
	if(this.liveTime < 10){
		this.lifeState = 0;
	}else if(this.liveTime < 20){
		this.lifeState = 1;
	}else if(this.liveTime < 40){
		if(this.liveTime % 2){
			this.lifeState = 2;
		}else{
			this.lifeState = 3;
		}
	}else if(this.liveTime < 50){
		
	}else{
		this.reset();
	}
}
// 重置地鼠
Dishu.prototype.reset = function(){
	this.lifeState = 0;
	this.liveTime = 0;
	this.random = parseInt(Math.random()*this.imgArr.length);
	this.img = this.imgArr[this.random];
	this.width = this.img.width/5;
	this.height = this.img.height;
}
