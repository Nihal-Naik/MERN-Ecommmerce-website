import React, { useState,useEffect } from 'react'
import Navbar from '../components/navbar'
import { NavLink, useLoaderData } from 'react-router-dom'
import '../page_css/home.css'



const home = () => {

  const [Productlist, setProductlist] = useState([])
  const products=useLoaderData() || { data: [] }
  // console.log(products);
  useEffect(() => {
    setProductlist(products.data)
  }, [products])
  
  const addtocart=async(item)=>{
    const cart_send=await fetch("http://localhost:3000/getcart",{
      method:"POST",
      headers:{ "content-type": "application/json" },
      body:JSON.stringify(item)
      }
    )
    // console.log(cart_send);
    
  }
  
  return (
    <div>
      <Navbar />
      <div className="display_products">
        {Productlist.map((item)=>(
          <NavLink to={`/product/${item.name}`} state={{product:item}} key={item._id} className="Linkproducts">
            <div className="display_box" key={item._id}>
              <img src={item.Image} alt="" />
              <p> {item.name} </p>
              <p> {item.price} </p>
              <button onClick={() => addtocart(item)}>Add to Cart</button>
            </div>
          </NavLink>
          
        ))}
        
        
      </div>
    </div>
  )
}

export default home
