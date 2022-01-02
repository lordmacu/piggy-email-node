var express = require('express');
var app = express();
require('dotenv').config();

const bodyParser = require('body-parser');
const cors = require('cors');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});



// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

app.post('/email', function (req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var subject = req.body.subject;

    if (!name) {
        res.send("Fala el nombre");
        return false;
    }

    if (!email) {
        res.send("Fala el email");
        return false;
    }

    if (!subject) {
        res.send("Fala el subject");
        return false;
    }

    var mailOptions = {
        from: 'apitestcris@gmail.com',
        to: email,
        subject: 'Formulario de contacto',
        html: 'Datos contacto: <br> <b>Nombre</b>: ' + name + '<br> <b>Email</b>: ' + email +' <br> <b>Subject</b>: '+subject
    };


    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    res.send("Email enviado!");
});

app.listen(3002);