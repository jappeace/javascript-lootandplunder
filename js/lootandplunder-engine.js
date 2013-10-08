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
					width:96,
					height:104
				},
				{
					x: 1836,
					y: 678,
					width: 96,
					height: 104
				}
			],
			moving: [
				{
					x: 2228,
					y:50,
					width:96,
					height:104
				},
				{
					x: 2031,
					y:51,
					width:96,
					height:104

				},
				{
					x: 1636,
					y: 54,
					width: 96,
					height: 104
				},
				{
					x: 1435,
					y: 56,
					width: 96,
					height: 104
				},
				{
					x: 1242,
					y: 58,
					width: 96,
					height: 104
				},
				{
					x: 2236,
					y:211,
					width: 96,
					height: 104
				},
				{
					x: 2036,
					y:209,
					width: 96,
					height: 104
				},
				{
					x: 1640,
					y:206,
					width: 96,
					height: 104
				}
			]
		},
		right:
		{
			idle:
			[
				{
					x:450,
					y:678,
					width:96,
					height:104
				},
				{
					x: 648,
					y: 678,
					width: 96,
					height: 104
				}
			],
			moving:[
				{
					x: 54,
					y: 58,
					width: 96,
					height: 104
				},
				{
					x: 247,
					y: 56,
					width: 96,
					height: 104
				},
				{
					x: 448,
					y: 54,
					width: 96,
					height: 104
				},
				{
					x:843,
					y:51,
					width:96,
					height:104

				},
				{
					x:1040,
					y:50,
					width:96,
					height:104
				},
				{
					x: 52,
					y:206,
					width: 96,
					height: 104
				},
				{
					x: 448,
					y:209,
					width: 96,
					height: 104
				},
				{
					x: 648,
					y:211,
					width: 96,
					height: 104
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
};

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
	};

var block_sprites = new Image();
block_sprites.src = "resource/img/blocks.png";

function Character(x, y, animation, state) {
	var _currentRefresh = 0; // higher is les
	var _x = x;
	var _y = y;
	
	var _dx = 0;
	var _dy = 0;
	
	var _jump = false;
	
	var _animation = animation;
	var _state = state;

	var _direction = "right";
	var _img = new Image();
	_img.src = "resource/img/" + _animation.file + ".png";
	
	var _current_frame = 0;

	this.move = function(dx, dy) {
		_x += dx;
		_y += dy;
	};
	
	this.setState = function(state) {
		_state = state;
	};
	this.setDirection = function(direction){
		_direction = direction;
	};
	this.animateMove = function(){
		if(_direction == "left"){
			this.setState(_animation.left.moving);
		}else if(_direction == "right"){
			this.setState(_animation.right.moving);
		}
	};
	this.animateIdle = function(){
		if(_direction == "left"){
			this.setState(_animation.left.idle);
		}else if(_direction == "right"){
			this.setState(_animation.right.idle);
		}
	};

	
	this.isJumping = function() {
		return _jump;
	};
	
	this.jump = function() {
		_jump = true;
	};
	
	this.getAnimation = function() {
		return _animation;
	};
	
	this.getState = function() {
		return _state;
	};
	
	this.getSpeed = function() {
		return _animation.speed;
	};
	
	this.collideWithGround = function() {
		var frame = _state[_current_frame];
		for(var i = 0; i < layer.background.length; i++) {
			var block = layer.background[i];
			if(_y + frame.height >= block.getY() && _x >= block.getX() - 32 && _x <= block.getX()) {
				return true;
			}
		}
		return false;
	};
	
	this.update = function() {
		if(_current_frame >= _state.length - 1) {
			_current_frame = 0;
		}
		
		_currentRefresh++;
		
		if(this.collideWithGround()) {
			if(_jump) {
				_dy = -10;
			} else {
				_dy = 0;
			}
		} else {
			_dy -= -0.35;
		}
		
		if(_dy > 5){
			_dy = 5;
		}
		
		this.move(_dx, _dy);

		if(_jump) {
			_jump = false;
		}
		
		// limit refreshing
		if((_currentRefresh % _animation.refreshRate) === 0){
			if(_current_frame >= _state.length - 1) {
				_current_frame = 0;
			} else {
				_current_frame++;
			}
		}
	};
	
	this.draw = function(dx) {
		if(_current_frame >= _state.length) {
			_current_frame = 0;
		}
		var frame = _state[_current_frame];
		dx.fillText(_x + ":" + _y, _x, _y);
		dx.drawImage(_img, frame.x, frame.y, frame.width, frame.height, _x, _y, frame.width, frame.height);
	};
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
	};
	
	this.getX = function() {
		return _x;
	};
	this.getY = function() {
		return _y;
	};
	
	this.draw = function(dx) {
		dx.drawImage(block_sprites, _img_x, _img_y, _width, _height, _x, _y, _width, _height);
	};
}

var keys = [];
var player = new Character(40, 400, animations.player, animations.player.moving);

var layer = {
		background: [new Block(700, 500, blocks.grass_mid)],
		loot: [],
		characters: [ player]
	};



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
	
	
	function generate_ground() {
		layer.background.push(new Block(0, 600-32, blocks.grass_left));
		for(var i = 32; i < (800 -32); i += 32) {
			layer.background.push(new Block(i, 600-32, blocks.grass_mid));
		}
		layer.background.push(new Block(800-32, 600-32, blocks.grass_right));
	}
	
	function initialize() {
		generate_ground();
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
		if(keys[32]) {
			if(!player.isJumping()) {
				player.jump();
			}
		}
		
		if(moveX === 0) {
			player.animateIdle();
		} else {
			player.animateMove();
			player.move(moveX, 0);
			if(moveX < 0){
				player.setDirection("left");
			}else{
				player.setDirection("right");
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
