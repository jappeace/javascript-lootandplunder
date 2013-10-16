var block_sprites = new Image();
block_sprites.src = "resource/img/blocks.png";
function intersect(one, two) {
	return !(two.x > (one.x + one.width) ||
           (two.x + two.width) < one.x ||
           two.y > (one.y + one.height) ||
           (two.y + two.height) < one.y);
}
function Character(x, y, animation, ai) {
	var _currentRefresh = 0; // higher is les
	var _x = x;
	var _y = y;
	var _ai = ai;
	_ai.setBody(this);
	var _dx = 0;
	var _dy = 0;

	var _jump = false;
	
	var _animation = animation;
	var _state = _animation.right.idle;

	var _direction = "right";
	var _img = new Image();
	_img.src = "resource/img/" + _animation.file + ".png";
	
	var _current_frame = 0;

	this.move = function(dx, dy) {
		_x += dx;
		_y += dy;
	};

	this.getX = function(){
		return _x;
	};

	this.getY = function(){
		return _y;
	};
	
	this.setState = function(state) {
		_state = state;
	};
	this.setDirection = function(direction){
		_direction = direction;
	};
	this.attack = function(){
		this.animateAttack();
		// atack logic
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
			if(intersect(
				{
					x:block.getX(),
					y:block.getY() + block.getOffset(),
					height:block.getHeight(),
					width:block.getWidth()
				},
				{
					x:_x,
					y:_y,
					height:frame.height,
					width:frame.width
				}
			)){
				// return the block its collides with, which evaulates to true
				return block;
			}
		}
		return false;
	};
	
	this.update = function() {
		if(_current_frame >= _state.length) {
			_current_frame = 0;
		}
		_currentRefresh++;
		
		_ai.update();

		if(this.collideWithGround()) {
			if(_jump) {
				_dy = -10;
			} else {
				_dy = 0;
			}
		} else {
			_dy += 0.35;
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
			_current_frame++;
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

	this.animateMove = function(){
		this.setState(_animation[_direction].moving);
	};
	this.animateIdle = function(){
		this.setState(_animation[_direction].idle);
	};
	this.animateAttack = function(){
		this.setState(_animation[_direction].attack);
	};

	var mirrorAnimation = function (target){
		var lft = {
			idle: [],
			moving: [],
			attack: []
		};

		// need a clone otherwise evrything gets refrenced
		var rght = $.extend(true, {}, target.getAnimation().right);
		var width = target.getAnimation().width;
		for(var i = 0; i < rght.idle.length; i++){
			lft.idle[i] = rght.idle[i];
			lft.idle[i].x = width - rght.idle[i].x - rght.idle[i].width;
		}
		for(i = 0; i < rght.moving.length; i++){
			lft.moving[i] = rght.moving[i];
			lft.moving[i].x = width - rght.moving[i].x - rght.moving[i].width;
		}
		for(i = 0; i < rght.attack.length; i++){
			lft.attack[i] = rght.attack[i];
			lft.attack[i].x = width - rght.attack[i].x - rght.attack[i].width;
		}
		target.getAnimation().left = lft;
	};
	mirrorAnimation(this);
}

// AI for a player: ie none
function dummyAI(){
	this.setBody = function(to){};
	this.update = function(){};
}

function hostileAI(){
	var _atackRange = 20;
	var _timeout = 100; // how long to wait before atacking
	var _speed = 0.5;

	var _body;
	this.setBody = function(to){
		_body = to;
	};
	this.update = function(){
		if(_body instanceof Character){
			
			_body.move(player.getX() - _body.getX(),  player.getY() - _body.getY());
		} 
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
	
	this.getHeight = function(){
		return _height;
	};
	this.getWidth = function(){
		return _width;
	};

	// because getting a character perfect on the gras is quite hard an offset was added.
	// this allows characters to run on the green of the gras, making the bug less obvious`
	this.getOffset = function(){
		return 6.5;
	};
	this.draw = function(dx) {
		dx.drawImage(block_sprites, _img_x, _img_y, _width, _height, _x, _y, _width, _height);
	};
}

var keys = [];
var player = new Character(40, 400, animations.player, new dummyAI());

var layer = {
		background: [new Block(700, 500, blocks.grass_mid)],
		loot: [],
		characters: [ player, new Character(90, 400, animations.cyclops, new hostileAI())]
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
		if(keys[38]) {
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
		if(keys[32]){
			player.attack();
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
