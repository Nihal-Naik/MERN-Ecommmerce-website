import React from 'react'
import { useForm } from 'react-hook-form'
import { Form,useActionData } from 'react-router-dom'
import '../page_css/login.css'

const login = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors , isSubmitting },
      } = useForm()
      const actiondata=useActionData()
  return (
    <div>
      <Form method="post">
        <input type="text" placeholder='Usermail' defaultValue="" {...register("name", {required:true})} />
        {errors.name && <p>Enter tour username</p> }
        <input type="text" placeholder='Password' defaultValue="" {...register("password", {required:true})} />
        {errors.password && <p>Enter the password</p> }
        <input type="submit" value="Login"  />
      </Form>
    </div>
  )
}

export default login
