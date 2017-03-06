var App = (function (){
	var init = function () {
		window.myTrip = {}
		//console.log('App');
	}
	var currentConditions = function (location) {
		if(typeof location === 'string') {
			var report = Api.get('weather?q='+location);
		} else if (typeof location === 'object') {
			var lat = location[0]
			var lon = location[1]
			var report = Api.get('weather?lat='+lat+'&lon='+lon);
		} else {
			alert('unknown location type');
		}
		return report;
	}
	return {
		init : function() {
			init();
		},
		current : function(location) {
			var results = currentConditions(location);
			return results;
		}
	}
})();

App.init();
App.current('ottawa');
App.current(["44.504167","-76.555833"]);