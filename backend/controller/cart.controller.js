import { Cart } from '../db/cart_model.js'

export const getcart=async(req,res)=>{
    const cart_items=req.body
    const req_items=new Cart(cart_items)
    try {
        await req_items.save()
        res.status(200).json({success:true,data:req_items}) 
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:"Problem in send the data"})
    }
}

export const displaycart=async(req,res)=>{
    try {
        const product_list=await Cart.find({})
        res.status(200).json({success:true,data:product_list})
    } catch (error) {
        res.status(500).json({success:false})
        
    }
}


export const cartdeleteone=async(req,res)=>{
    let id_item=req.body._id
    try {
        const find_id=await Cart.findById({_id:id_item})
        if(!find_id){
            res.status(500).json({success:false,messgae:"Item not found"})
        }
        await Cart.findByIdAndDelete({_id:id_item})
        res.status(200).json({success:true,message:"Item deleted successfully."})
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:"Error in deleting item"})
    }
}