const express = require('express');
const app = express();
const {users, tasks} = require('./connection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')


app.use(express.json());

app.get('/home', inTheMiddleEmployee ,async (req, res) => {
       console.log('This is the req.user object '+ req.user)
       const user = await users.findOne({where: { email: req.user.email }});
       const tassk = await user.getTasks({attributes: ['id', 'task', 'description','Start', 'End', 'Status', 'Remarks']});
       res.send(tassk)
});

app.post('/register', async (req, res) => {
    const {name, email, password} = req.body;
    const user = await users.create({
        name,
        email,
        password,
    })
    res.send("You have been successfully Registered");
})

app.post('/login', async(req,res) => {
    try{
        const {email , password} = req.body;
    const user = await users.findOne({where: {email: email} })
    // console.log(user.email)
    if(user){
       const accepted = await bcrypt.compare(password, user.password)
       if(accepted){
        const payload = {name: user.name, email: user.email, role: user.role}
        const token = jwt.sign(payload, process.env.secret, {expiresIn: '30m'})
        res.send(token)
       }else{
       return res.status(400).send('Incorrect password')
       }
    }else{
        return res.status(403).send('User not found')
    }
    }catch(e){
        console.log(e)
        res.send('An Unexpected error occurred' +e)
    }
})

app.post('/logout', inTheMiddleUser, async (req,res) => {
    const email = req.user.email
    console.log(email)
    const token = req.headers['authorization']
    const stored = await users.update({
        token: token}
        ,{where: 
            {email: email}})
            res.send("You have been successfully Logged out")
}) 

app.post('/assign', async (req, res) => {
    const {task, description} = req.body;
    const Start = new Date();
    console.log(req.body.end)
    const End = new Date(Start.getTime() + (req.body.end * 24 * 60 * 60 * 1000));
    // console.log(start, end)
    const newTask = await tasks.create({
        task,
        description,
        Start,
        End,
        userId : req.body.userId,
    }) 
    console.log(newTask)
    res.send('New task Created successfully')
})

async function inTheMiddleEmployee(req,res,next){
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

async function inTheMiddleUser(req,res,next){
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


app.listen(5253, () => console.log('listening on port 5253'));
// const start = new Date()
// console.log(start)