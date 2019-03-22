const DB = require('./models/index');
const bodyParser = require('body-parser');
const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const app = express();
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Creation of a user
app.post('/api/users', (req, res) => {
    console.log('received', res);
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(req.body.password, salt, function (err, hash) {
            DB.User.create({
                id: req.body.id,
                email: req.body.email,
                name: req.body.name,
                group_id: req.body.group_id,
                role: req.body.role,
                password: hash,
            }).then(dataRow => {
                //do something with data just inserted into the table 
                console.log(dataRow.id);
                console.log(dataRow.email);
                console.log(dataRow.name);
                console.log(dataRow.group_id);
                console.log('success');
                res.send({
                    id: dataRow.id,
                    email: dataRow.email,
                    name: dataRow.name,
                    group_id: dataRow.group_id,
                })
            }).catch((err) => {
                res.send(err.message);
                console.log(err.message);
            })
        });
    });
});

// Login of a user

app.post('/api/login', (req, res) => {
    console.log('received', res);

    DB.User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then((data) => {
            bcrypt.compare(req.body.password, data.password, (error, result) => {
                console.log(result);
                result ? res.send('valid') : res.send('invalid');
            });
        })
        .catch((err) => {
            res.send(err.message);
            console.log(err.message)
        });
});

// Getting user's details.

app.get('/api/users', (req, res) => {
    console.log('received', res);
    DB.User.findAll()
        .then((data) => {
            let myRes = [];
            data.forEach(element => {
                myRes.push({
                    id: element.id,
                    email: element.email,
                    name: element.name,
                    group_id: element.group_id,
                });
            });
            res.send(myRes);
        })
        .catch((err) => {
            res.send(err.message);
            console.log(err.message)
        })
});


app.listen(3000);
console.log('App listenting on port 3000');