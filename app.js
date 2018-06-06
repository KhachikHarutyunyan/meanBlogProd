const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const app = express();
const path = require('path');
const config = require('./config/database');
const authentication = require('./routes/authentication')(router);

const port = 8000;

mongoose.connect(config.uri, (err) => {
    if (err) {
        console.log('Could Not Connect to database: ', err);
    } else {
        console.log('Connected to DB: ' + config.db);
    }
});

// Middleware

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(__dirname + '/client/dist/client/'));

app.use('/authentication', authentication);


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/dist/client/index.html'));
});

app.listen(port, () => {
    console.log('listen port N ' + port);
});
