'use client'
import React from "react";
import { useSession } from "@/lib/custom_hooks/useSession";
import { useRouter } from "next/navigation";




export default function Home() {
  const {user , loading } = useSession()
  const router = useRouter()
  if(loading){
    //Must be skelleton
    return <div className="flex justify-center items-center w-full h-full text-foreground dark:text-foreground">Loading...</div>
  }

  if(!user || !user.roles.includes("user")){
    return <div>
      <div className="bg-background dark:bg-background flex justify-center items-center gap-4 w-full">
        {/* <LoginComponent /> */}
        <h1 className="text-2xl font-bold text-foreground dark:text-foreground">HELLO FOLKS </h1>
      </div>
    </div>
  }



  return (
    
      <div className="bg-background dark:bg-background flex justify-center items-center gap-4 w-full">
        <h1 className="text-2xl font-bold text-foreground dark:text-foreground">HELLO {user.email}</h1>
      </div>
  );
}
