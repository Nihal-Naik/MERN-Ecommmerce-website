import mongoose from "mongoose";

const productschema=mongoose.Schema({
    name:String,
    price:Number,
    Image:String
})

export const Product=mongoose.model("product",productschema)