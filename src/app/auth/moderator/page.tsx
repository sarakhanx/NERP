'use client'

import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/custom_hooks/useSession";
import Link from "next/link";
import React from "react";


export default function Page() {
    const { user, loading } = useSession();

    if(loading) {
        return <p className="text-center text-2xl text-foreground dark:text-foreground">Loading...</p>
    }

    if(!user || !user.roles.includes("moderator")) {
        return <p className="text-red-500 prm-b text-center text-2xl">Unauthorized</p>;
    }

    return (
        <>
        <h1 className="text-6xl prm-b">Moderator</h1>
        <p className="text-foreground dark:text-foreground text-xs">Welcome to the moderator page</p>
        <p className="text-foreground dark:text-foreground text-xs">! ! !YOU ARE AUTHORIZED! ! !</p>
        <Link href="/auth/moderator/create-position">
            <Button>
                Create Position 
            </Button>
        </Link>
        </>
    )
}
