import express from 'express'
import mongoose from 'mongoose'
import { Product } from './db/model.js'
import jwt from "jsonwebtoken";
import cors from 'cors'
import { display_products } from './controller/product.controller.js'
import { displaycart, getcart, cartdeleteone } from './controller/cart.controller.js'
import { admin_delete_one, adminlogin, dashboard, insert_product, update_product_admin } from './controller/admin.controller.js'
import dotenv from 'dotenv'

dotenv.config()


async function Connectdb() {
    try {
        await mongoose.connect(process.env.DB_CON)
        console.log("Connection to db successful");
    } catch (error) {
        console.log("Connection to db failed",error);
        
    }
}

//middleware to check admin
const authMiddleware = (req, res, next) => {
    const token = req.header('x-auth-token');
    // console.log(token);
    
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });
  
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.admin = decoded;
      next();
    } catch (err) {
        // console.log(err);
        
      res.status(401).json({ msg: 'Invalid token' });
    }
  };


const app = express()
const port = 3000

app.use(express.json())
app.use(cors())


app.get('/display_products', display_products)



//admin
app.post('/adminlogin',adminlogin)
app.get('/dashboard', authMiddleware, dashboard)
app.post('/insert_product',authMiddleware,insert_product)
app.delete('/delete_one',authMiddleware,admin_delete_one)
app.put('/update',authMiddleware,update_product_admin)

//cart
app.post('/getcart',getcart)
app.get('/displaycart',displaycart)
app.delete('/cart_delete_one',cartdeleteone)


app.listen(port, async() => {
    await Connectdb()
  console.log(`Example app listening on port ${port}`)
})