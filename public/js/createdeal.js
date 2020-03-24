//var socket = io.connect('/')
var socket = io.connect('http://localhost:3000/')

 function concatDeal() {
	var itemValue = document.getElementById('item').value;
	var priceValue = document.getElementById('price').value;
	var name = document.getElementById("name").value;
	var address = document.getElementById("address").value;
	if(itemValue == 0 || priceValue == 0 || name == 0 || address == 0)
	{
		alert("Please enter values");
	}else{
		var data = {
			FoodName: itemValue,
      FoodPrice: priceValue,
			name: name,
			address: address
		}
		socket.emit("insert deal",data);
	}
}
