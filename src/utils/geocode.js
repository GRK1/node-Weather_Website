const request = require('request')
const geocodeurl =(place,callback)=>{
    const geocodeurl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+place+'.json?access_token=pk.eyJ1IjoicmFodWxub2RlanMiLCJhIjoiY2s4bHdxYjM2MDMzMjNzbnR3dGRpeDczbiJ9.053qDV266kdKO4WIDR-wZQ&limit=1';
    request({url:geocodeurl,json:true},(error,response)=>{
             if(error)
             {
                 callback('not able to connect with mapBox',undefined)
             }
             else if(!response.body.features.length)
             {
                 callback('please check url',undefined)
             }
             else
             {
                const data={
                    Latitude:response.body.features[0].center[1],
                    Longitude:response.body.features[0].center[0],
                    place:response.body.features[0].place_name
                }
                callback(undefined,data)
             }
    })
}

module.exports = geocodeurl