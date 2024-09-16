'use client'
import CreateDepartment from "@/components/form_components/moderator/CreateDepartment";


export default function CreateDepartmentPage() {
    return (
        <div className="flex flex-col justify-between space-y-4">
            <h3 className="text-2xl font-bold text-foreground dark:text-foreground underline underline-offset-4">Create Department</h3>
            <CreateDepartment />
        </div>
    )
}
