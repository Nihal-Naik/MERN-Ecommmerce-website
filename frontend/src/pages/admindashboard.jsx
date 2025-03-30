import React, { useEffect, useState } from 'react'
import { MdDelete, MdSystemUpdateAlt } from "react-icons/md";
import '../page_css/admindashboard.css'
import { useForm } from 'react-hook-form';

const Admindashboard = () => {
  const [data, setData] = useState([]);
  const [change, setChange] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null); // Track product being updated

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/dashboard", {
        headers: { "x-auth-token": localStorage.getItem("token") },
      });
      if (!response.ok) throw new Error("Data not received");
      const products = await response.json();
      setData(products.data);
    };
    fetchData();
  }, [change]);

  const deleteItem = async (id) => {
    const response = await fetch("http://localhost:3000/delete_one", {
      method: "DELETE",
      headers: {
        "x-auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ _id: id })
    });
    if (!response.ok) throw new Error("Something went wrong!");
    setChange(prev => prev + 1);
  };

  const handleUpdateClick = (product) => {
    setSelectedProduct(product); // Open update form with selected product
  };

  return (
    <div className="display_products_admin">
      {data.map((item) => (
        <div className="display_box_admin" key={item._id}>
          <img src={item.Image} alt="" />
          <p>{item.name}</p>
          <p>{item.price}</p>
          <button onClick={() => deleteItem(item._id)}><MdDelete /></button>
          <button onClick={() => handleUpdateClick(item)}><MdSystemUpdateAlt /></button>
        </div>
      ))}

      {/* Show Update Form Only When a Product is Selected */}
      {selectedProduct && (
        <UpdateForm
          product={selectedProduct}
          setChange={setChange}
          setSelectedProduct={setSelectedProduct}
        />
      )}
    </div>
  );
};

// Separate UpdateForm Component
const UpdateForm = ({ product, setChange, setSelectedProduct }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: product.name,
      price: product.price,
      image: product.Image
    }
  });

  const onSubmit = async (data) => {
    const response = await fetch("http://localhost:3000/update", {
      method: "PUT",
      headers: {
        "x-auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ _id: product._id, ...data })
    });

    if (!response.ok) throw new Error("Something went wrong!");
    setChange(prev => prev + 1); // Refresh data
    setSelectedProduct(null); // Hide the form after update
  };

  return (
    <div className="popup">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name", { required: true })} />
        {errors.name && <p>Enter the product name</p>}

        <input {...register("price", { required: true })} />
        {errors.price && <p>Enter the product price</p>}

        <input {...register("image", { required: true })} />
        {errors.image && <p>Enter the image URL</p>}

        <button type="submit">Update</button>
        <button type="button" onClick={() => setSelectedProduct(null)}>Cancel</button>
      </form>
    </div>
  );
};

export default Admindashboard;
