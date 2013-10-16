// a vector is somthing that holds the amount of dimensions specified by the name.
// these ar usealy floats and can be calculated with.
//
// Constructor for vector... default values for x and y are zero
function Vector(x, y) {

	x = typeof x !== 'undefined' ? x : 0;
	y = typeof y !== 'undefined' ? y : 0;
	var _x = x;
	var _y = y;
	
	this.getX = function(){
		return _x;
	};

	this.getY = function(){
		return _y;
	};

	this.setX = function(to){
		_x = to;
		return this;
	};

	this.setY = function(to){
		_y = to;
		return this;
	};
	this.clone = function(){
		var result = new this();
		result.setX(_x);
		result.setY(_y);
		return result;
	};
	this.add = function(vector){
		_x += vector.getX();
		_y += vector.getY();
		return this;
	};

	this.substract = function(vector){
		_x -= vector.getX();
		_y -= vector.getY();
		return this;
	};

	this.multiply = function(vector){
		_x *= vector.getX();
		_y *= vector.getY();
		return this;
	};

	this.divide = function(vector){
		_x /= vector.getX();
		_y /= vector.getY();
		return this;
	};
}


