function Timer(time, div){
	this.temp = new Date();
	this.running = false;
	this.count = time;
	this.div = div;
	this.div.addClass('num');
	this.divs = [];
	for(var i = 0; i < 9; i++){
		this.divs.push($(document.createElement('div')));
		this.div.append(this.divs[i]);
		this.divs[i].attr('num', '0');
	}
	this.divs[2].attr('num', ':');
	this.divs[5].attr('num', '.');
	this.refresh();
};
$.extend(Timer.prototype, {
	start: function(time){
		this.temp = new Date();
		this.running = true;
	},
	pause: function(){
		this.running = false;
	},
	update: function(){
		if(!this.running)return;
		if(this.count <= 0){
			this.running = false;
			this.count = 0;
			this.refresh();
			this.onFinish();
			return;
		}
		this.count -= (new Date()) - this.temp;
		this.temp = new Date();
		this.refresh();
	},
	refresh: function(){
		var c = this.count;
		c = Math.floor(c / 10);
		this.divs[7].attr('num', (c % 10).toFixed(0));
		c = Math.floor(c / 10);
		this.divs[6].attr('num', (c % 10).toFixed(0));
		c = Math.floor(c / 10);
		this.divs[4].attr('num', (c % 10).toFixed(0));
		c = Math.floor(c / 10);
		this.divs[3].attr('num', (c % 6).toFixed(0));
		c = Math.floor(c / 6);
		this.divs[1].attr('num', (c % 10).toFixed(0));
		c = Math.floor(c / 10);
		this.divs[0].attr('num', (c % 10).toFixed(0));
	},
	onFinish: function(){}
});
Timer['list'] = [];
Timer['update'] = function(){
	for(var i in Timer.list){
		if (Timer.list[i].running)Timer.list[i].update();
	}
};
Timer['interval'] = window.setInterval(Timer.update, 2);