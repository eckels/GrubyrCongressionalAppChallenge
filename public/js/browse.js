//var socket = io.connect('/')
var socket = io.connect('http://localhost:3000/')
var State = sessionStorage.getItem('state');
var City = sessionStorage.getItem('city');
var Permanant;
var LocationVar = {
	state: State,
	city: City
}

function Vote(x)
{
	console.log(x + " WORDSS");
	console.log(Permanant[x].Address);
	var Data = {
		address: Permanant[x].Address
	}
	Permanant[x].NumOfUp++;
	document.getElementById("vote-button").disabled = true;
	document.getElementById("increasevalue").innerHTML += 1;
	document.getElementById('vote-button').src='img/upvote-active.png';
	socket.emit("UpVote Event", Data);
}

socket.emit("Send State and City", LocationVar);
socket.on("Event Trigger For Display",function(data){
	Permanant = data;
	console.log(Permanant)
	var preset1 = "<div class='list-entry'><div class='clearfix'><div class='list-entry-img-div'><img src='https://maps.googleapis.com/maps/api/place/photo?maxwidth=66%&maxheight=66%&photo_reference="
	var preset2 = "&key=AIzaSyCOoEVPFI_2EBO_G9VrmIijRg6apzr6uM4'alt='Restaurant Image'></div><div class='list-entry-div-left'><h2>"
	var preset3 = "</h2><p class='list-entry-time'>Closes at <b>10:30pm</b></p></div><div class='list-entry-div-vote'><img src='img/upvote.png' onclick="
	var presetButton = " id='vote-button'><p id='increasevalue' class='list-entry-counter'>"
	var preset4 = "</p><p class='list-entry-desc'>Upvotes</p></div><div class='list-entry-div-right'><p class='list-entry-item'>"
	var preset5 = "</p><p class='list-entry-price'>"
	var preset6 = "</p></div></div></div>"

	for(i=0; i < data.length; i++)
	{
		document.getElementById("ListArea").innerHTML += preset1 + data[i].ShopImage[0].photo_reference + preset2 + data[i].Name + preset3 + "Vote("+ i + ")" +presetButton +data[i].NumOfUp + preset4 + data[i].FoodName + preset5 + data[i].Price + preset6
	}

});
