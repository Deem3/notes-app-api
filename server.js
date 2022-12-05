// importing modules
require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

const noteRoutes = require('./routes/notes')
const usersRoutes = require('./routes/users')


// middleware

app.use(
    cors({
        origin: "https://notes-app-s54f.onrender.com",
    })
)

app.use(express.json())

app.use((req, res, next)=>{
    console.log(req.path, req.method)
    next()
})

// routes

app.use('/api/notes',noteRoutes)

// login/signup router

app.use('/api/user', usersRoutes)

mongoose.connect(process.env.DB_URI)
    .then(()=>{
        app.listen(process.env.PORT, ()=>{
            console.log(`server works on port number ${process.env.PORT} & Database connected`)
        
        })
    })
    .catch((error)=>{
        console.log(`there is something went wrong ${error}`)
    })

