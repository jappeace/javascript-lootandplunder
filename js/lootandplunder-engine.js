function intersect(one, two) {
	return !(two.x > (one.x + one.width) ||
           (two.x + two.width) < one.x ||
           two.y > (one.y + one.height) ||
           (two.y + two.height) < one.y);
}

function Game() {
	var player = new Character(new Vector(40, 400), animations.player, new playerAI());
	var current_state = null;
	
	
	this.keys = []; //pressed keys
	this.stage = 1;
	this.layer = {
			background: [],
			loot: [],
			characters: [player, new Character(new Vector(600, 400), animations.cyclops, new hostileAI())]
		};
	
	/*
	 * Global game functions
	 */
	this.getPlayer = function() {
		return player;
	}
	
	this.load_map = function(map) {
		layer.background = layer.background.concat(map);
	}
	
	this.setState = function(state) {
		current_state = state;
		state.initialize();
	}
	
	this.gamelogic = function() {
		if(current_state != null) {
			current_state.update();
		}
	}
	
	this.render = function() {
		if(current_state != null) {
			current_state.render();
		}
	}
	
	$("#game").click(function(event) {
		
		//get correct block from toolbox by mouse click
	    var x = Math.floor((event.pageX - $("#game").offset().left));
	    var y = Math.floor((event.pageY - $("#game").offset().top));
	    
	    
	});
}

/*
 * Global game object which holds all the data.
 */
var game = new Game();
game.setState(new GamePlay());

var context = null;

$(function() {
	game.setState(new GamePlay());
	
    var c = document.getElementById("game");
    context = c.getContext("2d");
    window.requestAnimFrame = (function(){ //source: http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
                    return window.requestAnimationFrame ||
                            window.webkitRequestAnimationFrame ||
                            window.mozRequestAnimationFrame ||
                            function( callback ){
                                    window.setTimeout(callback, 1000 / 60);
                            };
            })();

    (function animloop(){
            requestAnimFrame(animloop);
            game.gamelogic();
            
            context.clearRect(0, 0, 800, 600);
            game.render();
    })();
    
	$(document).keydown(function(key) {
		game.keys[key.keyCode] = true;
	});
	
	$(document).keyup(function(key) {
		game.keys[key.keyCode] = false;
	});
});
