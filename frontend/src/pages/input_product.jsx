import React from 'react'
import { useForm } from "react-hook-form"
import { Form,useActionData } from 'react-router-dom'
import '../page_css/input_product.css'
import Navbar from '../components/navbar'

const input_product = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors,isSubmitting },
      } = useForm()
    const actiondata=useActionData()
  return (
    <div>
      <Navbar />
      {isSubmitting && <h2>Submitting...</h2> }
      <Form method="post">
        <h1>Add a new product</h1>
        <input type="text" placeholder='Product' defaultValue="" {...register("name", {required:true} )} />
        {errors.name && <p>Enter the name of the product</p> }
        <input type="number" placeholder='Price' defaultValue="" {...register("price", {required:true})} />
        {errors.price && <p>Enter the price of the product</p> }
        <input type="text" placeholder='url' defaultValue="" {...register("Image", {required:true})} />
        {errors.img_url && <p>Enter the url of image of the product</p> }
        <input disabled={isSubmitting} type="submit" value="Submit" />
        {actiondata?.success && <p className="success">Product added successfully!</p>}
      </Form>
    </div>
  )
}

export default input_product
