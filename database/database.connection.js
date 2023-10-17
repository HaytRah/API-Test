
/*
    This file contains the function that connects the API to the database

    - Code written by Haytham Rahem
*/

import mongoose from 'mongoose';


const f_connect = () => {
    mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
    const db = mongoose.connection
    db.on('error', (error) => console.error(error))
    db.on('open', () => console.log("Connected to database"))
}


export { f_connect }