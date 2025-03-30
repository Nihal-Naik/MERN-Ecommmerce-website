import mongoose from 'mongoose'


const adminschema=mongoose.Schema({
    name:String,
    password:String
})
export const Admin=mongoose.model("admin",adminschema)