const express = require('express');
const app = express();
const {users, tasks} = require('./connection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const {inTheMiddleEmployee, inTheMiddleUser, inTheMiddleManager} = require('./authentication-config')
const {mail} = require('./nodemailer-config')
const { body, validationResult } = require('express-validator');
const validatePassword = require('./password-config')


app.use(express.json());

app.get('/home', inTheMiddleEmployee ,async (req, res) => {
       console.log('This is the req.user object '+ req.user)
       const user = await users.findOne({where: { email: req.user.email }});
       const tassk = await user.getTasks({attributes: ['id', 'task', 'description','Start', 'End', 'Status', 'Remarks']});
       res.send(tassk)
});

app.post('/register', body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
.matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
.matches(/[0-9]/).withMessage('Password must contain at least one number')
.matches(/[!@#$%^&*]/).withMessage('Password must contain at least one special character (!@#$%^&*)') , async (req, res) => {
    console.log(req)
    const errors = validationResult(req);
    console.log(errors)
    if (!errors.isEmpty()) {
      console.log('1')
      return res.status(422).json({ errors: errors });
    }
    const {name, email, password} = req.body;
    // const {hello} = req.body;
    console.log('3')
    console.log(req.body);
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

app.post('/assign', inTheMiddleManager, async (req, res) => {
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
    const employee = await users.findByPk(req.body.userId)
    const details = {
        manager: req.user.email,
        managerName: req.user.name,
        employee: employee.email,
        task: newTask.task,
        description: newTask.description, 
    }
    mail(details) 
    console.log(newTask)
    res.send('New task Created successfully')
})



// app.get('/send', (req,res)=> {
//     mail()
// })




app.listen(5253, () => console.log('listening on port 5253'));
// const start = new Date()
// console.log(start)