"use client"

import React from "react";
import { useSession } from "@/lib/custom_hooks/useSession";
import CreateBranchForm from "@/components/prod_ui/forms_function/branch/createForm";


export default function Page () {
    const {user , loading} = useSession();
    return (
        <div className="flex justify-between items-center prm-r ">
            <CreateBranchForm/>
        </div>
    )
}