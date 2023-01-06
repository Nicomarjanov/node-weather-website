const request = require('request')


const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c9f95a75c3d7582f0d36648bfef7c119&query='+ lat +','+long+'&units=m'

    request({ url, json:true},(error, {body})=>{
        if(error){
            callback('Unable to connect to the forecast service',undefined)
        }else if(body.error){
            callback('Unable to find location',undefined)
        }else{
            callback(undefined,body.current.weather_descriptions[0]+ '. it´s currently '+ body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' and the humidity is ' + body.current.humidity)
        }
    })
}

module.exports = forecast