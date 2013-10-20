

function update_generated_map() {
	var generated_blocks = "";
	for(var i = 0; i < layer.placed.length; i++) {
		var placed = layer.placed[i];
		generated_blocks += "new Block(" + placed.toString() + "),\r\n";
	}
	
	var text = "" +
	"var map = [" +
	generated_blocks +
	"];";
	
	$("#generatedmap").text(text);
	$("#mapgen").val(text);
}


function MapEditor() {
	this.initialize = function() {
		game.clearMap();
		this.generate_ground();
		this.generate_toolbox();
		game.resize(1000);
		context.font = "12px Arial";
	}
	
	this.update = function() {
		if(game.keys[27]) { //Escape is pressed
			game.setState(new MainMenu());
		}
	}
	
	this.render = function() {
		game.render_layer(game.layer.background);
		game.render_layer(game.layer.loot);
		this.render_toolbox();
		game.render_layer(game.layer.placed);
	}
	
	this.mouseClick = function(x, y) {
	    var selectedIndex = 0;
	    selectedIndex += Math.floor((x - 800) / 40);
	    selectedIndex += Math.floor(((y - 40) / 40)) * 5;
	    if(x < 800 && y < 600) {
	    	var added_block = new Block(x - 16, y - 16, game.layer.toolbox_current.getImageCoords());
	    	game.layer.placed.push(added_block);
	    } else if(selectedIndex > 0 && selectedIndex < game.layer.toolbox.length) {
	    	game.layer.toolbox_current = new Block(20, 25, game.layer.toolbox[selectedIndex].getImageCoords());
	    }
	}
	
	
	this.render_toolbox = function() {
		game.render_layer(game.layer.toolbox);
		context.fillText("Current: ", 20, 20);
		game.layer.toolbox_current.draw(context);
	}
	
	this.generate_ground = function() {
		game.layer.background.push(new Block(0, 600-32, blocks.grass_left));
		for(var i = 32; i < (800 -32); i += 32) {
			game.layer.background.push(new Block(i, 600-32, blocks.grass_mid));
		}
		game.layer.background.push(new Block(800-32, 600-32, blocks.grass_right));
	}
	
	this.generate_toolbox = function() {
		var startX = 800;
		var startY = 40;
		
		var blocks_rendered = 0;
		for(block in blocks) {
			game.layer.toolbox.push(new Block(startX + blocks_rendered*40, startY, blocks[block]));
			blocks_rendered++;
			if(blocks_rendered > 4) {//max 5 blocks per line
				startY = startY + 40;
				blocks_rendered = 0;
			}
		}
	}
}
