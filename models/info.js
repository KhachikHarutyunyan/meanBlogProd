const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const infoSchema = new Schema({
    username: { type: String, required: true },
    about: { type: String, required: true },
    ocupation: { type: String, required: true },
    birthday: { type: String, required: true },
    mobile: { type: String, required: true },
    location: { type: String, required: true }
});


module.exports = mongoose.model('Info', infoSchema);

