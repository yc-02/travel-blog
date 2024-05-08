const express =require ('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogRoutes')
require('dotenv').config()

const app = express()

const uri = `mongodb+srv://${process.env.username}:${process.env.password}@cluster0.toa8pga.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(uri)
    .then((result)=>app.listen(3000))
    .catch((err)=>console.log(err))



app.set('view engine','ejs')

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))

app.get('/',(req,res)=>{
     res.redirect('/blogs')
})

app.get('/about',(req,res)=>{
    res.render('about',{title:'About'})
})

app.get('/create',(req,res)=>{
    res.render('create',{title:'Create'})
})

app.use('/blogs',blogRoutes);

//404 page
app.use((req,res)=>{
    res.status(404).render('404',{title:'404'})
})