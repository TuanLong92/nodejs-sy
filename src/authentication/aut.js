export default function checktoken(req, res, next) {
    //by pass login and register
    if(req.url == '/api/login' || req.url == '/api/register'){
        next()
        return
    }
    debugger
    //get and validate token
    const token = req.headers['x-access-token']
    if(!token){
        return res.status(401).json({
            status: false,
            message: 'No token provided'
        })
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err){
            return res.status(401).json({
                status: false,
                message: 'Invalid token'
            })
        }
        req.decoded = decoded
        next()
    })
}