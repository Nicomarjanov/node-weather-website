const path = require('path')

const express = require('express')
const hbs = require('hbs')
const app = express()

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Define pathd for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars into express and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set uo static directory to serve
app.use(express.static(publicDirectoryPath))


//Dinamic pages declaration (route handler)
app.get('',(req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Nico'
    })    
})

app.get('/about',(req, res) => {
    res.render('about',{
        title: 'About me',
        name: 'Nico'
    })
})

app.get('/help',(req, res) => {
    res.render('help',{
        title: 'HELP page',
        helpMessage: 'Help message',
        name: 'Nico'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provided an addressS'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude,location} = {}) => {
        if(error){
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecastdata) => {
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forecastdata,
                address: req.query.address,
                location
               
            })
           
        })

    })
    
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provided a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        errorMessage: 'Help article not found',
        name: 'Nico',
        title: 'Error Help'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        errorMessage: 'Page not found',
        name: 'Nico',
        title: '404 page'
    })
})

//Inicia express
app.listen(3000, () => {
    console.log('Server is up on port 3000')

})