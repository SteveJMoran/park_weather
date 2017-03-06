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
