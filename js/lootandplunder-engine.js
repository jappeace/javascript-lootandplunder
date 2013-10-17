var block_sprites = new Image();
block_sprites.src = "resource/img/blocks.png";
function intersect(one, two) {
	return !(two.x > (one.x + one.width) ||
           (two.x + two.width) < one.x ||
           two.y > (one.y + one.height) ||
           (two.y + two.height) < one.y);
}
function Character(position, animation, ai) {
	var _currentRefresh = 0; // higher is les
	var _position = position;
	var _difference = new Vector();
	
	var _ai = ai;
	_ai.setBody(this);

	var _jump = false;
	
	var _animation = animation;
	var _state = _animation.right.idle;

	var _direction = "right";
	var _img = new Image();
	_img.src = "resource/img/" + _animation.file + ".png";
	
	var _current_frame = 0;

	this.getPosition = function(){
		return _position;
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
					x:_position.getX(),
					y:_position.getY(),
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
				_difference.setY(-10);
			} else {
				_difference.setY(0);
			}
		} else {
			_difference.add(new Vector(0, 0.35));
		}
		
		if(_difference.getY() > 5){
			_difference.setY(5);
		}
		_position.add(_difference);

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
		dx.drawImage(
			_img,
			frame.x,
			frame.y,
			frame.width,
			frame.height,
			_position.getX(),
			_position.getY(),
			frame.width,
			frame.height
		);
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
	
	this.face = function(movementX){
		if(movementX < 0){
			this.setDirection("left");
		}else{
			this.setDirection("right");
		}
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
function playerAI(){
	var _player;
	this.setBody = function(to){
		_player = to;
	};
	this.update = function(){
		//39 = rechts, 37 = links, up=38, down=40, space=32
		var movement = new Vector();
		if(keys[39]) { //move right
			movement.add(new Vector(_player.getSpeed()));
		}
		if(keys[37]) {
			movement.substract(new Vector(_player.getSpeed()));
		}
		if(keys[38]) {
			if(!_player.isJumping()) {
				_player.jump();
			}
		}
		
		if(movement.getX() == new Vector().getX()) {
			_player.animateIdle();
		} else {
			_player.animateMove();
			_player.getPosition().add(movement);
			_player.face(movement.getX());
		}
		if(keys[32]){
			_player.attack();
		}
	
	};
}

function hostileAI(){
	var _atackRange = 50;
	var _timeout = 100; // how long to wait before atacking
	var _speed = 0.005;
	var _agresiveRange = 300; // when to start following
	var _body;
	this.setBody = function(to){
		_body = to;
	};
	this.update = function(){
		if(_body instanceof Character){
			var distance = player.getPosition().clone().substract(_body.getPosition().clone());
			_body.face(distance.getX());
			
			if(distance.getX() < _agresiveRange && distance.getY() < _agresiveRange && distance.getX() > -_agresiveRange && distance.getY() > -_agresiveRange){
				if(distance.getX() < _atackRange && distance.getY() < _atackRange && distance.getX() > -_atackRange && distance.getY() > -_atackRange){
					_body.attack();
				}else{
					_body.animateMove();
				}
				distance.multiply(new Vector(_speed, _speed));
				_body.getPosition().add(distance);
			}else{
				_body.animateIdle();
			}
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
var player = new Character(new Vector(40, 400), animations.player, new playerAI());

var layer = {
		background: [new Block(700, 500, blocks.grass_mid)],
		loot: [],
		characters: [ player, new Character(new Vector(90, 400), animations.cyclops, new hostileAI())]
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
