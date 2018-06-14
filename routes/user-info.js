const User = require('../models/user');
const Info = require('../models/info');
const jwt = require('jsonwebtoken');



module.exports = (router) => {

    router.post('/add-more', (req, res) => {
        
        if (!req.body.about) {
            res.json({ success: false, message: 'About is required' });
        } else {
            if (!req.body.ocupation) {
                res.json({ success: false, message: 'Ocupation is required' });
            } else {
                if (!req.body.birthday) {
                    res.json({ success: false, message: 'Birthday is required' });
                } else {
                    if (!req.body.mobile) {
                        res.json({ success: false, message: 'Mobile is required' });
                    } else {
                        if (!req.body.location) {
                            res.json({ success: false, message: 'Location is required' });
                        } else {
                            // if (!req.body)
                        }
                    }
                }
            }
        }
        
    });


    return router;

}




