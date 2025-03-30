import { Product } from '../db/model.js'

export const display_products=async(req, res) => {
  try {
    const product_list=await Product.find({})
    res.status(200).json({success:true,data:product_list})
} catch (error) {
    res.status(500).json({success:false})
    
  }
  
}

