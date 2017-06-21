/**
 * 星空脚本
 */


/**
 * 星空对象
 * c:canvas 画布对象
 * cw:画布宽度
 * ch:画布高度
 */
function starrysky(c,cw,ch){
	var pthis = this;
	this.c = c;
	this.ctx = c.getContext('2d');
	this.x = 0;
	this.y = 0;
	this.cw = (cw == undefined ? 22 :cw);
	this.ch = (ch == undefined ? 33 :ch);
	this.skyColor = '#230709'
	this.mySky = null;
	this.startColor = 'white'
	this.startWidth = 1;
	this.startHeight = 2;
	this.startSpeed = 1;
	this.startsSize = 50;
	this.starts = [];//初始化时星星数组
	//this.skyColor = '#8ED6FF';
	this.init = function(){
		this.createSky();
		this.createStarts();
		this.loop();
	}
	/**
	 * 随机数生成工具
	 */
	this.random = function(max,min){
		return (Math.random()*(max-min+1))+min;
	}
	/**
	 * 判断start越界
	 */
	this.isOut = function(x,y,w,h){
		return (x+w<this.x) || (x+w>this.x+this.w) || (y+h<this.y)||(y+h>this.y+this.h);
	}
	/**
	 * 夜幕对象
	 */
	this.sky = function(){
		this.x = pthis.x;
		this.y = pthis.y;
		this.w = pthis.cw;
		this.h = pthis.ch;
		this.color = pthis.skyColor;
	}
	/**
	 * 夜幕绘制方法
	 */
	this.sky.prototype.render = function(){
		//console.log('---绘制星空夜幕')
		//alert('aa')
		pthis.ctx.fillStyle = this.color;
		pthis.ctx.fillRect(this.x,this.y,this.w,this.h);
	}
	/**
	 * 星辰对象
	 * 声明start的坐标，大小，颜色等属性
	 */
	this.start = function(){
		this.x = pthis.random(pthis.cw,pthis.x);
		this.y = pthis.random(pthis.ch,pthis.y);
		this.w = pthis.startWidth;
		this.h = pthis.startHeight;
		this.color = pthis.startColor;
	}
	
	this.start.prototype.update = function(){
		this.x = this.x - pthis.startSpeed;
	}
	this.start.prototype.render = function(){
	    pthis.ctx.fillStyle = this.color;
	    pthis.ctx.fillRect(this.x,this.y,this.w,this.h);
	}
	/**
	 * 生成starts数组
	 */
	this.createStarts = function(){
		for (var i=0;i<this.startsSize;i++) {
			this.starts.push(new this.start());
		}
	}
	/**
	 * 更新starts属性
	 */
	this.updateStarts = function(){
		console.log(this.starts.length);
		for (var i = 0;i<this.starts.length;i++) {
			this.starts[i].update();
			if(this.isOut(this.starts[i].x,this.starts[i].y,this.starts[i].w,this.starts[i].h)){
				this.starts.splice(i,1);//删除一个粒子
				var newStart = new this.start();
				newStart.x = this.cw;
				this.starts.push(newStart);//添加一个粒子
			}
		}
	}
	/**
	 * 删除越界粒子
	 */
	/*this.removeStarts = function(){
		for(var i=0;i<this.starts.length;i++){
			if(this.isOut(starts[i].x,starts[i].y,starts[i].w,starts[i].h)){
				starts.splice()
			}
		}
	}*/
	/**
	 * 渲染starts数组
	 */
	this.renderStarts = function(){
		for (var i = 0;i<this.starts.length;i++) {
			this.starts[i].render();
		}
	}
	/**
	 * 生成星空背景
	 */
	this.createSky = function(){
		this.mySky = new this.sky();
	}
	/**
	 * 绘制星空背景
	 */
	this.renderSky = function(){
		this.mySky.render();
	}
	/**
	 * 清空画布
	 */
	this.clearSky = function(){
		this.ctx.globalCompositeOperation = 'source-over';
		this.ctx.clearRect(0,0,this.cw,this.ch);					
		this.ctx.globalCompositeOperation = 'lighter';
	}
	this.loop = function(){
		var loopIt = function(){
			requestAnimationFrame(loopIt);
			pthis.updateStarts();
			pthis.clearSky();
			pthis.renderSky()
			pthis.renderStarts();
		}
		loopIt();
	}
	
	
}
