/*Game中介者*/
var Game = function(ctx,bg,logo,ui,dishu,chuizi,life,life1,num_1,num_2,gameover,audio){
	// 刷子
	this.ctx = ctx;
	// 背景
	this.bg = bg;
	// logo
	this.logo = logo;
	// 文字集
	this.ui = ui;
	// 地鼠
	this.dishu = dishu;
	// 锤子
	this.chuizi = chuizi;
	// 心
	this.life = life;
	// 乘号
	this.life1 = life1;
	// 结束背景
	this.gameover = gameover;
	// 背景音乐
	this.audio = audio;
	// 音乐开关
	this.musicLock = false;
	// 菜单开关
	this.menuLock = false;
	// 游戏开关
	this.gameLock = false;
	// 定义一个生命数
	this.lifeCount = 3;
	// 定义一个得分数
	this.score = 0;
	// 生命数字
	this.num_1 = num_1;
	// 得分数字
	this.num_2 = num_2;
	// 坑位数组
	this.keng = [{x:87,y:50},{x:87,y:110},{x:7,y:110},{x:168,y:107},{x:87,y:175}];
	// 坑位随机数
	this.randomK = parseInt(Math.random()*this.keng.length);
	// 调用方法
	this.init();
	// 定义Game自有的帧数
	this.iframes = 0;
	// 记录地鼠的位置信息
	this.dishuX = 0;
	this.dishuY = 0;
	// 定义一个打中状态
	this.hited = false;
	// 定义一个定时器
	this.timer = null;
}
// 调用方法的介体
Game.prototype.init = function(){
	this.randerBg();
	// this.randerDishu();
	this.randerLogo();
	this.randerGo();
	this.goEvent();
	this.menuEvent();
}
// 背景渲染
Game.prototype.randerBg = function(){
	this.ctx.drawImage(this.bg,0,0,this.bg.width,this.bg.height);
	// this.audio.play();
}
// logo渲染
Game.prototype.randerLogo = function(){
	this.ctx.drawImage(this.logo,0,0,this.logo.width,this.logo.height);
}
// 游戏开关渲染
Game.prototype.randerGo = function(){
	this.ctx.drawImage(this.ui,0,0,60,16,this.logo.width/2-30,this.logo.height,60,16);
}
// 绘制地鼠
Game.prototype.randerDishu = function(){
	this.dishuX = this.keng[this.randomK].x;
	this.dishuY = this.keng[this.randomK].y;
	this.ctx.drawImage(this.dishu.img,this.dishu.lifeState*this.dishu.width,0,this.dishu.width,this.dishu.height,this.keng[this.randomK].x,this.keng[this.randomK].y,this.dishu.width,this.dishu.height);
}
// 渲染锤子
Game.prototype.randerChuizi = function(){
	this.ctx.drawImage(this.chuizi,0,0,this.chuizi.width/2,this.chuizi.height,this.dishuX,this.dishuY-15,this.chuizi.width/2,this.chuizi.height);
}
// 渲染星星
Game.prototype.randerXing = function(){
	this.ctx.drawImage(this.chuizi,this.chuizi.width/2,0,this.chuizi.width/2,this.chuizi.height,this.dishuX,this.dishuY,this.chuizi.width/2,this.chuizi.height);
}
// 渲染心
Game.prototype.randerlife = function(){
	this.ctx.drawImage(this.life,0,0,this.life.width,this.life.height);
}
// 渲染乘号
Game.prototype.randerlife1 = function(){
	this.ctx.drawImage(this.life1,this.life.width+3,0,this.life1.width,this.life1.height);
}
// 渲染生命数
Game.prototype.randerLifeCount = function(){
	var count = this.lifeCount + "";
	for(var i = 0;i < count.length;i ++){
		this.ctx.drawImage(this.num_1,count[i] * 12,0,12,15,35 + i * 12,0,12,15);
	}
}
// 渲染得分数
Game.prototype.randerScore = function(){
	var score = (this.score + "").split("").reverse().join("");
	for(var i = 0;i < score.length;i ++){
		this.ctx.drawImage(this.num_2,score[i] * 12,0,12,15,this.ctx.canvas.width - (i + 1) * 12,this.ctx.canvas.height-15,12,15);
	}
}
// 结束游戏渲染
Game.prototype.randerGameOver = function(){
	this.ctx.drawImage(this.gameover,(this.ctx.canvas.width - this.gameover.width) / 2,(this.ctx.canvas.height - this.gameover.height) / 2,this.gameover.width,this.gameover.height);
}
// 渲染音乐开关
Game.prototype.randerMusicLock = function(){
	this.ctx.clearRect(35,this.ctx.canvas.height - 40,15,15);
	this.ctx.drawImage(this.bg,35,this.ctx.canvas.height - 40,15,15,35,this.ctx.canvas.height - 40,15,15);
	if(this.audio.paused){
		this.ctx.drawImage(this.ui,171,64,15,15,35,this.ctx.canvas.height - 40,15,15);
	}else{
		this.ctx.drawImage(this.ui,150,64,15,15,35,this.ctx.canvas.height - 40,15,15);
	}
}
// 为开始游戏绑定事件
Game.prototype.goEvent = function(){
	var me = this;
	document.onclick = function(e){
		if(e.clientX >= 90 && e.clientX <= 150 && e.clientY >= 180 && e.clientY <= 200){
			me.audio.play();
			console.log("开始游戏")
			// 分析一波，此时去掉logo，去掉“开始游戏”字样，执行开始游戏事件，摘掉此事件
			// 可以用清屏事件，然后重绘背景即可，最后摘掉此区域的点击事件；
			// 清屏
			me.clear();
			// 重绘
			me.randerBg();
			//摘除事件
			document.onclick = null;
			// 游戏开始
			me.start();
		}
	}
}
// 绑定菜单事件
Game.prototype.menuEvent = function(){
	document.b = this;
	document.addEventListener("click", this.menuFn);
}
Game.prototype.menuFn = function(e){
	var a = document.b;
		if(e.clientX >= 0 && e.clientX <= 44 && e.clientY >= a.ctx.canvas.height - 19 && e.clientY <= a.ctx.canvas.height){
			console.log("我是菜单");
			console.log(!a.menuLock)
			// 分析一波,如果菜单是关闭的，打开菜单，游戏暂停，显示音乐开关，为音乐开关绑定事件
			// 如果菜单是开启的，关闭音乐菜单，游戏继续，关闭音乐开关，移除音乐开关绑定事件
			if(!a.menuLock){
				a.menuLock = true;
				a.gamePause();
				a.ctx.drawImage(a.ui,120,64,30,15,4,a.ctx.canvas.height - 40,30,15);
				a.randerMusicLock();
				a.musicEvent();
			}else{
				a.menuLock = false;
				if(a.gameLock){
					a.start();
				}else{
					a.clear();
					a.randerBg();
					a.randerLogo();
					a.randerGo();
				}
				a.removeMusicEvent();
			}
		}
	}
