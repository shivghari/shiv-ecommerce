//JWT varification Token Middleware
function verifyToken(req, res, next) {
    const tokenString = req.headers['authorization']
    if (typeof tokenString !== 'undefined') {
        const bearer = tokenString.split(' ')
        const token = bearer[0]
        req.token = token
        next()
    } else {
        console.log('Token is not verified')
        res.send('403 in middleWare')
    }
}


module.exports = verifyToken