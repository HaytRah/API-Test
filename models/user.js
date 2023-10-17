/*
    this files contain the User model using the imported function Schema of mongoose

    - Code written by Haytham Rahem
*/

import mongoose from 'mongoose';

// UserSchema that will be used
const userSchema = new mongoose.Schema({
    email: { type: String, require: true },
    password: { type: String, require: true },
    first_name: { type: String, require: true },
    last_name: { type: String, require: true },
    timestamp: { type: Number, require: true, default: Math.floor(Date.now() / 1000) }
})

export default mongoose.model('User', userSchema);