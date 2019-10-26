const request =  require('request')


const geoLocation = (address,callBack)=>{
    const Url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYnRpdGoiLCJhIjoiY2syNGVyYzZ6MGlzbjNtcW1tanh1eWd4MyJ9.bKfgBU3QtjSPabSQECwugg&limit=1'

    request({url:Url,json:true},(error,response)=>{

        if(error){
             callBack('Check your internet connection',undefined)
        }
        else if(response.body.features.length === 0){

             callBack('ReCheck your place',undefined)
        }
        else{
             callBack(undefined,{
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location:  response.body.features[0].place_name
            })
        }

    })


}

module.exports = geoLocation

// const geoLocation = "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiYnRpdGoiLCJhIjoiY2syNGVyYzZ6MGlzbjNtcW1tanh1eWd4MyJ9.bKfgBU3QtjSPabSQECwugg&limit=1"
// request({url:geoLocation,json:true},(error,response) =>{

//     if(error){
//         console.log('Please check your internet');
        
//     }
//     else if(response.body.features[0] === 0){

//         console.log('Check your place ');
        

//     }
//     else{
//          console.log(response.body.features[0].center);
//     }
// })



