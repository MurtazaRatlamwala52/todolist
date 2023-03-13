const nodemailer = require('nodemailer')
const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')
const {users} = require('./connection')
const Mail = require('nodemailer/lib/mailer')
dotenv.config()


module.exports.mail = (details) =>{
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.email,
      pass: process.env.pass
    }
  });

let message = {
    from: details.manager,
    to: details.employee,
    subject: `New Task assigned to you by ${details.managerName}`,
    text: "Hello Employee",
    html: `<h1>${details.task}</h1>
            <p>${details.description}</p>`
}

transporter.sendMail(message, (err,data) => {
    if(err) {
        console.error("Nodemailer error   " +err);
    }else{
        console.log("Email sent successfully  ");
    }
})
}