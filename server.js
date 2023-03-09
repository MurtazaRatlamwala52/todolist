const express = require('express');
const app = express();
const {users, tasks} = require('./connection');

app.use(express.json());

app.get('/home', async (req, res) => {

});

app.post('/register', async (req, res) => {
    const {name, email, password} = req.body;
    const user = await users.create({
        name,
        email,
        password
    })
    res.send("You have been successfully Registered");
})



app.listen(5253, () => console.log('listening on port 5253'));