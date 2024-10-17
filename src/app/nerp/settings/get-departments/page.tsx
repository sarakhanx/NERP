'use client'

import { getDepartment } from "@/app/actions/api/setting/moderator-service";
import BacsicTable from "@/components/design_system_components/tables/basicTable";
import { Department } from "@/lib/type";
import { getCookie } from "cookies-next";
import React from "react";
import { useToast } from "@/hooks/use-toast";



export default function GetDepartments() {
    const {toast} = useToast()
    const [department, setDepartment] = React.useState<Department[]>([])
    
    const departments: Promise<Department[]> = getDepartment()
    React.useEffect( () => {
        const resp = async () =>{
            const data = await departments
            setDepartment(data)
        }
        resp()
    }, [departments])

    const deleteDepartment = async (name : string) => {
        const token = getCookie("token")
        try {
            const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/del-department/${name}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            if(!resp.ok){
                toast({
                    title: "ลบแผนกลบไม่สำเร็จ",
                    variant: "destructive"
                })
                throw new Error("Failed to delete department")
            }
            const data = await resp.json()
            console.log(name , data)
            toast({
                title: `${name} ถูกลบออกเรียบร้อยแล้ว`,
                description: `${data.message}`,
                variant: "default"
            })
        } catch (error) {
            toast({
                title: "Internal Error Boo boo ~",
                variant: "destructive"
            })
        }
        setDepartment(department.filter(dep => dep.name !== name));
    }



    return (
        <div>
            <h1 className="prm-b  -tracking-tighter underline underline-offset-2 text-2xl font-bold text-foreground dark:text-foreground">แผนกและตำแหน่งทั้งหมด</h1>
            <BacsicTable fucntion={deleteDepartment} departments={department} />
        </div>
    )
}