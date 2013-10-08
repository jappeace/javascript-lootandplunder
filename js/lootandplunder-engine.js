/**
 * 
 */
var animations = {
	player: {
		// higher is slower
		speed: 5,
		refreshRate: 8,
		file: "player",
		left:{
			idle: 
			[
				{
					x:1638,
					y:678,
					width:92,
					height:104
				},
				{
					x: 1836,
					y: 678,
					width: 92,
					height: 104
				}
			],
			moving: [
				{
					x: 1242,
					y: 58,
					width: 92,
					height: 97
				}, 
				{
					x: 1435,
					y: 56,
					width: 93,
					height: 99
				}, 
				{
					x: 1636,
					y: 54,
					width: 86,
					height: 100
				},
				{
					x: 2031,
					y:51,
					width:83,
					height:103

				},
				{
					x: 2228,
					y:50,
					width:76,
					height:105
				},
				{
					x: 1240,
					y:206,
					width: 78,
					height: 104
				},
				{
					x: 1636,
					y:209,
					width: 86,
					height: 102
				},
				{
					x: 1836,
					y:211,
					width: 88,
					height: 99
				}
			]
		}
		right:{
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
			moving:[
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

		}

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

var blocks = {
		grass_left: {
			x: 172,
			y: 36
		},
		grass_mid: {
			x: 206,
			y: 36
		},
		grass_right: {
			x: 342,
			y: 36
		}
	}

var block_sprites = new Image();
block_sprites.src = "resource/img/blocks.png";

function Character(x, y, animation, state) {
	var _currentRefresh = 0; // higher is les
	var _x = x;
	var _y = y;
	var _animation = animation;
	var _state = state;

	var _direction = "right";
	var _img = new Image();
	_img.src = "resource/img/" + _animation.file + ".png";
	
	var _current_frame = 0;

	this.move = function(dx, dy) {
		_x += dx;
		_y += dy;
		if(_direction == "left"){
			this.setState(_animation.left.moving)
		}else if(_direction == "right"{
			this.setState(_animation.right.moving);
		}
	}
	
	this.setState = function(state) {
		_state = state;
	}
	this.setDirection = function(direction){
		_direction = direction;
	}

	this.setIdle(){	
		if(_direction == "left"){
			this.setState(_animation.left.idle)
		}else if(_direction == "right"{
			this.setState(_animation.right.idle);
		}
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

function Block(x, y, img_coords) {
	var _x = x;
	var _y = y;
	var _img_x = img_coords.x;
	var _img_y = img_coords.y;
	var _width = 32;
	var _height = 32;
	
	this.update = function() {
		//Check for colission here or what
	}
	
	this.draw = function(dx) {
		dx.drawImage(block_sprites, _img_x, _img_y, _width, _height, _x, _y, _width, _height);
	}
}

var keys = []
var player = new Character(20, 20, animations.player, animations.player.moving);
var player2 = new Character(50, 50, animations.player, animations.player.idle);
var layer = {
		background: [new Block(10, 10, blocks.grass_left), new Block(42, 10, blocks.grass_mid)],
		loot: [],
		characters: [ player]
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
			player.setIdle();
		} else {
			player.move(moveX, 0);
			if(moveX < 0){
				player.setDirection("Left");
			}else{
				player.setDirection("Right");
			}
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
		context.clearRect(0, 0, c.width, c.height);
		render_layer(layer.background);
		render_layer(layer.loot);
		render_layer(layer.characters);
	}
});
