// Dependencies
const express = require('express');
const app = express();
require('dotenv').config();
const session = require('express-session');

// Middleware 
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false
    })
);

// Routes / Controllers
app.get('/any', (req, res) => {
    req.session.anyProperty = 'any value';
    res.send('This is the route that sets the value of req.session.anyProperty');
});

app.get('/retrieve', (req, res) => {
    if (req.session.anyProperty === 'something you want it to') {
        //test to see if that value exists
        //do something if it's a match
        res.send('it matches! cool');
    } else {
        //do something else if it's not
        res.send('nope, not a match');
    }
});

app.get('/update', (req, res) => {
    req.session.anyProperty = 'something you want it to';
    res.send('This is the route that updates req.session.anyProperty');
});

app.get('/destroy', (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            res.send(error);
        } else {
            res.send({
                success: true
            });
        }
    });
});

// Listener
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is listening on port: ${PORT}`));
