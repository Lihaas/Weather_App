const request = require('request')

// const url = 'https://api.darksky.net/forecast/05ec4480738c6b5706d5e38362aa7e87/37.8267,-122.4233'

// request({url : url,json:true},(error,response)=>{

//     if(error){
//         console.log('Check your internet connection');
        
//     }
//     else if(response.body.error){

//         console.log('Loaction is incorrect');
        
//     }else{
//         const curently = response.body.currently
//    const temp = curently.temperature
//    const pept = curently.precipProbability

//     console.log(response.body.daily.data[0].summary +" Its curently "+temp + " and their is "+pept+"% of chance of rain");

//     }
//    })



const   forcast = (latitude,longitude,callBack)=>{
const url = 'https://api.darksky.net/forecast/05ec4480738c6b5706d5e38362aa7e87/'+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)

request({url:url,json:true},(error,response)=>{

    if(error){
        callBack('Check your internet connection',undefined)
    }
    else if(response.body.error){

        callBack('Loaction is incorrect',undefined)
  }
  else{
       
        const data = response.body
       callBack(undefined,data)

}
})


}


module.exports = forcast


    
