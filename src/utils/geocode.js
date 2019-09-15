const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address + '.json?access_token=pk.eyJ1IjoibmlyYXZkcGF0ZWwiLCJhIjoiY2p1cnlocjBuMGVtMDQ0cDV0MWxqNG15biJ9.SWwgyrHTooEFcTKdHxcwkA&limit=1';

    request({url: url, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect location service!', undefined);
        }
        else if(response.body.features.length === 0){
            callback('Unable to find the location. Try another search.',undefined);
        }
        else{
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
};

module.exports = geocode;