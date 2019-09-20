const path = require('path')
const geoCode= require('./utils/geocode')
const forecast= require('./utils/forecast')

const port = process.env.PORT || 3000

var express = require('express');
var exphbs  = require('express-handlebars');
const publicdirectorypath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../views')
const partialsPath = path.join(__dirname, '../views/partials')

var app = express();

app.engine('handlebars', exphbs({
    partialsDir:partialsPath
}));
app.set('view engine', 'handlebars')
app.set('views', viewPath)

app.use(express.static(publicdirectorypath))

app.get('', (req, res)=>{
    res.render('index', {
        layout:false,
        title:'Weather app',
        name:'Yves Kab'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        layout:false,
        title:'about',
        name:'Yves Kab'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        layout:false,
        helpText:'this is some helpfull text',
        title:'help',
        name:'Yves Kab'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
         res.send('error: there is no address entered')
    }else{
        geoCode(req.query.address,(error,{long,lat,location}={})=>{
            if(error){
                return res.send({error})
            } 
            forecast(lat,long, (error2,forecastdata)=>{
                if(error2){
                    return res.send({error2})
                }
                res.send({

                    forecast:forecastdata,
                    location,
                    address:req.query.address
                })
            })
        })
    }
})

app.get('/products', (req, res)=>{
    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('*',(req,res)=>{
    res.send('404 message')
})

app.listen(PORT, ()=>{
    console.log('server running on port'+PORT)
})
