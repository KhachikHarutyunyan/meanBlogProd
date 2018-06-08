const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

module.exports = (router) => {

    // Registration
    router.post('/register', (req, res) => {
        
        if (!req.body.email) {
            res.json({ success: false, message: 'You must provide an e-mail' });
        } else {
            if (!req.body.username) {
                res.json({ success: false, message: 'You must provide a username' });
            } else {
                if (!req.body.password) {
                    res.json({ success: false, message: 'You must provide a password' });
                } else {
                    if (!req.body.sex) {
                        res.json({ success: false, message: 'You must provide your sex' });
                    } else {
                        let user = new User({
                            username: req.body.username.toLowerCase(),
                            email: req.body.email.toLowerCase(),                            
                            password: req.body.password,
                            sex: req.body.sex,
                        });
                        user.save((err) => {
                            if (err) {
                                if (err.code === 11000) {
                                    res.json({ success: false, message: 'Username or e-mail already exists' });
                                } else {
                                    if (err.errors) {
                                        if (err.errors.email) {
                                            res.json({ success: false, message: err.errors.email.message });
                                        } else {
                                            if (err.errors.username) {
                                                res.json({ success: false, message: err.errors.username.message });
                                            } else {
                                                if (err.errors.password) {
                                                    res.json({ success: false, message: err.errors.password.message });
                                                } else {
                                                    res.json({ success: false, message: err });
                                                }
                                            }
                                        }
                                    } else {
                                        res.json({ success: false, message: 'Could not save user. Error: ', err });
                                    }
                                    
                                }
                                
                            } else {
                                res.json({ success: true, message: 'Account registered!' });
                            }
                        });


                        // res.send(req.body);
                    }
                    
                }
                
            }
            
        }

        
    });

    //Check Email

    router.get('/checkEmail/:email', (req, res) => {
        if (!req.params.email) {
            res.json({ success: false, message: 'E-mail was not provided' });
        } else {
            User.findOne({ email: req.params.email }, (err, user) => {
                if (err) {
                    res.json({ success: false, message: err });
                } else {
                    if (user) {
                        res.json({ success: false, message: 'E-mail is already taken' });
                    } else {
                        res.json({ success: true, message: 'E-mail is available' });
                    }
                }
            });
        }
    });

    // Check Username

    router.get('/checkUsername/:username', (req, res) => {
        if (!req.params.username) {
            res.json({ success: false, message: 'Username was not provided' });
        } else {
            User.findOne({ username: req.params.username }, (err, user) => {
                if (err) {
                    res.json({ success: false, message: err });
                } else {
                    if (user) {
                        res.json({ success: false, message: 'Username is already taken' });
                    } else {
                        res.json({ success: true, message: 'Username is available' });
                    }
                }
            });
        }
    });

    // Login
    router.post('/login', (req, res) => {
        if (!req.body.username) {
            res.json({ success: false, message: 'No username was provided' });
        } else {
            if (!req.body.password) {
                res.json({ success: false, message: 'No password was provided' });
            } else {
                User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
                    if (err) {
                        res.json({ success: false, message: err });
                    } else {
                        if (!user) {
                            res.json({ success: false, message: 'Username not found' });
                        } else {
                            const validPassword = user.comparePassword(req.body.password);
                            if (!validPassword) {
                                res.json({ success: false, message: 'Password invalid' });
                            } else {
                                const token = jwt.sign({
                                    userId: user._id
                                }, config.secret, { expiresIn: '24h' });

                                res.json({ 
                                    success: true,
                                    message: 'Success',
                                    token: token,
                                    user: { username: user.username }
                                });
                            }
                        }
                    }
                });
            }
        }
    });

    router.use((req, res, next) => {
       const token = req.headers['authorization'];
       if (!token) {
           res.json({ success: false, message: 'No token provided' });
       } else {
           jwt.verify(token, config.secret, (err, decoded) => {
               if (err) {
                   res.json({ success: false, message: 'Token invalid: ' + err });
               } else {
                   req.decoded = decoded;
                   next();
               }
           });
       }
    });

    router.get('/profile', (req, res) => {
        User.findOne({ _id: req.decoded.userId }).select('username email sex').exec((err, user) => {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                if (!user) {
                    res.json({ success: false, message: 'User not found' });
                } else {
                    res.json({ success: true, user: user });
                }
            }
        });
    });

    return router;
};