import mongoose from "mongoose";



const blackListSchema = new mongoose.Schema({
    token :{
        type : String,
        required : [true,"token is required for blacklisting"]
    }

},{
    timestamps : true
})

const blackListModel = new mongoose.model("blacklist",blackListSchema);

export default blackListModel;