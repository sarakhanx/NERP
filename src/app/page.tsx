'use client'
//Session Provider
import React from "react";
import { useSession } from "@/lib/custom_hooks/useSession";




export default function Home() {
  const {user , loading } = useSession()
  if(loading){
    //Must be skelleton
    return <div className="flex justify-center items-center w-full h-full text-foreground dark:text-foreground">Loading...</div>
  }

  if(!user || !user.roles.includes("user")){
    return <div>
      <div className="bg-background dark:bg-background flex justify-center items-center gap-4 w-full">
        <h1 className="text-2xl font-bold text-foreground dark:text-foreground">HELLO FOLKS Youre Not Authorized to access this page WHO ARE YOU ?</h1>
      </div>
    </div>
  }

  return (
      <div className="bg-background dark:bg-background flex justify-center items-center gap-4 w-full">
        <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold text-foreground dark:text-foreground">HELLO {user.email}</h1>
        <p className="text-sm prm-l text-foreground dark:text-foreground">this is the home page please go implement on navbar this week</p>
        <p className="text-sm prm-l text-foreground dark:text-foreground">or edite file in src/app/nerp/*</p>
        </div>
      </div>
  );
}
