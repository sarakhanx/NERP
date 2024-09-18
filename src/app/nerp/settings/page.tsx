"use client"

import React from "react";
import { useSession } from "@/lib/custom_hooks/useSession";
import { useRouter } from "next/navigation";




export default function SettingsPage() {
    const {user , loading } = useSession()
    const router = useRouter()
    if(loading){
        //Must be skelleton
        return <div className="flex justify-center items-center w-full h-full text-foreground dark:text-foreground">Loading...</div>
    }
    
    if(!user || !user.roles.includes("moderator")){
        router.push("/")
    }
    return (
        <>
            <h1 className="text-2xl font-bold text-foreground dark:text-foreground">Settings</h1>
        </>
    )
}