const request = require("request");

const forecast = (latitude, longitude, callback)  =>  {

    const url = 'http://api.weatherstack.com/current?access_key=a8513ba76d578160a922bd6be4e83ea1&query=' + latitude + ',' + longitude + '&units=m';
 
           request({url, json : true}, (error, { body })  => {


            if (error) {

                callback('Unable to connect to weather service!', undefined);
                
            }  else if (body.error)  {

                callback('Unable to find location', undefined);


            } else {

                callback(undefined ,body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels ' + body.current.feelslike +'% chance of rain.')
            }
            
           })

}

module.exports = forecast;

