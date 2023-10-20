
import Jwt  from 'jsonwebtoken';

/*
    This file contains all the utility/useful functions that can be used 
    anywhere on the code

    - Code written by Haytham Rahem
*/

import bcrypt from 'bcrypt'


const f_make_date = () => {

}

const f_make_http_code = () => {

}

//Function that generates an empty promise to clear the old one
const f_generate_empty_promise = () => {
    const default_promise = { message : '' , data : [] , type : 'Failed'}
    return default_promise
}

// Function that hash a password 
const f_hash_password = async( password ) => {
    const hash = await bcrypt.hash( password , 10);
    return hash
}

// Function that will compare the user prompted password to the hashed one from the database
const f_match_password = async( password , hashed_password) => {
    const match = await bcrypt.compare( password , hashed_password )
    return match
}

// Function that will format the user into an appropriate format
const f_format_user = ( user ) => {
    const default_user = {
        _id : user._id,
        first_name : user.first_name,
        last_name : user.last_name,
        email : user.email,
        password : null,
        timestamp : user.timestamp
    }
    return default_user
}

//Function that creates a JWT Token to be used in the auth.service
const f_create_token = (clean_user, secret) => {
    const user = clean_user.email
    const token = Jwt.sign(user, secret)
    return {token : token}
}

//Function that will authenticate the newly created token
const f_authenticate_token = (TOKEN, res) => {
    const token = TOKEN
    if (token == null) return res.sendStatus(401)
    
    //Built in Jwt function that veryfies if the Token was built using ACCESS_TOKEN_SECRET
    Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err) => {
        if (err) {
            return false
        } 
    })
    return true
}

export { f_make_date , f_make_http_code , f_hash_password , f_match_password , f_format_user , f_generate_empty_promise, f_create_token, f_authenticate_token };