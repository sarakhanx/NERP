"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react"
import { useSession } from "@/lib/custom_hooks/useSession";
import { Button } from "@/components/ui/button";


type branchesTypes = {
    id: number,
    branch_name: string,
    branch_address: string,
    updated_at: {
        Time: string,
        valid: boolean
    }
}

const BranchesTable = () => {
    const {user} = useSession()
    const [branches, setBranches] = React.useState<branchesTypes[]>([])

    React.useEffect(()=>{
        const retrieveBranches = async () => {
            const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-branches`)
            if(!resp.ok){
                console.log('Failed to fetch branches')
                throw new Error('Failed to fetch branches')
            }
            const data = await resp.json()
            setBranches(data.data)
            console.log(data)
        }
        retrieveBranches()
    },[])




  return (
    <div>
        {/* <div className="flex justify-between"> */}
            <Table>
                <TableCaption>
                Captions
                </TableCaption>
                <TableHeader>
                        <TableRow>
                            <TableHead>branch_name</TableHead>
                            <TableHead>branch_address</TableHead>
                            <TableHead>updated_at</TableHead>
                            <TableCell>Actions</TableCell>
                        </TableRow>

                </TableHeader>
                <TableBody>
                {branches.map((data , i)=>(
                        <TableRow key={i}>
                            <TableCell>{data.branch_name}</TableCell>
                            <TableCell>{data.branch_address}</TableCell>
                            <TableCell>{data.updated_at?.Time}</TableCell>
                            <TableCell className="flex gap-2">
                                {/* <Button variant="outline">Edit</Button> */}
                                <Button variant="destructive">Delete</Button>
                            </TableCell>
                        </TableRow>
                ))}
                </TableBody>
            </Table>
        {/* </div> */}
        
      {/* <Table className="w-full prm-" >
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table> */}
    </div>
  );
};

export default BranchesTable;
