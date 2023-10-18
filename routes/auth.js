
/*
    This file contains all the routes used in the API

    - Code written by Haytham Rahem
*/

import express from 'express';
import { c_login , c_register } from '../controller/auth.controller.js';
import m_validate_user from '../middleware/user.middleware.js';
import m_authenticate_user from '../middleware/auth.middleware.js';
import {c_get_users, c_get_user} from '../controller/user.controller.js';

const auth_router = express.Router()

// Verify connection route
auth_router.get('/', (req, res) => {
    res.status(200).json({ message : 'hello auth'})
})

// Routes
auth_router.get('/login', m_authenticate_user, c_login )
auth_router.post('/register', m_validate_user, c_register)
auth_router.get('/users', c_get_users)
auth_router.post('/user', c_get_user)


export default auth_router;