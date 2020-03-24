const monk = require('monk')('localhost/grubyr');
var request = require('request');

const restaurants = monk.get('restaurants');
var addressesFromGoogle = [];
var addressesFromDatabase = [];
var matchedAddresses = [];
/*
restaurants.find({}, 'address').then(function(docs) {
   console.log(docs)
});
process.on('unhandledRejection', function(p, err) {
    console.log(err);
})
*/

// make a request to the google maps api
// only parse the formatted addresses
// store all of those addresses in an array
// iterate over the addresses in teh database and compare them with the triple equals sign against the ones in the array
// store the entire document where the string matches

request('https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in'+city+state+'&radius=50000&key=AIzaSyCHUVBRMnmsHc-9FFGPBiNt4c5YDzjM-p8', function(err, response, body) {
    //console.log(body);
    var newBody = JSON.parse(body);

    for(i = 0; i < newBody.results.length; i++) {
        addressesFromGoogle.push(newBody.results[i].formatted_address);
    //console.log(newBody.results[i].formatted_address);

    }
    //console.log(addressesFromGoogle);
    restaurants.find({}, 'address').then(function(docs) {
        for(i = 0; i < docs.length;i++) {
        addressesFromDatabase.push((docs[i].address));
        }
        for(j = 0; j < addressesFromDatabase.length; j++) {
        for(i = 0; i < addressesFromGoogle.length; i++) {
           if(addressesFromDatabase[j] === addressesFromGoogle[i]) {
                matchedAddresses.push(addressesFromGoogle[i]);
           }
        }
    }
        console.log(matchedAddresses);
});
    console.log(matchedAddresses);
});
