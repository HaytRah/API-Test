

/*
    This file contains the user's services that will communicate to the database
    for the controllers and send the response back tothem

    - Code written by Haytham Rahem
*/

import userSchema from '../models/user.js';
import { f_format_user } from '../utilities/utility.js';

// service that will find all users
const s_get_users = async(promise, users) => {
    try {
        const users = await userSchema.find()
        const clean_arr = []

        if (users.length > 0) {
            for(var i = 0; i < users.length; i++) {
                users[i].password = null
                clean_arr.push(users[i])
            }
            promise.type = 'Success'
            promise.data = clean_arr
        } else {
            promise.type = 'Failed'
            promise.message = 'No user found'
        }

    } catch (err) {
        if (res.status(500)) {
            res.json({ message: "Erreur avec le serveur"})
        }
    }
}

// get user service that will compare the emails and find the user on the database
const s_get_user = async(promise, user) => {
    try {
        const find_user = await userSchema.find({ email : user.email})
        if(find_user.length !== 0){
            const clean_user = f_format_user(find_user[0])
            promise.type = 'Success'
            promise.data = clean_user
        }else{
            promise.type = 'Failed'
            promise.message = "Oh uh... User not found"
        }
        
    } catch (err) {
        console.log('Error in user get by id' , err)
        if (res.status(500)) {
            res.json({ message: "Erreur avec le serveur"})
        }
    }
}

export {s_get_users, s_get_user}