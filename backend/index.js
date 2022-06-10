const express = require('express')
var cors = require('cors')
const loginRoute = require('./routes/loginRoute')
const signinRoute = require('./routes/signinRoute')
const app = express()

app.use(cors())
app.use('/login', loginRoute);
app.use('/signin', signinRoute)

app.listen(3001, ()=>{console.log('Server running on 3001')})