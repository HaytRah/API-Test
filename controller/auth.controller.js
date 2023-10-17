
/*
    This file contains the authentication services that will communicate to the database
    for the controllers and send the response back tothem

    - Code written by Haytham Rahem
*/

import { s_login, s_register } from "../services/auth.service.js"
import { f_generate_empty_promise } from "../utilities/utility.js"

// login controller that will communicate with the login service
const c_login = async( req , res , next ) => {
    try{   
        const empty_promise = f_generate_empty_promise();
        const user = req.body
        var status_code = 409
        const login_res = await s_login( empty_promise , user )
        if(login_res.type === 'Success'){
            status_code = 200
        }
        return res.status( status_code ).json(login_res)
    }catch(err){
        console.log('Error in c_login' , err)
        return res.status(500).json({ message : err , type : 'Server error' , data : []})
    }
}

// Register controller that will communicate with the service
const c_register = async( req , res , next ) => {
    try {
        const empty_promise = f_generate_empty_promise();
        const user = req.body
        const register_res = await s_register(empty_promise, user)
        var status_code = 409
        if (register_res.type === 'Success') {
            status_code = 201
        }
        return res.status( status_code ).json(empty_promise)
    } catch (err) {
        console.log('Error in c_register' , err)
        return res.status(500).json({ message : err , type : 'Server error' , data : []})
    }
}

export { c_login , c_register }