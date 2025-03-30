import React, { useContext,useEffect,useState } from 'react'
import { itemcontext, itemscount } from '../context/itemcontext'

import '../components_css/side_bar_items.css'


const side_bar_item_total = () => {
    let items=useContext(itemcontext)
    let item_count=useContext(itemscount)
    // console.log(item_count.itemcount);
    
    // console.log(items);
    const [total, settotal] = useState(0)
    
    useEffect(() => {
      const totalAmount = items.cartitems.reduce((sum, item) => {
        const foundItem = item_count.itemcount.find((i) => i.id === item._id);
        const quantity = foundItem ? foundItem.count : 1; // Default to 1 if item not found
        return sum + parseFloat(item.price) * quantity;
      }, 0);
      
      settotal(totalAmount);
    }, [items.cartitems, item_count.itemcount]);

    const openbuy=()=>{
      alert("You payed successfully")
    }
    
  return (
    <div className="side_bar">
      {items.cartitems?.map((item)=>{
        const foundItem = item_count.itemcount.find((i) => i.id === item._id);
        // console.log(item.name),
        return(
        <div className="flexbox" key={item._id}>
          <p >{foundItem && <b>{foundItem.count} x </b>} {item.name} : </p>
          <p>{item.price}</p>
        </div>
        )
})}
      <hr />
      <h1>Total : {total.toFixed(2)}</h1>
      <button className="buy_now" onClick={()=>openbuy()}>Pay</button>
    </div>
  )
}

export default side_bar_item_total
