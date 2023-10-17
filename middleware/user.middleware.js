
/*
    This file's is the main middleware functions that validate the user.

    - Code written by Haytham Rahem
*/


import { m_valid_email_param, m_valid_password, m_validate_fullname } from "./field.middleware.js";



// Fonction that validates the user. it will regroup all the middlewares involved in the validation
const m_validate_user = ( req , res , next ) => {
    try{
        var valid = true
        var msg = ""
        var field = ""
        // if statement with middleware functions that process if the user data entered are valid
        if(!m_valid_email_param(req)) {
            valid = false
            var msg = "Email format is invalid"
            var field = "Email"
        }
        if(!m_valid_password(req)) {
            valid = false
            var msg = "Password format is invalid"
            var field = "Password"
        }
        if(!m_validate_fullname(req, field)) {
            valid = false
            var msg = "Name format is invalid"
            field = field
        }
        if(valid) {
            next();
        } else {
            res.status(422).json({ message : msg , type: 'Failed' , data : [field]})
        }
    }catch(err){
        console.log(err)
        res.status(500).json({ message : msg , type: "An error occured !" , data : []})
    }
}

export default m_validate_user;