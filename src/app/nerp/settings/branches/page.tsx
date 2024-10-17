"use client"

import React from "react";
import CreateBranchForm from "@/components/prod_ui/forms_function/branch/createForm";


export default function Page () {
    return (
        <div className="flex justify-between items-center prm-r ">
            <CreateBranchForm/>
        </div>
    )
}