function debug(){
	this.leftwalk = function(){
		player.setDirection("left");
		player.getAnimation().left.idle = player.getAnimation().left.moving;
		player.getAnimation().refreshRate = 40;
	};
}
var _d = new debug();
