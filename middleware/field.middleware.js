/*
    This file's is where all the middleware functions that validate the user
    are written. it will me exported to user.middleware.js to be used as the 
    main middleware.

    - Code written by Haytham Rahem
*/

//Function that will validate if the user's email is in an acceptable format
const m_valid_email_param = ( req , res ) => {
    const email = req.body.email

    // Creation of the email regex that will handle the email format
    const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if(email_regex.test(email)) { 
        return true
    }else{
        return false
    }
}

//Function that will validate if the user's password is in the appropriate format
const m_valid_password = (req, res ) => {
    const password = req.body.password

    // Creation of the regEx that will handle the password format
    const pass_regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    
    if (!pass_regex.test(password)) {
        return false
    } 
    return true
}

//Function that will validate if the user's name is in an acceptable format
const m_validate_fullname = (req, the_field) => {
    const first_name = req.body.first_name
    const last_name = req.body.last_name
    var field = the_field

    // if statement that verifies if th
    if (first_name == "") {
        the_field = 'first name'
        return false
    }

    if (last_name == "") {
        the_field = 'last name'
        return false
    }

    // Creation of the RegEx that will handle the name format
    const regex_name = /[0-9!@#\$%\^\&*\)\(+=._]/g;
    const match = (first_name + last_name).search(regex_name)
    
    // if statement that verifies if any of the prohibited characters are found
    if(match < 0) { 
        return true
    }else{
        return false
    }
}



export { m_valid_email_param, m_validate_fullname, m_valid_password };