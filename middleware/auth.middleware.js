
/*
    This file contains the authentication services that will communicate to the database
    for the controllers and send the response back tothem

    - Code written by Haytham Rahem
*/

import { m_valid_email_param, m_valid_password } from "./field.middleware.js";


// Fonction that validates the user. it will regroup all the middlewares involved in the validation
const m_authenticate_user = ( req , res , next ) => {
    try{
        // if statement with middleware functions that process if the user data entered are valid
        if(!m_valid_email_param(req, res)) {
            return
        }
        if(!m_valid_password(req, res)) {
            return
        }
        next();
    }catch(err){
        res.status(500).json({ message : msg , type: "An error occured !" , data : []})
    }
}

export default m_authenticate_user;