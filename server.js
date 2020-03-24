var http = require('http');
var express = require('express');
var fs      = require('fs');
var app     = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var request = require('request');
const monk = require('monk')('localhost/grubyr');
const restaurants = monk.get('restaurants');
var addressesFromGoogle = [];//All from google API
var addressesFromDatabase = [];//All Deals
var matchedAddresses = [];//All common restaurants
var matchedGoogle = [];//Parallel Arrays
var matchedDatabase = [];//Parallel Arrays

io.on('connection', function (socket) {

	socket.on("Send State and City",function(data){
		var state = data.state;
		var city = data.city;
		var SendData = [];
		request('https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in'+city+state+'&radius=50000&key=AIzaSyAuD8N6kkBLlpZQpZ8WgZtx-GuYTolb_lU', function(err, response, body) {
		    //console.log(body);
		    var newBody = JSON.parse(body);
				console.log(newBody);
		    for(b = 0; b < newBody.results.length; b++) {
		        addressesFromGoogle.push(newBody.results[b]);
		    }

		    //console.log(addressesFromGoogle);
		    restaurants.find({}).then(function(docs) {
		        for(i = 0; i < docs.length;i++)
						{
		        	addressesFromDatabase.push((docs[i]));
		        }
			        for(j = 0; j < addressesFromDatabase.length; j++)
							{
								console.log(addressesFromGoogle.length);
			        	for(x = 0; x < addressesFromGoogle.length; x++)
								{
			           	if(addressesFromDatabase[j].address === addressesFromGoogle[x].formatted_address)
									{
			                //matchedAddresses.push(addressesFromGoogle[x]);
											matchedGoogle.push(addressesFromGoogle[x]);

											matchedDatabase.push(addressesFromDatabase[j]);
			           	}
			        	}
			    		}
						for(m = 0; m < matchedDatabase.length; m++)
						{
							var Data = {
								Name:matchedDatabase[m].name,
								FoodName:matchedDatabase[m].food,
								NumOfUp:matchedDatabase[m].upvote,
								Price:matchedDatabase[m].price,
								ShopImage:matchedGoogle[m].photos,
								Address:matchedDatabase[m].address
							}
							SendData.push(Data);
						}
						socket.emit("Event Trigger For Display", SendData);
					});
		});
	});

	socket.on("insert deal",function(data){
		var name = data.name;
		var address = data.address;
		var food = data.FoodName;//ItemValue,ItemPrice
		var price = data.FoodPrice
		restaurants.insert([{name:name,address:address,food:food,price:price,upvote:0}]);
	});

	socket.on("UpVote Event", function(Data){
    var before;
				console.log(Data);
        restaurants.find({}).then(function(docs)
        {
                for(i=0;i<docs.length;i++)
                {
									console.log("ASD");
                    if(Data.address == docs[i].address)
                        {
													console.log("ASDF")
                         before = docs[i].upvote;
												 console.log("Successful");
                         break;
                        }
                }

            restaurants.update({upvote: before}, {$set: {upvote: before + 1}})
        })
})

});

function send404Response(response){
	response.writeHead(404, {"Content-Type": "text/plain"});
	response.write("Error 404: Page not found!");
	response.end();
};

app.use(express.static(__dirname + '/public'));

server.listen(process.env.PORT || 3000, function () {
  console.log('Server listening at port %d 3000');
});