Game.prototype.musicEvent = function(){
	document.a = this;
	document.addEventListener("click",this.fn);
}
Game.prototype.fn = function(e){
	var g = this.a;
		if(e.clientX >= 3 && e.clientX <= 50 && e.clientY >= g.ctx.canvas.height - 40 && e.clientY <= g.ctx.canvas.height - 20){
			if(g.audio.paused){
				console.log("开启音乐");
				g.audio.play();
				g.randerMusicLock();
			}else{
				console.log("关闭音乐");
				g.audio.pause();
				g.randerMusicLock();
			}
		}
	}
Game.prototype.removeMusicEvent = function(){
	document.removeEventListener("click",this.fn);
}
Game.prototype.clear = function(){
	this.ctx.clearRect(0,0,240,320);
}
Game.prototype.start = function(){
	this.gameLock = true;
	var me = this;
	this.timer = setInterval(function(){
		me.hitDishu();
		me.iframes ++;
		if(!(me.iframes%3)){
			me.clear();
			me.randerBg();
			me.randerlife();
			me.randerlife1();
			me.randerScore();
			me.randerLifeCount();
			// console.log(me.hited)
			if(me.hited){
				me.dishu.lifeState = 4;
				if(me.dishu.liveTime <= 45){
					me.randerChuizi();
				}else if(me.dishu.liveTime <= 50){
					me.randerXing();
				}
			}
			if(me.dishu.liveTime === 49){
				me.hited = false;
				me.random();
			}
			me.dishu.growUp();
			me.randerDishu();
		}
	},20);
}
// 选坑随机数
Game.prototype.random = function(){
	this.randomK = parseInt(Math.random()*this.keng.length);
}
// 打地鼠事件
Game.prototype.hitDishu = function(){
	var me = this;
	document.onclick = function(e){
		// console.log(1)
		if(e.clientX >= me.dishuX && e.clientX <= me.dishuX + me.dishu.width && e.clientY >= me.dishuY && e.clientY <= me.dishuY + me.dishu.height){
			//分析一波，如打中了，地鼠状态变为40，前5s渲染锤子，后5s渲染星星！
			// 还有一个就是打中之后不能再打了，这个要想个办法防止一下
			if(me.hited){
				return
			};
			me.hited = true;
			// 打中后判断得分情况
			// 分析一波，如果生命的心 === 0 时游戏结束，显示结算界面
			me.dishu.liveTime = 40;
			setTimeout(function(){
				if(me.hited){
					// console.log(me.dishu.random)
					if(me.dishu.random === 0){
						me.score += 1;
					}else if(me.dishu.random === 1){
						me.score += 2;
					}else if(me.dishu.random === 2){
						me.lifeCount -= 1;
						if(me.lifeCount === 0){
							// console.log("结束游戏")
							// 结束游戏执行
							setTimeout(function(){
								me.gameOver();
							},60);
						}
					}
				}
			}, 40);
		}
	}
}
Game.prototype.gameOver = function(){
	var me = this;
	this.gameLock = false;
	clearInterval(this.timer);
	// 弹出结束框
	this.randerGameOver();
	// 给结束框上的是否添加点击事件
	// 结束框中“是”的位置((me.ctx.canvas.width - me.gameover.width)/2 + 19)
	var left = (me.ctx.canvas.width - me.gameover.width)/2;
	var top = (me.ctx.canvas.height - me.gameover.height)/2;
	// 结束框中“否”的位置
	document.onclick = function(e){
		if(e.clientX >= left + 19 && e.clientX <= left + 33 && e.clientY >= top + 70 & e.clientY <= top + 82){
			// console.log("是")
			me.resetGame();
			me.start();
		}else if(e.clientX >= left + 54 && e.clientX <= left + 68 && e.clientY >= top + 70 & e.clientY <= top + 82){
			// console.log("否")
			me.restart();
		}
	}
}
Game.prototype.gamePause = function(){
	document.onclick = null;
	clearInterval(this.timer);
}
Game.prototype.resetGame = function(){
	this.randerBg();
	this.lifeCount = 3;
	this.score = 0;
	this.random();
	this.iframes = 0;
	this.dishuX = 0;
	this.dishuY = 0;
	this.musicLock = false;
	this.menuLock = false;
	this.gameLock = false;
	this.hited = false;
	this.dishu.reset();
}
Game.prototype.restart =function(){
	document.b = this;
	document.removeEventListener("click", this.menuFn);
	this.removeMusicEvent();
	this.resetGame();
	this.init();
}
