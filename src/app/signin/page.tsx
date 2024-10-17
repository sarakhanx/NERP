'use client'
import React, { Suspense } from "react"
import LoginComponent from "@/components/client_component/authen_components/loginComponent"

const Signin = () =>{

    return <div>
    <div className="bg-background dark:bg-background flex justify-center items-center gap-4 w-full">
    <Suspense fallback={<div>Loading...</div>}>
      <LoginComponent />
    </Suspense>
    </div>
  </div>
}

export default Signin;