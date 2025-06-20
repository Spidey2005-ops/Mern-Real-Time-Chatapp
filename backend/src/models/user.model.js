import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        requires:true,
        unique:true
    },
    fullName:{
        type:String,
        requires:true
    },
    password:{
        type:String,
        requires:true,
        minlength:6,
    },
    profilePic:{
        type:String,
        default:"",
    },
    },
    {
        timestamps:true
    }
);

const User=mongoose.model("User",userSchema);
export default User