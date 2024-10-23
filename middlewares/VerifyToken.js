const jwt = require('jsonwebtoken')

function verify(req,res,next){
    const accessToken = req.headers.authorization
    if(!accessToken) return res.status(401).json({code:'401', message:'Unauthorized'})

    const token = accessToken.split(' ')[1];
    // console.log(token)
    if(token){
        jwt.verify(token, process.env.SECRET_KEY, (err,user)=>{
            if(err) return res.status(401).json({error:'401', message:'Token invalid'})
            req.user = user
            next()
        })
    }else{
        return res.status(401).json({error:'401',message:'Unauthorized'})
    }
    
}

module.exports = verify