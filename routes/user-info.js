const User = require('../models/user');
const Info = require('../models/info');
const jwt = require('jsonwebtoken');



module.exports = (router) => {

    router.post('/addInfo', (req, res) => {

        if (!req.body.username) {
            res.json({ success: false, message: 'No username was provided' })
        } else {
            if (!req.body.about) {
                res.json({ success: false, message: 'About user not provided' });
            } else {
                if (!req.body.ocupation) {
                    res.json({ success: false, message: 'Ocupation not provided' });
                } else {
                    if (!req.body.birthday) {
                        res.json({ success: false, message: 'Birthday not provided' });
                    } else {
                        if (!req.body.mobile) {
                            res.json({ success: false, message: 'Mobile not provided' });
                        } else {
                            if (!req.body.location) {
                                res.json({ success: false, message: 'Location not provided' });
                            } else {
                                let userInfo = new Info({
                                    username: req.body.username,
                                    about: req.body.about,
                                    ocupation: req.body.ocupation,
                                    birthday: req.body.birthday,
                                    mobile: req.body.mobile,
                                    location: req.body.location
                                });
                                userInfo.save((err) => {
                                    if (err) {
                                        res.json({ success: false, message: 'Something went wrong' });
                                    } else {
                                        res.json({ success: true, message: 'User Information saved' });
                                    }
                                });
                            }
                        }
                    }
                }
            }
        } 
    });

    router.get('/getUserInfo/:username', (req, res) => {
        if (!req.params.username) {
            res.json({ success: false, message: 'No username was provided' });
        } else {
            Info.findOne({ username: req.params.username }, (err, userInfo) => {
                if (err) {
                    res.json({ success: false, message: 'Something went wrong' });
                } else {
                    res.json({ success: true, userInfo: userInfo });
                }
            });
        }
    });

    router.put('/changeInfo/');


    return router;

}




