// middleware/users.js
const jwt = require('jsonwebtoken');

module.exports = {
    validateRegister: (req, res, next) => {
        // username min length 3
        if (req.body.username == undefined) {
            console.log('username is undefined');
            return res.status(400).send({
                msg: 'username is undefined'
            });
        }

        if (!req.body.username || req.body.username.length < 3) {
            console.log('Please enter a username with min. 3 chars');
            return res.status(400).send({
                msg: 'Please enter a username with min. 3 chars'
            });
        }

        // password min 6 chars
        if (!req.body.password || req.body.password.length < 6) {
            console.log('Please enter a username with min. 3 chars');
            return res.status(400).send({
                msg: 'Please enter a password with min. 6 chars'
            });
        }

        // password (repeat) does not match
        if (
            !req.body.password_repeat ||
            req.body.password != req.body.password_repeat
        ) {
            console.log('Both passwords must match');
            return res.status(400).send({
                msg: 'Both passwords must match'
            });
        }

        next();
    },

    isLoggedIn: (req, res, next) => {
        //res.sendFile(__dirname + '/public/story.html')
        try {
            if (typeof req.headers.authorization == "undefined") {
                next();
                return;
            }
            const token = JSON.parse(req.headers.authorization).token
            const decoded = jwt.verify(
              token,
              'SECRETKEY'
            );
            req.userData = decoded;
            next();
        } catch (err) {
            console.log(err);
            return res.status(401).send({
                msg: 'Your session is not valid! Please sign in first!',
            });
        }
    }
};