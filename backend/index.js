const express = require('express')
const loginRouter = require('./routes/loginRoute')

const app = express()

app.use('/login', loginRouter);

app.listen(3001, ()=>{console.log('Server running on 3001')})