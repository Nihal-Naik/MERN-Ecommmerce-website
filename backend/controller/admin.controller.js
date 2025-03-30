import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import { Admin } from '../db/admin.js'
import { Product } from "../db/model.js";

dotenv.config()
export const adminlogin= async(req,res)=>{
    const login_data=req.body

    try {
        const admin = await Admin.findOne({name:login_data.name})
        // console.log("Admin",admin);
        
        if (!admin) { return res.status(400).json({ msg: "Invalid credentials" }) }

        
        
        if (login_data.password!==admin.password) {
            return res.status(400).json({ error: "Incorrect password" });
        }

        const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.json({ token })
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ error: "Server error" });
    }

}

export const dashboard=async(req,res)=>{
    try {
        const product_list=await Product.find({})
        res.status(200).json({success:true,data:product_list})
    } catch (error) {
        res.status(500).json({success:false})
        
      }
}

export const insert_product=async(req,res)=>{
    const item=req.body
    // console.log(item);
    
    const item_info=new Product(item)
    try {
        await item_info.save()
        res.status(200).json({success:true,message:"Data sent successully"}) 
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:"Problem in send the data"})
    }
}

export const admin_delete_one=async(req,res)=>{
    let id_item=req.body._id
    // console.log(id_item);
    
    try {
        const find_id=await Product.findById({_id:id_item})
        if(!find_id){
            res.status(500).json({success:false,messgae:"Item not found"})
        }
        await Product.findByIdAndDelete({_id:id_item})
        res.status(200).json({success:true,message:"Item deleted successfully."})
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:"Error in deleting item"})
    }
}

export const update_product_admin=async(req,res)=>{
    const item_id=req.body
    try {
        const find_item=await Product.findById({_id:item_id._id})
        // console.log(find_item);
        
        if(!find_item){
            res.status(404).json({success:false,message:"Item does not exist"})
        }
        await Product.findByIdAndUpdate(item_id._id,{name:item_id.name,price:item_id.price,Image:item_id.image})
        res.status(200).json({success:true,message:"Got the item"})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:"Didn't got the item"})
    }
}