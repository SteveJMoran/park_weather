var Api = (function () {
	var url = 'http://api.openweathermap.org/data/2.5/';
	var appId = "d7ba88cf3ed8a5e0ef3ae4e0e5a1cdba";
	
	function write(data) {
		var reportObj = JSON.parse(data);
		(window.myTrip.weather = window.myTrip.weather || []).push({timestamp : reportObj});
	}
	function apiRequest(q) {
	    var request = new XMLHttpRequest();

	    request.onload = function() {
	        if (request.readyState == request.DONE ) {
	           if (request.status == 200) {
	               write(request.responseText);
	           }
	           else if (request.status == 400) {
	               var response = 'There was an error 400';
	           }
	           else {
	               var response = 'something else other than 200 was returned';
	           }
	        }
	    };
	    request.open("GET", q, true);
	    request.send();
	}

	return {
		get : function (q){
			var endpoint = url + q + '&appid='+appId;
			var data = apiRequest(endpoint);
			console.log(data);
			return data;
		}
	}
})();
var App = (function (){
	var init = function () {
		window.myTrip = {}
		//console.log('App');
	}
	var currentConditions = function (location) {
		if(typeof location === 'string') {
			var locationType = 'city';
			var report = Api.get('weather?q='+location);
		} else if (typeof location === 'object') {
			var locationType = 'latlong';
			var lat = location[0]
			var lon = location[1]
			var report = Api.get('weather?lat='+lat+'&lon='+lon);
		} else {
			var locationType = 'unknown';
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
