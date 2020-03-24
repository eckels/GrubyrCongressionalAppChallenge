//var socket = io.connect('/')
var socket = io.connect('http://localhost:3000/')
	function goToList()
	{
		var City = document.getElementById("inputCity").value;
		var State = document.getElementById("inputState").value;
		if(City == 0 || State == 0)
		{
			alert("Please fill out all the fields.")
		}else{
		sessionStorage.setItem('state', State);
		sessionStorage.setItem('city', City);
		location.href="browse.html";
		}
	}

	function geoFindMe() {
	  var output = document.getElementById("out");

	  if (!navigator.geolocation){
		output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
		return;
	  }

	  function success(position) {
		var latitude  = position.coords.latitude;
		var longitude = position.coords.longitude;

		output.innerHTML = '<p>Latitude is ' + latitude + ' <br>Longitude is ' + longitude + '</p>';

		output.appendChild(img);
	  };

	  function error() {
		output.innerHTML = "Unable to retrieve your location";
	  };

	  output.innerHTML = "<p>Locating�</p>";

	  navigator.geolocation.getCurrentPosition(success, error);
	}
