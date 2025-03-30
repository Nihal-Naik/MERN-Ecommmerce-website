import mongoose from "mongoose";

const cartschema=mongoose.Schema({
    name:String,
    price:Number,
    Image:String
})

export const Cart=mongoose.model("cart",cartschema)