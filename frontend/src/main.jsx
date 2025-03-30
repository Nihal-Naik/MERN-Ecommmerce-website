import { StrictMode } from 'react'

import * as ReactDOM from "react-dom/client"
import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import Home from './pages/home';
import Input_product from './pages/input_product';
import Cart from './pages/cart'
import '../src/index.css'
import Product_details from './pages/product_details';
import Login from './pages/login';
import Admindashboard from './pages/admindashboard';
import { Protectedpages } from './protected/protected';
import Errorboundary from './pages/errorboundary';
import ItemProvider from './context/itemcontext';




let router = createBrowserRouter([
  {
    path: "/",
    element:<Home/>,
    errorElement:<Errorboundary />,
    loader: async () => {
      const response=await fetch("http://localhost:3000/display_products")
      if(!response.ok) throw new Error("Failed to fetch response")
      return response.json()
    }
  },
  {
    path: "/input_product",
    element: <Input_product />,
    errorElement:<Errorboundary />,
    loader:Protectedpages,
    action: async ({request}) => {
      const formdata=await request.formData()
      const data=Object.fromEntries(formdata)

      console.log("Data recieved!",data);
      await fetch("http://localhost:3000/insert_product", {
        method: "POST",
        headers: { "x-auth-token":localStorage.getItem("token"), "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return {success:true}
    }
  },
  {
    path: "/cart",
    element: <Cart />,
    errorElement:<Errorboundary />,
    loader: async () => {
      const response=await fetch("http://localhost:3000/displaycart")
      if(!response) throw new error ("Failed to fecth response")
      return response.json()
    }
  },
  {
    path:"/product/:name",
    element: <Product_details />,
    errorElement:<Errorboundary />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement:<Errorboundary />,
    action: async ({ request }) => {
      try {
        const formData = await request.formData();
        const loginData = Object.fromEntries(formData);

        const response = await fetch("http://localhost:3000/adminlogin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loginData),
        });

        if (!response.ok) {
          const errorText = await response.text(); // Read error message
          throw new Error(`Login failed: ${errorText}`);
        }

        const data = await response.json();
        localStorage.setItem("token", data.token);
        return redirect("/admindashboard")
      } catch (error) {
        console.error("Login error:", error);
        return { error: error.message };
      }
    },
  },
  {
    path:"/admindashboard",
    element: <Admindashboard />,
    errorElement:<Errorboundary />,
    loader: async () => {
      const token = localStorage.getItem("token");
      // console.log(token);
      
      if (!token) throw new Response("Unauthorized", { status: 401 ,message:"Unathourized"});
    
      const response = await fetch("http://localhost:3000/dashboard", {
        headers: { "x-auth-token": token },
      });
      
      if (response.status===401){ localStorage.removeItem("token"); return redirect('/login')}
      if (!response.ok) throw new Response("Unauthorized token", { status: 401 });
    
      return response.json();
    }
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
     <ItemProvider>
        <RouterProvider router={router} />
     </ItemProvider>
  </StrictMode>,
)
