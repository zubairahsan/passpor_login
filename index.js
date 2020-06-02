const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const expressSession = require('express-session')
const cookieParser = require('cookie-parser')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(expressSession({secret:'abcd'}))
app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())
/** DB Connection */
mongoose.connect(require('./config').db_string,{useNewUrlParser:true})
.then(()=>{
    console.log('connected to db ')
})
.catch(err => console.log('error.. '+ err.message))


app.use('/api/user',require('./Routers/auth'))


const port = process.env.PORT || 8000

app.listen(port,()=> console.log(`server is running at port ${port}`))

