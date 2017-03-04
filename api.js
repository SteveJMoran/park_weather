var Api = (function () {
	var url = 'http://api.openweathermap.org/data/2.5/';
	var appId = "d7ba88cf3ed8a5e0ef3ae4e0e5a1cdba";

	function apiRequest(q) {
	    var request = new XMLHttpRequest();

	    request.onload = function() {
	        if (request.readyState == request.DONE ) {
	           if (request.status == 200) {
	               var response = request.responseText;
	               //return response;
	           }
	           else if (request.status == 400) {
	               var response = 'There was an error 400';
	           }
	           else {
	               var response = 'something else other than 200 was returned';
	           }
	        }
	        return response;
	    };

	    request.open("GET", q, true);
	    request.send();
	    return request.onload();
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

// var Forecast = (function () {
// 	var fiveday = function() {
// 		var city = "6094817";
// 		var con = "http://api.openweathermap.org/data/2.5/forecast?id=" + city + "&units=metric&appid=" + appId;
// 		request.open("GET", con, false);
// 		request.send();
// 		return request.onload();
// 	}
// 	var hourly = function(data) {
// 		var list = data.list;
// 		var temp = [];
// 		var coords = [];
// 		var spread = 0;

// 		for (var i = list.length - 1; i >= 0; i--) {
// 			//console.log(list[i]);
// 			temp.push((list[i].main.temp + 40)

// 		);

// 		}
// 		for (var i = temp.length - 1; i >= 0; i--) {

// 			coords.push(spread +' ' +temp[i]);
// 			spread = spread + 75;
// 		}
// 		trend = document.getElementById('temperature');
// 		trend.setAttribute("points", coords);
// 	}

// 	// table set up
// 	var chart = function(high, low) {
// 		var chart = document.getElementById('chart');
// 		var intervalContainer = document.createElement('g');
// 		intervalContainer.id = 'intervals'
// 		var spacer = 5;
// 		var interval = low;

// 		while (interval <= high) {
// 			point = interval + 75;
// 			intervalContainer.innerHTML +='<polyline fill="none" stroke="#ddd" stroke-width="0.5" points="00,'+point+' 800,'+point+'" />';
// 			interval = interval + spacer;
// 		}

// 		chart.insertBefore(intervalContainer, chart.firstChild);
// 	}

// 	return {
// 		init : function() {
// 			chart(40, -40);
// 		},
// 		data: function () {
// 		  hourly(fiveday());
// 		}
// 	};

