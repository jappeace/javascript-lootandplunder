// a basic counter that returns tro when limit is reached
function Counter(to){
	var _limit = to < 0 ? to * -1 : to;
	var _current = 0;

	this.execute = function(){
		_current ++;
		if(_current >= _limit){
			_current = 0;
			return true;
		}
		return false;
	};
}
