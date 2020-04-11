const request =require('request')
const forecast = (latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=a962db177fa3e9b41a1839b54aa2a7c6&query='+ latitude + ','  + longitude
    request({url:url,json:true},(error,response)=>{
      if(error) // generally comes when hit dont go to api (netwk issue)
      {
          callback('not able to connect with wheather stack',undefined)
      }
      else if(response.body.error)
    {
        callback('please check url',undefined)
    } 
    else{
        callback(undefined,'It is currently '+ response.body.current.feelslike +'.C there.' +'There is rain percentage i.e ' +response.body.current.precip +'.' )
    }

 })

}
module.exports = forecast