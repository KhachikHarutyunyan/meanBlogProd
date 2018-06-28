const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
// const passport = require('passport');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const config = require('./config/database');
const authentication = require('./routes/authentication')(router);
const blogs = require('./routes/blog')(router);
const userInfo = require('./routes/user-info')(router);

const Blog = require('./models/blog');
const User = require('./models/user');

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
app.use(cors({  origin: 'http://localhost:4200' }));

app.use(express.static(__dirname + '/client/dist/client/'));

app.use('/authentication', authentication);

app.use('/blogs', blogs);

app.use('/user-info', userInfo);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/dist/client/index.html'));
});

io.on('connection', (socket) => {
    // console.log('connected user');
    socket.on('post-comment', (comment) => {
        let newComment = {
            comment: comment.comment,
            author: comment.username,
            date: new Date()
        };
        io.emit('post-comment', newComment);
    });
    
});

http.listen(port, () => {
    console.log('listen port N ' + port);
});
