import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
    username :{
        type:String,
        unique : [true,"user name already taken"],
        required: true,
        trim: true
    },
    email :{
        type : String,
        unique : [true,"Account already exists with this email address"],
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        required : true,
    },
    password :{
        type:String,
        required : true
    }
})


const userModel = mongoose.model("user",userSchema);

export default userModel