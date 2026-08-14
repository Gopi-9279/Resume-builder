import dotenv from'dotenv';
dotenv.config();


import app from './src/app.js';
import connectToDB from './src/config/db.js';
connectToDB()

const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`server is listing to port ${port}`)
})