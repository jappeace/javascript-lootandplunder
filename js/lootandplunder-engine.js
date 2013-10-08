/**
 * 
 */
$(function() {
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
		
		function gamelogic() {
			
		}
		
		function render() {
			
		}
});