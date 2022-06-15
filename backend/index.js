const express = require('express')
var cors = require('cors')
const loginRoute = require('./routes/loginRoute')
const signinRoute = require('./routes/signinRoute')
const findUserRoute = require('./routes/findUserRoute')
const addProduct = require('./routes/Addproduct')
const deleteProduct = require('./routes/DeleteProduct')
const editProduct = require('./routes/EditProduct')
const featureProductRoute = require('./routes/FeatureProductRoute')
const latestProductRoute = require('./routes/LatestProductRoute')
const topCategoryRoute = require('./routes/TopCategoryRoute')
const manageUserRoute = require('./routes/manageUser')

const fetchAllProduct = require('./routes/FetchAllProduct')
const path = require('path')
const app = express()

app.use('/static', express.static(path.resolve('uploads')))

app.use(cors())
app.use('/login', loginRoute);
app.use('/signin', signinRoute);
app.use('/findUser', findUserRoute);
app.use('/addproduct', addProduct);
app.use('/fetchProduct', fetchAllProduct);
app.use('/deleteProduct', deleteProduct);
app.use('/editProduct', editProduct);
app.use('/featureproduct', featureProductRoute);
app.use('/latestproduct',latestProductRoute );
app.use('/topcategory', topCategoryRoute);
app.use('/manageUser', manageUserRoute);


app.listen(3001, ()=>{console.log('Server running on 3001')});