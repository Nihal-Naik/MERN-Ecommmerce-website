import React, { useContext, useRef } from 'react'
import Navbar from '../components/navbar'
import '../page_css/cart.css'
import { useLoaderData } from 'react-router-dom'
import { useState,useEffect } from 'react'
import Side_bar_item_total from '../components/side_bar_item_total'
import { itemcontext,itemscount } from '../context/itemcontext'



const cart = () => {
  const {cartitems, setCartitems} = useContext(itemcontext)
  const {itemcount, setItemcount} = useContext(itemscount)
  const count = useRef(0)
  const iid=useRef(0)
  const loadeddata = useLoaderData()


  useEffect(() => {
    setCartitems(loadeddata.data)

  }, [loadeddata])

  const deletefromcart=async(id)=>{
    setCartitems(cartitems.filter(item=>item._id!==id))
    const deleted_item=await fetch("http://localhost:3000/cart_delete_one",{
      method:"DELETE",
      headers:{"content-type":"application/json"},
      body:JSON.stringify({_id:id})
    })
  }
  const update_item_count = (id) => {
    if(iid.current!=0 && id!==iid.current){
      count.current=1
      iid.current=0
    }
    iid.current=id
    count.current+=1
    setItemcount((prev) => {
    
      const existingIndex = prev.findIndex(item => item.id === iid.current);
      if (existingIndex !== -1) { 
        return prev.map((item, index) => 
          index === existingIndex ? { ...item, count: count.current } : item);
      } else {
        return [...prev, { id: iid.current, count: count.current }];
      }
    });
    

  };
  useEffect(() => {
    console.log(itemcount);
    
    
  }, [itemcount])
  

  
  return (
    <div>
      <Navbar />
      {cartitems?.length ===0 && <h1 className="empty">There no items in your cart</h1> }
      
          <div className="greaterflexbox">
            <div className="gridview">
              {cartitems.map((item) => (
                <div className="item" key={item._id}>
                  <div className="imagearea">
                    <img src={item.Image} alt="" />
                  </div>
                  <div className="descarea">
                    <p>{item.name}</p>
                    <p>{item.price}</p>
                  </div>
                  <div className="buttonarea">
                    <button onClick={() => update_item_count(item._id)}>ADD</button>
                    <button onClick={() => deletefromcart(item._id)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="sidepanel">
              <Side_bar_item_total />
            </div>
          </div>
       
    </div>
  )
}

export default cart
