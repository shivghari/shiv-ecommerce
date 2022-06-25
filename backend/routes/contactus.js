const express = require('express')
const router = express.Router()


const bodyParser = require('body-parser')

const multer = require('multer');
const upload = multer({ dest: 'uploads' })
const mongoose = require('mongoose');

const User = require('../models/userData')
const Product = require('../models/product')
const Contact = require('../models/contactMail')
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/jwtVerificationMid');

require('dotenv').config();

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())


router.post('/userMessage',  upload.single('productImg'), (req,res)=>{
    const newMail = new Contact({
        userID : req.body.userID,
        username : req.body.username,
        email : req.body.email,
        subject : req.body.subject,
        message : req.body.message,
    })

    newMail.save().then((response)=>{
        res.status(200).json({ message : "message Saved Successfully" })
    }).catch((err)=>{
        res.status(300).json({ message : "Something went wrong in sending message" })
    })
})

router.get('/getAllmail', verifyToken, (req,res)=>{
    jwt.verify(req.token, 'secretkey', (err, result) => {
        Contact.find().then((response)=>{
            res.status(200).json({ response })
        }).catch((err)=>{
            res.status(300).json({ message : "something went Wriong in fetching mails." })
        })
    })
})

router.post('/getMail', verifyToken, (req,res)=>{
    jwt.verify(req.token, 'secretkey', (err, result) => {
        Contact.findOne({ _id : req.body.selectedConversationID }).then((response)=>{
            res.status(200).json({ response })
        }).catch((err)=>{
            res.status(300).json({ message : "SOmthing Wrnt Wroing" })
        })
    })
})

router.post('/replyByAdmin', verifyToken, (req,res)=>{
    jwt.verify(req.token, 'secretkey', (err, result) => {
        Contact.updateOne({ _id : req.body.selectedConversationID }, {$set : {
            replyByAdmin : req.body.ReplyMessage
        }}).then((response)=>{
            let transport = nodemailer.createTransport({
                host : 'smtp.gmail.com',
                port : 465,
                auth : {
                    user : process.env.EMAIL_USERNAME,
                    pass : process.env.EMAIL_PASSWORD 
                }
            })
            const mailOptions = {
                from: process.env.EMAIL_USERNAME, // Sender address
                to: req.body.email, // List of recipients
                subject: "Thank You For Contacting XYZ.", // Subject line
                text: `Hello, 
We Hope you have a good Experience Of Shopping,
${req.body.ReplyMessage}
Thank you, Regards.
                `,
            }; 
            transport.sendMail(mailOptions, function(err, info) {
                if (err) {
                  console.log(err)
                }
            });
            res.status(200).json({ message : "replied sent successfully" })
        }).catch((err)=>{
            console.log(err,'err')
            res.status(300).json({ message : "Something Went Wroing in replying the message..!" })
        })
    })
})
module.exports = router