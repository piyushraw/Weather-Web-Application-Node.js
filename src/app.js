const path = require('path');
const hbs = require('hbs');
const express = require('express');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express()

const port = process.env.PORT || 3000

          //  Define paths for express config

const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../Templates/views');
const partialspath = path.join(__dirname,'../Templates/partials');


   // setup handlebars engine and views location 

app.set('view engine','hbs'); 
app.set('views', viewsPath);
hbs.registerPartials(partialspath);

// setup static directory to serve 

app.use(express.static(publicDirectoryPath));

app.get ('', (req, res)   =>  {

res.render('index', {

    title : 'Weather',
    name : 'Andrew Mead'

})

})

app.get('/about' , (req, res)  => {

res.render('about' , {

        title :'About Me',
        name : 'Robot'

})

})

app.get('/help' , (req,res)  => {

res.render('help' , {

    title: 'Help',
    name : 'Piyush'

})

})


app.get('/weather', (req, res) =>   {

    if(!req.query.address) {

       res.send({

           error: 'you must provide a address'
       })

    }


    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {

        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude,(error, forecastData)=>{

       if(error){
           return res.send({error})
       }

       res.send({

        forecast:forecastData,
        location,
        address: req.query.address

})

 })
    })


      })


app.get('/products',(req, res)   => {

    if(!req.query.search){
             res.send({

                error: 'You must provide a search term'

             })

            }

            console.log(req.query.search)

            res.send  ({ products: []

     })

})

app.get('/help/*', (req,res)  =>  {

    res.render('404',{

        title: 404 ,
        name : 'Piyush Rawat' ,
        errorMessage : 'Help article not found.' 
    })
    
})

app.get('*',(req,res) => {

res.render('404', {
    title: 404,
    name : 'Andrew Mead',
    errorMessage:'Page not found.'
})

})


app.listen(port, ()    =>     {

    console.log('Server is up on port ' + port);
})


