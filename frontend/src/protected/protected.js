import { redirect } from "react-router-dom"

export const Protectedpages=()=>{
  
    const token= localStorage.getItem("token")
    if(!token){
        // throw new Response("Not admin",{status:401})
        localStorage.removeItem("token")
        return redirect("/login")
        
    }
    return null
}