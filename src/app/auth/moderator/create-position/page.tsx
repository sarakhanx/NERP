'use client'


import { Button } from "@/components/ui/button";
import Link from "next/link";
import CreateDepartment from "@/components/form_components/moderator/CreatePosition";
import { useSession } from "@/lib/custom_hooks/useSession";

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
        <h1 className="text-6xl prm-b text-foreground dark:text-foreground">Moderator</h1>
        <Link href="/auth/moderator/">
            <Button>
                Mod Dashboard
            </Button>
            </Link>
        <hr />
        <CreateDepartment />
        </>
    )
}


