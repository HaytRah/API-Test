
/*
    This file is the authentication service that will communicate
    with the database and send back the data to the controller

    - Code written by Haytham Rahem
*/


import userSchema from '../models/user.js';
import { f_format_user, f_match_password, f_hash_password } from '../utilities/utility.js';

// Service d'authentication pour le login
const s_login = async( promise , user ) => {
    try{
        // Trouver le user par email
        const msg = 'Invalid email or password !'
        const find_user = await userSchema.find({ email : user.email })
        if(find_user.length === 0){
            promise.message = msg
            return promise
        }
        //If user is found, compar prompted password with hashed password from database
        console.log('User found !')
        const match = await f_match_password( user.password , find_user[0].password)
        if(match){
            promise.type = 'Success'
            promise.message = 'Logged in !'
            const clean_user = f_format_user(find_user[0])
            promise.data = clean_user
            console.log('Password match ' , promise)
            return promise
            
        }else{
            console.log('Password not match !')
            promise.message = msg
        }
        return promise
    }catch(err){
        console.log("Error in s_login" , err)
        promise.message = 'Server error !'
        promise.type = 'Server error'
        return promise
    }
}

// Register service fonction received prompted data to begin user registration
const s_register = async ( promise , user ) => {
    // Try catch that tries the query and catch any possible error
    try {
        const msg = 'Email is already used !'
        const find_user = await userSchema.find({ email :user.email })
        // Verify that the email adresse provided isn't already in use
        if (find_user.length == 0) {
            const hash_password = await f_hash_password( user.password )
            const the_user = new userSchema({
                email: user.email,
                password: hash_password,
                first_name: user.first_name,
                last_name: user.last_name,
            })    
            const new_user = await the_user.save()
            promise.type = 'Success'
            promise.message = "User added !"
            promise.data = user               
        } else {
            promise.type = 'Failed'
            promise.message = msg            
        }
        return promise
    } catch (err) {
        console.log("Error in s_register" , err)
        promise.message = 'Server error !'
        promise.type = 'Server error'
        return promise       
    }
}   

export { s_login, s_register }