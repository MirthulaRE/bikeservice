const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    role: { type: String, enum: ['admin', 'user'], default: 'user' } 
});

const User = mongoose.model('log_reg_forms', userSchema);

module.exports = User;

