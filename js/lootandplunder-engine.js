function intersect(one, two) {
	return !(two.x > (one.x + one.width) ||
           (two.x + two.width) < one.x ||
           two.y > (one.y + one.height) ||
           (two.y + two.height) < one.y);
}

function Game() {

	var player;
	var init = function(){
		// somtimes you'l win more
		var seed = (Math.random() + 0.5 );
		player = new Character(new Vector(40, 400), animations.player, new playerAI(),seed  * 200);
		player.setDamage(seed * 2);
	};
	init();
	var current_state = null;
	this.keys = []; //pressed keys
	this.stage = 1;
	this.layer = {
			background: [],
			loot: [],
			placed: [], //placed items in map editor
			toolbox: [], //items in the toolbox
			toolbox_current:new Block(20, 20, blocks.glass),
			characters: [player, new Character(new Vector(600, 400), animations.cyclops, new hostileAI())]
		};

	/*
	 * Global game functions
	 */
	this.getPlayer = function() {
		return player;
	};

	this.load_map = function(map) {
		layer.background = layer.background.concat(map);
	};

	this.setState = function(state) {
		current_state = state;
		state.initialize();
	};

	this.getState = function() {
		return current_state;
	};

	this.gamelogic = function() {
		if(current_state !== null) {
			current_state.update();
		}
	};

	this.render = function() {
		if(current_state !== null) {
			current_state.render();
		}
	};

	this.render_layer = function(layer) {
		for(var i = 0; i < layer.length; i++) {
			layer[i].draw(context);
		}
	};

	this.clearMap = function() {
		this.layer.background = [];
		this.layer.loot = [];
	};

	this.resize = function(width) {
		$("#game").attr('width', width);
		$("#game").css('width', width);
	};

}

/*
 * Global game object which holds all the data.
 */
var game = new Game();

var context = null;

$(function() {

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

	$("#game").click(function(event) {
		//get correct block from toolbox by mouse click
		var x = Math.floor((event.pageX - $("#game").offset().left));
		var y = Math.floor((event.pageY - $("#game").offset().top));
		game.getState().mouseClick(x, y);
	});

	game.setState(new MainMenu());
});
