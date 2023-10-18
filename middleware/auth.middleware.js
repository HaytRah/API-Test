
/*
    This file contains the authentication services that will communicate to the database
    for the controllers and send the response back tothem

    - Code written by Haytham Rahem
*/

import { m_valid_email_param, m_valid_password } from "./field.middleware.js";


// Fonction that validates the user. it will regroup all the middlewares involved in the validation
const m_authenticate_user = ( req , res , next ) => {
    try{
        var msg = ""
        var field = ""
        var valid = true
        const body = req.body
        console.log("Step 1")
        // if statement with middleware functions that process if the user data entered are valid
        while (valid) {
            field = "Email"
            if(!m_valid_email_param(body.email)) {
                msg = "Email format is invalid"
                break;
            }
            console.log("Step 2")
            field = "password"
            if(!m_valid_password(body.password)) {
                msg = "Password format is invalid. Must contain a number and a special character and be between 6 to 16 character"
                break;
            }
            valid = false
        }
        if(msg === '') {
            console.log("Step 3")
            next();
        } else {
            res.status(422).json({ message : msg , type: 'Failed' , data : [field]})
        }
    }catch(err){
        res.status(500).json({ message : msg , type: "An error occured !" , data : []})
    }
}

export default m_authenticate_user;