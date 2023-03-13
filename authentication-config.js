const {users, tasks} = require('./connection')
const jwt = require('jsonwebtoken')


module.exports.inTheMiddleEmployee = async  (req,res,next) => {
    const token = req.headers['authorization']
    if(!token) return res.status(403).send('User not authenticated')
    const exist = await users.findOne({where: {token: token}})
    console.log(exist)
    if(!exist){
    const decoded =  jwt.verify(token, process.env.secret) 
    req.user = decoded
    console.log(decoded.role)
        if(decoded.role == 'Employee'){
            next()
        }else{
            return res.status(403).send('You are not Authorized')
        }
    }else{
        res.status(403).send('You are not Authorized since you have logged out')
    }
}

module.exports.inTheMiddleUser = async (req, res, next) =>{
    const token = req.headers['authorization']
    if(!token) return res.status(403).send('User not authenticated')
    const exist = await users.findOne({where: {token: token}})
    console.log(exist)
    if(!exist){
    const decoded =  jwt.verify(token, process.env.secret) 
    req.user = decoded
    console.log(decoded.role)
        if(decoded){
            next()
        }else{
            return res.status(403).send('You are not Authorized')
        }
    }else{
        res.status(401).send('You are not Authorized since you have logged out')
    }
}

module.exports.inTheMiddleManager = async  (req,res,next) => {
    const token = req.headers['authorization']
    if(!token) return res.status(403).send('User not authenticated')
    const exist = await users.findOne({where: {token: token}})
    console.log(exist)
    if(!exist){
    const decoded =  jwt.verify(token, process.env.secret) 
    req.user = decoded
    console.log(decoded.role)
        if(decoded.role == 'Manager'){
            next()
        }else{
            return res.status(403).send('You are not Authorized')
        }
    }else{
        res.status(403).send('You are not Authorized since you have logged out')
    }
}
