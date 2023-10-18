
/*
    This file's is the main middleware functions that validate the user.

    - Code written by Haytham Rahem
*/


import { m_valid_email_param, m_valid_password, m_validate_empty, m_validate_name } from "./field.middleware.js";



// Fonction that validates the user. it will regroup all the middlewares involved in the validation
const m_validate_user = ( req , res , next ) => {
    try{
        var valid = true
        var field_valid = true
        var msg = ""
        var field = ""
        const body = req.body
        console.log(body)
        // While loop with middleware functions that process if the user data entered are valid
        while(valid){
            field = 'email'
            if(!m_valid_email_param(body[field])) {
                msg = "Email format is invalid"
                break;
            }
            field = 'password'
            if(!m_valid_password(body[field])) {
                msg = "Password format is invalid. Must contain a number and a special character and be between 6 to 16 character"
                break;
            }
            field = 'first_name'
            field_valid = m_validate_empty(body[field])
            if(!field_valid){
                msg = 'First name needs to have a value !'
                break;
            }
            if(!m_validate_name(body[field])){
                msg = "First name format is invalid"
                break;
            }
            field = 'last_name'
            field_valid = m_validate_empty(body[field])
            if(!field_valid){
                msg = 'Last name needs to have a value !'
                break;
            }
            if(!m_validate_name(body[field])){
                msg = "Last name format is invalid"
                break;
            }
            valid = false;
        }
        if(msg === '') {
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