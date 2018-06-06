const mongoose = require('mongoose');

// mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const bcrypt = require('bcrypt-nodejs');

let emailLengthChecker = (email) => {
    if (!email) {
        return false;
    } else {
        if (email.length < 5 || email.length > 35) {
            return false;
        } else {
            return true;
        }
    }
};

let validEmailChacker = (email) => {
    if (!email) {
        return false;
    } else {
        const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return regExp.test(email);
    }
};

const emailValidators = [
    {
        validator: emailLengthChecker, message: 'Email must be at least 5 characters but no more than 30'
    },
    {
        validator: validEmailChacker,
        message: 'Must be a valid e-mail'
    }
];

let usernameLengthChecker = (username) => {
    if (!username) {
        return false;
    } else {
        if (username.length < 3 || username.length > 15) {
            return false;
        } else {
            return true;
        }
    }
};

let validUsername = (username) => {
    if (!username) {
        return false;
    } else {
        const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
        return regExp.test(username);
    }
};

const usernameValidators = [
    {
        validator: usernameLengthChecker,
        message: 'Username must be at least 3 characters but no more than 15'
    },
    {
        validator: validUsername,
        message: 'Username must not have any special characters'
    }
];

let passwordLengthChecker = (password) => {
    if (!password) {
        return false;
    } else {
        if (password.length < 6 || password.length > 35) {
            return false;
        } else {
            return true;
        }
    }
};

let passwordValid = (password) => {
    if (!password) {
        return false;
    } else {
        const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
        return regExp.test(password);
    }
};

const passwordValidators = [
    {
        validator: passwordLengthChecker,
        message: 'Password must be at least 8 characters but no more then 35'
    },
    {
        validator: passwordValid,
        message: 'Must have at least one uppercase, lowercase, special character, and number'
    }
];


const userSchema = new Schema({
    username: { type: String, required: true, unique: true, lowercase: true, validate: usernameValidators},
    email: { type: String, required: true, unique: true, lowercase: true, validate: emailValidators},
    password: { type: String, required: true, validate: passwordValidators},
    sex: { type: String, required: true}
});

userSchema.pre('save', function (next) {
    if (!this.isModified('password'))
    return next();

    bcrypt.hash(this.password, null, null, (err, hash) => {
        if (err) return next(err);
        this.password = hash;
        next();
    });
});

userSchema.methods.comparePassword = (password) => {
    return bcrypt.compareSync(password, this.password);//return true or false if passwords is equal on db on client
};

module.exports = mongoose.model('User', userSchema);
