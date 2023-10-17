
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
export { f_make_date , f_make_http_code , f_hash_password , f_match_password , f_format_user , f_generate_empty_promise };