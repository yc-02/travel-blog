const express =require ('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path');
const blogRoutes = require('./routes/blogRoutes')
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser')
const {requireAuth, checkCurrentUser} = require('./middleware/authMiddleware')
require('dotenv').config()
const app = express()



const uri = `mongodb+srv://${process.env.username}:${process.env.password}@cluster0.toa8pga.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
mongoose.connect(uri)
    .then((result)=>app.listen(3000))
    .catch((err)=>console.log(err))




app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))
app.set('view engine','ejs')
app.set('views', path.join(__dirname, 'views'));
app.get('*',checkCurrentUser);




app.get('/',(req,res)=>{
     res.redirect('/blogs')
})

app.get('/about',(req,res)=>{
    res.render('about',{title:'About'})
})

app.get('/create',requireAuth,(req,res)=>{
    res.render('create',{title:'Create'})
})

app.use('/blogs',blogRoutes);
app.use('/auth',authRoutes)

//404 page
app.use((req,res)=>{
    res.status(404).render('404',{title:'404'})
})

module.exports = app