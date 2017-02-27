var Forecast = (function () {
	var url = 'http://api.openweathermap.org/data/2.5/weather';
	var appId = "d7ba88cf3ed8a5e0ef3ae4e0e5a1cdba";
	var request = new XMLHttpRequest();

	request.onload = function() {
	  if (request.status >= 200 && request.status < 400) {
	    // Success!
	    var data = JSON.parse(request.responseText);
	  } else {
	    // We reached our target server, but it returned an error
	  }
	  return data;
	};
	request.onerror = function() {
	  // There was a connection error of some sort
	};
	var config = function() {
		request.open('GET', 'config.json', true);
		request.send();
		return request.onload;
	}
	var latlong = function (lat, lon) {
		var lat = "44.504167"; 
		var lon = "-76.555833";
		var point = url + "?lat="+ lat +"&lon="+ lon +"&units=metric&appid="+appId;

		request.open("GET", point, false);
		request.send();
		var data = request.onload();
		
	};
	var fiveday = function() {
		var city = "6094817";
		var con = "http://api.openweathermap.org/data/2.5/forecast?id=" + city + "&units=metric&appid=" + appId;
		request.open("GET", con, false);
		request.send();
		return request.onload();
	}
	var hourly = function(data) {
		var list = data.list;
		var temp = [];
		var coords = [];
		var spread = 0;

		for (var i = list.length - 1; i >= 0; i--) {
			console.log(list[i]);
			temp.push(list[i].main.temp * 10);

		}
		for (var i = temp.length - 1; i >= 0; i--) {

			coords.push(spread +' ' +temp[i]);
			spread = spread + 75;
		}
		chart = document.getElementById('temperature');
		chart.setAttribute("points", coords);
	}

	return {
		data: function () {
		  //console.log(config());
		  console.log(hourly(fiveday()));
		}
	};

})();

Forecast.data();