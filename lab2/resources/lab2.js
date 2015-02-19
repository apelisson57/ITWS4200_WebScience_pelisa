$(document).ready(function() {

	//get current location
	//var output = document.getElementById("weather");


	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(postPosition);

	}

	else {
		$("#weather").append("<p id=\"notFound\">\nLocation not found!\n</p>");
	}

	function postPosition(position) {

		console.log(position.coords.latitude);
		console.log(position.coords.longitude);

		//use ajax to get json
		var coords = { lat : position.coords.latitude, lon : position.coords.longitude }
		$.ajax({
			type: "POST",
			url: "http://api.openweathermap.org/data/2.5/weather",
			data: JSON.stringify(coords),
			dataType: "json"
		}).fail(function(xhr, textStatus, err) {
			alert("Error");
		});

		//populate html with json data
		var GETurl = "http://api.openweathermap.org/data/2.5/weather?lat=" 
		+ position.coords.latitude + "&lon=" + position.coords.longitude;

		$.ajax({
			type: "GET",
			url: GETurl,
			dataType: "jsonp",
			success: function(weatherData, status) {

				var temp_act = weatherData.main.temp - 273.15;
				temp_act = temp_act.toFixed(2);


				var w = "<div id=\"leftdata\">";

				w += "<img src=\"http://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png\">\n";
				w += "<h3><strong>" + temp_act + "&degC</strong></h3>\n</div>\n";
				w += "<div id=\"rightdata\">\n<h4>" + weatherData.name + "</h4>\n";
				w += "<p id=\"desc\"><small>" + weatherData.weather[0].description + "</small></p>\n";
				w += "<p id=\"wind\">Wind: " + weatherData.wind.speed + "mps</p>\n";
				w += "<p id=\"humid\">Humidity: " + weatherData.main.humidity + "%</p>\n</div>\n";

				$("#weather").append(w);

				//add necessary bootstrap classes
				$("#weather").addClass("panel panel-default");
				$("#leftdata").addClass("col-sm-2 text-center pull-left");
				$("#rightdata").addClass("col-sm-2 text-center pull-right");
				$("#desc").addClass("text-capitalize")


			},

			error: function(errCode, message) {
				alert("Error: did not get anything " + errCode.text + " " + message.text);
			}
		});
	
	}
});
