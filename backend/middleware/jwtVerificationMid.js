//JWT varification Token Middleware
function verifyToken(req, res, next){
    console.log("header : ",req.headers['authorization'],"😂😂😂");
    // console.log(req.body)
    const tokenString = req.headers['authorization']
    
    if(typeof tokenString !== 'undefined'){
        const bearer = tokenString.split(' ')
        const token = bearer[0]
        req.token = token
        console.log('token : ', req.token)
        next()   
    }else{
        res.send('403 in middleWare')
    }
}

module.exports = { verifyToken }