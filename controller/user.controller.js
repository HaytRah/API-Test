
/*
    This file contains the user's controller that communicate to the user's services

    - Code written by Haytham Rahem
*/

import { s_get_users, s_get_user } from '../services/user.service.js';
import { f_generate_empty_promise } from "../utilities/utility.js"

// Get all users of controller that will receive from the serice all the users in the database
const c_get_users = async (req, res) => {
    try {
        const empty_promise = f_generate_empty_promise();
        const users = req.body
        await s_get_users(empty_promise, users)
        var status_code = 409
        if(empty_promise.type === 'Success'){
            status_code = 200
        }else {
            status_code = 404
        }
        return res.status( status_code ).json(empty_promise)
    } catch (err) {
        if (res.status(500)) {
            console.log(err)
            res.json({ message: "Erreur avec le serveur"})
        }
    }
}

// Get sepcific user controller, will receive the database reponses from the service
const c_get_user = async (req, res) => {
    try {
        const empty_promise = f_generate_empty_promise();
        const user = req.body
        await s_get_user(empty_promise, user)
        var status_code = 409
        if (empty_promise.type === 'Success') {
            status_code = 200
        } else {
            status_code = 404
        }
        return res.status( status_code ).json(empty_promise)
    } catch (err) {
        console.log('Error in c_register' , err)
        return res.status(500).json({ message : err , type : 'Server error' , data : []})
    }
}

export { c_get_users, c_get_user };