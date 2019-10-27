const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geoLocation = require('./utils/geoLocation')
const forcast = require('./utils/forcast')

//Setup express
const app = express()
const port = process.env.PORT ||3000

//Define path for express config
const publicPath = path.join(__dirname,"../public")
const pathOfViews = path.join(__dirname,"../templets/views")
const partialPath = path.join(__dirname,'../templets/partials')

//Setup Handler engine and view location
app.set('view engine','hbs')
app.set('views',pathOfViews)
hbs.registerPartials(partialPath)

//Setup static directory to server
app.use(express.static(publicPath))

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
app.get('',(req,res)=>{

    //First argument be name of file and second argument will be values that want to be excess
   res.render('index',{
       title:'Weather App',
       creator:'Sahil Verma'
   })

})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        creator:'Sahil Verma',
        helpText:"You don't need to help" 
    })
})

app.get('/about',(req,res)=>{

    res.render('about',{
        title:'About',
        creator:'Sahil Verma'
    })
})

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//Here we generating Json data of a search item {/weather?address=kuch bhi}


app.get('/weather',(req,res)=>{

    if(!req.query.address){
     return   res.send({
            error:'Do a valid address search'
        })
    }


    geoLocation(req.query.address, (error, data)=>{
        if(error){
       return res.send({
        error: error
    }) 
       //console.log('Error: ',error);
     }
         forcast(data.latitude,data.longitude , (error,datas) => {
         if(error){
            return res.send({
                error: error
            }) 
        }

        const curently = datas.currently
        const temp = curently.temperature
        const pept = curently.precipProbability

        res.send({
            forcast: datas.daily.data[0].summary +" It's curently temperature: "+temp +" degress out"+ " and their is "+pept+"% of chance of rain",
            temperature : temp ,
            location : data.location,
            address: req.query.address
        })
    
        
       // console.log('Data => ', datas.daily.data[0].summary +" Its curently temperature: "+temp + " and their is "+pept+"% of chance of rain");
        })
    
    
        })

   
    // res.send({
    //     location:'Hisar',
    //     temperature:'Cool',
    //     address:req.query.address
    // })
    
    
})


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//Specific error
app.get('/help/*',(req,res)=>{
    res.send('Keem Choo')
})

//Here we create error page , agar user koi esa page open krne ko krta h jo ki h hi nhi to error ayega
//this is static
// app.get('*',(req,res)=>{
//  res.send('404 Error : Galat jgha agya re')

// })

//This is dynamic

app.get('*',(req,res)=>{
    res.render('error404',{
        title:'404 Error',
        errorMessage:'Page not found',
        creator:'Sahil Verma'
    })
})



//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>





app.listen(port,()=>{
    console.log('Server is open port '+port);
    
})