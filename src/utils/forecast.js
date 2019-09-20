const request = require('request')

const forecast = (lat,long, callback)=>{
    const url = 'https://api.darksky.net/forecast/9668a2883a5ce121895338dbc4aa6c25/'+lat+','+long+'?units=si'
    request({url, json:true}, (error, {body}=response)=>{
        if(error){
            callback('unable to connect to weather service',undefined)
        }else if(body.error){
            callback('wrong coordinate',undefined)
        } else{
            callback(undefined,' it is currently ' +body.currently.temperature + ' out there, there is ' + body.currently.precipProbability + ' chance of rain')
            
        }
    })
}

module.exports= forecast