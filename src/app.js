const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocodeurl = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)


//define paths for express config
const publicpathDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
const app = express()
const port = process.env.port  ||3000

app.set('view engine', 'hbs')  // to tell express use hbs ->use internally handlebars
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//setup static directories to serve
app.use(express.static(publicpathDirectory))


app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Check Your Weather Forecast here'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Rahul Khandelwal'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'Help By Our Team',
    title: 'Help',
    name: 'Rahul Khandelwal'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({ error: 'Please provide address' })
  }

  geocodeurl(req.query.address,(error,response)=>{
    if(error)
    {
        return res.send({error})
    } 

     forecast(response.Latitude, response.Longitude, (error, data) => {
         if(error)
         {
            console.log(error)
         }
       
        res.send({
          data,
          Location:response.place,
          Address:req.query.address

        })
      })
 })




  // res.send({
  //   forecast: 'It is raining today ',
  //   location: 'New York',
  //   address: req.query.address
  // })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send('Please provide search atleast')
  }
  console.log(req.query)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('error', {
    title: 'Help Page',
    name: ' Rahul Khandelwal',
    message: 'Cannnot find this module inside help.'
  })
})
app.get('*', (req, res) => {
  res.render('error', {
    title: 'Error Page',
    name: 'Rahul Khandelwal',
    message: 'Error 404'
  })
})

app.listen(port, () => {
  console.log('Server is started on port ' + port)
})











  //  app.get('',(req,res)=>{
//       res.send('<h1>hello express!</h1>')
//  })
//  app.get('/help',(req,res)=>{
//      console.log(req)
//    res.send({name:'rahul',class:'pk'})
//  })
//  app.get('/about',(req,res)=>{
//     res.send('<h1>About page</h1>')
//   })