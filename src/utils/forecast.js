const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/b80a57cdc203e3ef8c2223949b21fe4e/'+latitude+','+longitude+'?units=si';

    request({url: url, json: true}, (error, response)=> {
        
        if(error){
            callback('Unable to connect weather service!', undefined);
        }
        else if(response.body.error){
            callback('Unable to find location!', undefined);
        }
        else{
            callback(undefined, {
                summary: response.body.daily.data[0].summary,
                probability: response.body.currently.precipProbability * 100,
                temp: response.body.currently.temperature
            })
        }
    })
}

module.exports = forecast;