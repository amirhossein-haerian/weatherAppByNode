const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

const config = require(path.join(__dirname, './config'));
const geocode = require(path.join(__dirname, './utils/geocode'));
const weather = require(path.join(__dirname, './utils/weather'));

const publicDirectoryPath = path.join(__dirname, '../public');
const partialsPath = path.join(__dirname, './partials')

app.use(express.static(publicDirectoryPath));

app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

app.get('', (req, res)=> {
    res.render('index',{greeting: 'glad to see you here!', title: 'index', name: 'amirho3in'})
})

app.get('/about', (req, res)=> {
    res.render('about',{name: 'amirho3in', job: 'front-end developer', title: 'about'})
})

app.get('/help', (req, res)=> {
    res.render('help',{topic: 'English', title: 'help' , name: 'amirho3in'})
})

// app.get('/weather', (req, res)=> {
//     res.render('weather',{location: 'Tehran', forecast: '50 degree', title: 'weather', name: 'amirho3in'})
// })

app.get('/weather', (req, res)=> {
    if(!req.query.location){
        return res.send({
            error: 'location is empty!'
        })
    }
    else {
        geocode(req.query.location || config.location, ({lat, long, location} = {}, error) => {
            if(error){
                res.send({error: error.message});
            }else{
                weather({lat, long}, ({weatherDescription, temperature, feelslike}, error) => {
                    if (error){
                        res.send({error: error.message});             
                    }else{
                        res.send({location, weatherDescription, temperature, feelslike});
                    }

                })
            }
        });
    }
})

app.get('/help/*', (req, res)=> {
    res.render('404',{title: '404', errorMessage: 'article not found!', name: 'amirho3in'})
})

app.get('/*', (req, res)=> {
    res.render('404',{title: '404', errorMessage: 'page not found!', name: 'amirho3in'})
})

app.listen(3000, () => {
    console.log('server is up on port 3000!')
})