const request = require('request')
const geoCode= (address,callback)=>{
    const url= 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ decodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoia2FiMTMiLCJhIjoiY2swYjFiOGI1MG5oZDNjcGVrM3N4YmI0YiJ9.icjJQDHbzM-eK4HaITIdgw&limit=1'

    request({url, json:true},(error,{body})=>{
        if(error){
            callback('unable to connect to weather service',undefined)
        }else if(body.features.length===0){
            callback('unable to find location',undefined)
        }else{
            callback(undefined,{
                long:body.features[0].center[0],
                lat: body.features[0].center[1],
                location:body.features[0].place_name
            })
        }
    })
}

module.exports=geoCode