import React from 'react'
import { useLocation,useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../page_css/product_details.css'

const product_details = () => {

    const location=useLocation()
    const navigate=useNavigate()
    const product=location.state?.product

    if(!product){
        navigate('/')
        return null
    }
    const addtocart=async(item)=>{
        const cart_send=await fetch("http://localhost:3000/getcart",{
          method:"POST",
          headers:{ "content-type": "application/json" },
          body:JSON.stringify(item)
          }
        )
    }
  return (
    <div>
        <Navbar />
      <div className="product-details">
        <img src={product.Image} alt={product.name} />
        <h1>{product.name}</h1>
        <p>Price : {product.price}</p>
        <button onClick={()=>addtocart(product)}>Add to Cart</button>
      </div>
    </div>
  )
}

export default product_details
