'use client'

import React from "react";
import CreateDepartment from "@/components/form_components/moderator/CreatePosition";



export default function CreatePositionPage() {

    return (
        <div className="flex flex-col justify-between space-y-4">
            <h3 className="text-2xl font-bold text-foreground dark:text-foreground underline underline-offset-4">Create Position</h3>
            <CreateDepartment />
        </div>
    )
}