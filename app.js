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



mongoose.connect(process.env.MONGODB_URI)
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