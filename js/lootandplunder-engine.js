/**
 * 
 */
var animations = {
		background: {
			speed: 0,
			refreshRate: 1,
			file: "background",
			idle: [{
				x: 0,
				y: 0,
				width: 800,
				height: 600
			}]
		},
		player: {
			// higher is slower
			speed: 5,
			refreshRate: 8,
			file: "player",
			idle: 
			[
				{
					x:450,
					y:678,
					width:92,
					height:104
				},
				{
					x: 648,
					y: 678,
					width: 92,
					height: 104
				}
			],
			moving: [
				{
					x: 54,
					y: 58,
					width: 92,
					height: 97
				}, 
				{
					x: 247,
					y: 56,
					width: 93,
					height: 99
				}, 
				{
					x: 448,
					y: 54,
					width: 86,
					height: 100
				},
				{
					x:843,
					y:51,
					width:83,
					height:103

				},
				{
					x:1040,
					y:50,
					width:76,
					height:105
				},
				{
					x: 52,
					y:206,
					width: 78,
					height: 104
				},
				{
					x: 448,
					y:209,
					width: 86,
					height: 102
				},
				{
					x: 648,
					y:211,
					width: 88,
					height: 99
				}


			]
		},
		cyclops: {
			speed: 5,
			refreshRate: 28,
			file: "cyclops",
			idle: [{
				x: 3,
				y: 16,
				width: 56,
				height: 80
			},{
				x: 64,
				y: 15,
				width: 56,
				height: 80
			}]
		}
}

function Character(x, y, animation, state) {
	var _currentRefresh = 0; // higher is les
	var _x = x;
	var _y = y;
	var _animation = animation;
	var _state = state;
	
	var _img = new Image();
	_img.src = "resource/img/" + _animation.file + ".png";
	
	var _current_frame = 0;

	this.move = function(dx, dy) {
		_x += dx;
		_y += dy;
	}
	
	this.setState = function(state) {
		_state = state;
	}
	
	this.getAnimation = function() {
		return _animation;
	}
	
	this.getState = function() {
		return _state;
	}
	
	this.getSpeed = function() {
		return _animation.speed;
	}
	
	this.update = function() {
		_currentRefresh++;	
		// limit refreshing
		if((_currentRefresh % _animation.refreshRate) === 0){
			if(_current_frame >= _state.length - 1) {
				_current_frame = 0;
			} else {
				_current_frame++;
			}
		}
	}
	
	this.draw = function(dx) {
		if(_current_frame >= _state.length) {
			_current_frame = 0;
		}
		var frame = _state[_current_frame];
		
		dx.drawImage(_img, frame.x, frame.y, frame.width, frame.height, _x, _y, frame.width, frame.height);
	}
}
var keys = []
var player = new Character(20, 20, animations.player, animations.player.moving);
var player2 = new Character(50, 50, animations.player, animations.player.idle);
var layer = {
		background: [new Character(0, 0, animations.background, animations.background.idle)],
		loot: [],
		characters: [new Character(200, 200, animations.cyclops, animations.cyclops.idle), player]
}



$(function() {
	initialize();
	var c=document.getElementById("game");
	var context=c.getContext("2d");
	window.requestAnimFrame = (function(){ //source: http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
			return  window.requestAnimationFrame       ||
		          window.webkitRequestAnimationFrame ||
		          window.mozRequestAnimationFrame    ||
		          function( callback ){
		            window.setTimeout(callback, 1000 / 60);
		          };
		})();

	(function animloop(){
	  requestAnimFrame(animloop);
	  gamelogic();
	  render();
	})();
	
	$(document).keydown(function(key) {
		keys[key.keyCode] = true;
	});
	
	$(document).keyup(function(key) {
		keys[key.keyCode] = false;
	});
	
	
	function initialize() {
	}
	

	
	function update_layer(layer) {
		for(var i = 0; i < layer.length; i++) {
			layer[i].update();
		}
	}
	
	function gamelogic() {
		//39 = rechts, 37 = links, up=38, down=40, space=32
		var moveX = 0;
		if(keys[39]) { //move right
			moveX += player.getSpeed();
		}
		if(keys[37]) {
			moveX -= player.getSpeed();
		}
		if(moveX === 0) {
			player.setState(player.getAnimation().idle);
		} else {
			player.move(moveX, 0);
			player.setState(player.getAnimation().moving);
		}
		
		update_layer(layer.background);
		update_layer(layer.loot);
		update_layer(layer.characters);
	}
	
	function render_layer(layer) {
		for(var i = 0; i < layer.length; i++) {
			layer[i].draw(context);
		}
	}
	
	function render() {
		render_layer(layer.background);
		render_layer(layer.loot);
		render_layer(layer.characters);
	}
});
