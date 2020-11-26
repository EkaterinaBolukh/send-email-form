const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000
const nodemailer = require('nodemailer')
require('dotenv').config()

app.use(express.json())
app.use(cors())

let transporter = nodemailer.createTransport({
    host: "mailing.jointoit.com",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
        user: process.env.MAIL_LOGIN,
        pass: process.env.MAIL_PASSWORD
    }
})

app.post('/form', (req, res) => {
    console.log("hello from website")
    let body = req.body
    let fullname = body.fullname
    let email = body.email
    let text = body.text
    let regex_email = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    let mailOptions = {
        from: 'ekaterina.bolukh@jointoit.com',
        to: 'jointoitqa@gmail.com',
        subject: 'New request from Keratin',
        text: 'User: ' + fullname + '\nemail: ' + email + '\ntext: ' + text
    }


    if (fullname.length < 1) {
        res.status(422)
        res.send("fullname field is required")
    }
    else {
        if (email.length < 1) {
            res.status(422)
            res.send("email field is required")
        }
        else {
            if (!regex_email.test(email)) {
                res.status(422)
                res.send("email not valid")
            }
            else {
                if (text.length < 1) {
                    res.status(422)
                    res.send("message field is required")
                }
                else {
                    if (text.length < 10) {
                        res.status(422)
                        res.send("the message field should be at least 10 of characters")
                    }
                    else {
                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                console.log(error)
                                res.status(500)
                                res.send(error)
                            } else {
                                console.log('Email sent: ' + info.response)
                                res.status(200)
                                res.send("Message sent")
                            }
                        })

                    }
                }
            }
        }
    }
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})