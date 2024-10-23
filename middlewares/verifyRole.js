const jwt = require('jsonwebtoken')

function verify(req,res,next){
    const role = req.headers.role

    if(!role) return res.status(401).json({code:'401', message:'No Role'})

    if(role){
        jwt.verify(role, process.env.SECRET_KEY, (err,role)=>{
            if(err) return res.status(401).json({error:'401', message:'Role invalid'})
            if(role.name !== "admin") return res.status(401).json({error:'401', message:'Unauthorize no role admin'})
            req.role = role
            next()
        })
    }else{
        return res.status(401).json({error:'401',message:'No Role'})
    }
    
}

module.exports = verify