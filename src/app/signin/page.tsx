'use client'
import React from "react"
import LoginComponent from "@/components/client_component/authen_components/loginComponent"

const Signin = () =>{

    return <div>
    <div className="bg-background dark:bg-background flex justify-center items-center gap-4 w-full">
      <LoginComponent />
    </div>
  </div>
}

export default Signin;