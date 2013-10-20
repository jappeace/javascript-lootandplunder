/**
 * Functions a state must have.
 */

//AI for a player: ie none
function playerAI(){
	var _player;
	this.setBody = function(to){
		_player = to;
	};
	this.update = function(){
		//39 = rechts, 37 = links, up=38, down=40, space=32
		var movement = new Vector();
		if(game.keys[39]) { //move right
			movement.add(new Vector(_player.getSpeed()));
		}
		if(game.keys[37]) {
			movement.substract(new Vector(_player.getSpeed()));
		}
		if(game.keys[38]) {
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
		if(game.keys[32]){
			_player.attack();
		}
	
	};
}

function hostileAI(){
	var _attackRange = 90; // when to start attacking
	var _attackCycle = new Counter(100); // how long to wait before attacking
	var _attackDuration = new Counter(10); // how long to remain in attacking state
	var _attackendevour = false; // if curently attacking
	var _speed = 0.005; // moving speed
	var _agresiveRange = 300; // when to start following
	var _body; // the pupet to controll
	this.setBody = function(to){
		_body = to;
	};
	
	this.update = function(){
		if(_body instanceof Character){
			if(!_body.isAlive()) {
				game.layer.characters.splice(game.layer.characters.indexOf(_body), 1);
			}

			var distance = game.getPlayer().getPosition().clone().substract(_body.getPosition().clone());
			_body.face(distance.getX());
			
			if(_body.getPosition().getY() > 800) { //NPC fell of the map, so it died
				_body.hit();
			}
			
			if(distance.getX() < _agresiveRange && distance.getY() < _agresiveRange && distance.getX() > -_agresiveRange && distance.getY() > -_agresiveRange){
				if(distance.getX() < _attackRange && distance.getY() < _attackRange && distance.getX() > -_attackRange && distance.getY() > -_attackRange){
					if(_attackCycle.execute() || _attackendevour){
						_attackendevour = !_attackDuration.execute();
						_body.attack();
					}else{
						_body.animateIdle();
					}
				}else{
					_body.animateMove();
					distance.multiply(new Vector(_speed, 0)); //yspeed 0 because otherwise it will fly
					_body.getPosition().add(distance);
				}
			}else{
				_body.animateIdle();
			}
			
		}
	};
}

function GamePlay() {
	
	this.initialize = function() {
		generate_ground();
		game.resize(800);
		context.font = "12px Arial";
	}
	
	this.update = function() {
		if(game.layer.characters.length <= 1) {
			for(var i = 0; i < game.stage * 3; i++) {
				game.layer.characters.push(new Character(new Vector((Math.random()*800), 0), animations.cyclops, new hostileAI()));
			}
			game.stage++;
		}
		
		update_layer(game.layer.background);
		update_layer(game.layer.loot);
		update_layer(game.layer.characters);
	}
	
	this.render = function() {
		game.render_layer(game.layer.background);
		game.render_layer(game.layer.loot);
		game.render_layer(game.layer.characters);
		context.fillText("Stage: " + game.stage, 20, 30);
		context.fillText("NPCS alive: " + (game.layer.characters.length - 1), 20, 45);
	}
	
	this.mouseClick = function(x, y) {
		
	}
	
	
	/*
	 * Other functions
	 */
	var generate_ground = function() {
		game.layer.background.push(new Block(0, 600-32, blocks.grass_left));
		for(var i = 32; i < (800 -32); i += 32) {
			game.layer.background.push(new Block(i, 600-32, blocks.grass_mid));
		}
		game.layer.background.push(new Block(800-32, 600-32, blocks.grass_right));
	}
	
	var update_layer = function(layer) {
		for(var i = 0; i < layer.length; i++) {
			layer[i].update();
		}
	}
	
	/**
	* AI's
	*/
}
