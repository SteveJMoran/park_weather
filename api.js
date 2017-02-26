var Forecast = (function () {
	var url = 'http://api.openweathermap.org/data/2.5/weather';
	var request = new XMLHttpRequest();

	request.onload = function() {
	  if (request.status >= 200 && request.status < 400) {
	    // Success!
	    var data = JSON.parse(request.responseText);
	  } else {
	    // We reached our target server, but it returned an error

	  }
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
		var data = request.onload;
		
	};

	return {
		data: function () {
		  console.log(config());
		}
	};

})();

Forecast.data();