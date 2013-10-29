/**
 * Character class
 */
function Character(position, animation, ai, life) {
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

	var _life = typeof life !== 'undefined' ? life : 100;
	var _startlife = typeof life !== 'undefined' ? life : 100;

	var _defaultDamage = 1;
	var _damage = _defaultDamage;

	this.setDamage = function (damage){
		_damage = damage;
	};

	this.getPosition = function(){
		return _position;
	};

	this.getCurrentFrame = function() {
		if(_current_frame >= _state.length) {
			_current_frame = 0;
		}
		return _state[_current_frame];
	};

	this.isAlive = function() {
		return _life > 0;
	};
	this.makeAlive = function() {
		_life = _startlife;
	};
	this.hit = function(damage) {
		_life -= typeof damage !== 'undefined' ? damage : _defaultDamage;
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
	this.setState = function(state) {
		_state = state;
	};
	this.setDirection = function(direction){
		_direction = direction;
	};
	this.attack = function(){
		this.animateAttack();
		var frame = this.getCurrentFrame();
		for(var i = 0; i < game.layer.characters.length; i++) {
			var current = game.layer.characters[i];
			if(current != this) {
				if(intersect(
					{
						x:current.getPosition().getX(),
						y:current.getPosition().getY(),
						height:current.getCurrentFrame().height,
						width:current.getCurrentFrame().width
					},
					{
						x:this.getPosition().getX(),
						y:this.getPosition().getY(),
						height:frame.height,
						width:frame.width
					}
					)){
						current.hit(_damage);
					}
			}
		}
	};
	this.collideWithGround = function() {
		var frame = this.getCurrentFrame();
		for(var i = 0; i < game.layer.background.length; i++) {
			var block = game.layer.background[i];
			if(intersect(
				{
					x:block.getX(),
					y:block.getY() + block.getOffset(),
					height: block.getHeight(),
					width:block.getWidth()
				},
				{
					x:_position.getX() + 30,
					y:_position.getY() + frame.height,
					height:5,
					width: 30
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
		if(_difference.getY() > 5) { //Stop the player from falling too hard.
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
		var frame = this.getCurrentFrame();
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
	this.setPosition = function(position) {
		this.position = position;
	}

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

var block_sprites = new Image();
block_sprites.src = "resource/img/blocks.png";
/**
 * Block class
 */
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

    this.getImageCoords = function() {
        return {x: _img_x, y: _img_y};
    }

	// because getting a character perfect on the gras is quite hard an offset was added.
	// this allows characters to run on the green of the gras, making the bug less obvious`
	this.getOffset = function(){
		return 6.5;
	};

	this.draw = function(dx) {
		dx.drawImage(block_sprites, _img_x, _img_y, _width, _height, _x, _y, _width, _height);
	};
}
