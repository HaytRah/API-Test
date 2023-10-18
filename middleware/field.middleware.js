/*
    This file's is where all the middleware functions that validate the user
    are written. it will me exported to user.middleware.js to be used as the 
    main middleware.

    - Code written by Haytham Rahem
*/

//Function that will validate if the user's email is in an acceptable format
const m_valid_email_param = ( value ) => {
    // Creation of the email regex that will handle the email format
    const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if(email_regex.test(value)) { 
        return true
    }else{
        return false
    }
}

//Function that will validate if the user's password is in the appropriate format
const m_valid_password = (value ) => {
    // Creation of the regEx that will handle the password format
    const pass_regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    
    if (!pass_regex.test(value)) {
        return false
    } 
    return true
}
const m_validate_empty = ( value ) => {
    if (value == "")  return false
    return true
}
//Function that will validate if the user's name is in an acceptable format
const m_validate_name = (value) => {
    // Creation of the RegEx that will handle the name format
    const regex_name = /[0-9!@#?><[\$%\^\&*\)\(+=._]/g;
    const match = (value).search(regex_name)
    // if statement that verifies if any of the prohibited characters are found
    if(match < 0) { 
        return true
    }else{
        return false
    }
}



export { m_valid_email_param, m_validate_name, m_validate_empty , m_valid_password };