/**
 * 
 */
var animations = {
		player: {
			file: "player",
			idle: [{
				x: 5,
				y: 71,
				width: 23,
				height: 33
			}],
			moving: [{
				x: 5,
				y: 71,
				width: 23,
				height: 33
			}, {
				x: 35,
				y: 71,
				width: 24,
				height: 32
			}]
		}
}

function Character(x, y, animation, state) {
	var _x = x;
	var _y = y;
	var _animation = animation;
	var _state = state;
	
	var _img = new Image();
	_img.src = "resource/img/" + animation.file + ".png";
	
	var _current_frame = 0;

	this.update = function() {
		if(_current_frame >= _state.length) {
			_current_frame = 0;
		} else {
			_current_frame++;
		}
	}
	
	this.draw = function(dx) {
		var frame = _state[_current_frame];
		console.log(_current_frame);
		dx.drawImage(_img, frame.x, frame.y, frame.width, frame.height, _x, _y, frame.width, frame.height);
	}
}

var player = new Character(20, 20, animations.player, animations.player.moving);
var layer = {
		background: [],
		loot: [],
		characters: [player]
}


console.log(animations.player.idle[0]);

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
	
	function initialize() {
		
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
		render_layer(layer.background);
		render_layer(layer.loot);
		render_layer(layer.characters);
	}
});