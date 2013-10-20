/**
 * 		this.renderBlock(300, 150, "Start game");
		this.renderBlock(300, 230, "Map editor");
 */
function MainMenu() {
	
	this.initialize = function() {
		
		this.addMenuItem(new Rectangle(300, 150, 200, 60), "Start game", function() {
			game.setState(new GamePlay());
		});
		
		this.addMenuItem(new Rectangle(300, 230, 200, 60), "Map editor", function() {
			game.setState(new MapEditor());
		});
		game.resize(800);
		context.font = "bold 24px Arial";
	}
	
	this.update = function() {
		
	}
	
	this.render = function() {
		for(var i = 0; i < menu_items.length; i++) {
			var menu_item = menu_items[i];
			this.renderBlock(menu_item.rect.x, menu_item.rect.y, menu_item.text);
		}
	}
	
	this.renderBlock = function(x, y, text) {
		context.beginPath();
		context.rect(x, y, 200, 60);
		context.lineWidth = 2;
		context.strokeStyle = 'black';
		context.stroke();
		context.fillText(text, x + (100 - 6*text.length), y + 35);
	}
	
	this.mouseClick = function(x, y) {
		for(var i = 0; i < menu_items.length; i++) {
			var menu_item = menu_items[i];
			if(menu_item.rect.isClicked(x, y)) {
				menu_item.callback();
			}
		}
	}
	
	var menu_items = [];
	
	this.addMenuItem = function(rect, text, callback) {
		menu_items.push({
			rect: rect,
			text: text,
			callback: callback
		});
	}
}

function Rectangle(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	
	this.isClicked = function(_x, _y) {
		return this.x < _x && this.x + this.width > _x && this.y < _y && this.y + this.height > _y;
	}
}