const mongoose = require ('mongoose');
const userSchema = mongoose.Schema({
    username:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    avatar:{
        type:String
    },
    phone:{
        type:Number
    },
    address:{
        type:String
    },
    role:{
        type:String,
        enum:['admin','client','livreur']
    },
    isactive:{
        type:Boolean,
        default:false
    }
},{timestamps:true})
module.exports = new mongoose.model('user',userSchema)