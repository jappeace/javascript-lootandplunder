var block_sprites = new Image();
block_sprites.src = "resource/img/blocks.png";


function Block(x, y, img_coords) {
	console.log(img_coords.x + ":" + img_coords.y);
	var _x = x;
	var _y = y;
	var _img_x = img_coords.x;
	var _img_y = img_coords.y;
	var _width = 32;
	var _height = 32;
	
	this.update = function() {
		//Check for colission here or what
	};
	
	this.getImageCoords = function() {
		return {x: _img_x, y: _img_y};
	}
	
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

	this.toString = function() {
		return _x + ", " + y + ", {x: " + _img_x + ", y: " + _img_y + "}";
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

var layer = {
		background: [],
		loot: [],
		placed: [],
		toolbox: [],
		toolbox_current: new Block(20, 25, blocks.glass),
		characters: []
	};


$(function() {
	initialize();
	var c=document.getElementById("editor");
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
	
	
	function generate_ground() {
		layer.background.push(new Block(0, 600-32, blocks.grass_left));
		for(var i = 32; i < (800 -32); i += 32) {
			layer.background.push(new Block(i, 600-32, blocks.grass_mid));
		}
		layer.background.push(new Block(800-32, 600-32, blocks.grass_right));
	}
	
	function generate_toolbox() {
		var startX = 800;
		var startY = 40;
		
		var blocks_rendered = 0;
		for(block in blocks) {
			layer.toolbox.push(new Block(startX + blocks_rendered*40, startY, blocks[block]));
			blocks_rendered++;
			if(blocks_rendered > 4) {//max 5 blocks per line
				startY = startY + 40;
				blocks_rendered = 0;
			}
		}
	}
	
	function initialize() {
		generate_ground();
		generate_toolbox();
	}

	function update_layer(layer) {
		for(var i = 0; i < layer.length; i++) {
			layer[i].update();
		}
	}
	
	function gamelogic() {

	}
	
	function render_layer(layer) {
		for(var i = 0; i < layer.length; i++) {
			layer[i].draw(context);
		}
	}
	
	function render_toolbox() {
		render_layer(layer.toolbox);
		context.fillText("Current: ", 20, 20);
		layer.toolbox_current.draw(context);
	}
	
	function render() {
		context.clearRect(0, 0, c.width, c.height);
		render_layer(layer.background);
		render_layer(layer.loot);
		render_toolbox();
		render_layer(layer.placed);
		render_layer(layer.characters);
	}
	
	
	function update_generated_map() {
		var generated_blocks = "";
		for(var i = 0; i < layer.placed.length; i++) {
			var placed = layer.placed[i];
			generated_blocks += "new Block(" + placed.toString() + "),\r\n";
		}
		$("#generatedmap").text("" +
    			"var map = [" +
    			generated_blocks +
    			"];");
	}
	
	$("#editor").click(function(event) {
		
		//get correct block from toolbox by mouse click
	    var x = Math.floor((event.pageX - $("#editor").offset().left));
	    var y = Math.floor((event.pageY - $("#editor").offset().top));
	    var selectedIndex = 0;
	    selectedIndex += Math.floor((x - 800) / 40);
	    selectedIndex += Math.floor(((y - 40) / 40)) * 5;
	    if(x < 800 && y < 600) {
	    	var added_block = new Block(x - 16, y - 16, layer.toolbox_current.getImageCoords());
	    	layer.placed.push(added_block);
	    	update_generated_map();
	    } else if(selectedIndex > 0 && selectedIndex < layer.toolbox.length) {
	    	layer.toolbox_current = new Block(20, 25, layer.toolbox[selectedIndex].getImageCoords());
	    }
	});
});
