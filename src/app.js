const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

//Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Set handlebar sengine and view 
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Set up static path to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Nirav Patel'
    });
});

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        name: 'Nirav Patel'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is some helpful text.',
        name: 'Nirav Patel'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide an address!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location}={}) => {
        if(error){
            return res.send({
                error    
            })
        }

        forecast(latitude, longitude, (error, {summary, probability, temp}={}) => {
            if(error){
                return res.send({
                    error
                })
            }

            res.send({
                location,
                forecast: summary+' It is currently '+temp+' degrees out. There is a '+probability+'% chance of rain.'
            })
        })

    })
    
})

app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send({
            error: 'Please provide the search term!'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404',{
        title: '404 Page',
        name: 'Nirav Patel',
        errorMessage: 'Help article not found'
    })
})
app.get('*', (req,res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Nirav Patel',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, ()=> {
    console.log('Server is up on port 3000...');
});