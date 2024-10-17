'use client'

import React, { useEffect, useState } from 'react'
import DocumentTable from '@/components/prod_ui/document_ui/DocumentsTable'
import {Document} from '@/lib/type'

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [data, setData] = useState([])

  useEffect(()=>{
    const api = process.env.NEXT_PUBLIC_API_URL
    const fetchData = async () => {
      const resp = await fetch(`${api}/purchasing/purchaseorder?page=${currentPage}`)
      
      if(resp.status !== 200){
        console.log('Error fetching data')
        return
      }
      const dataResp = await resp.json()
      const uniqueData = dataResp.data.filter((item: Document) => item.doc_id !== null)
      .filter((item: Document, index: number, self: Document[]) => 
        index === self.findIndex((t: Document) => (
          t.doc_id === item.doc_id
        ))
      );

      setTotalPages(dataResp.totalPages)
      setData(uniqueData)
      setCurrentPage(dataResp.page)
      console.log(uniqueData)
    }
    fetchData()
  },[currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }
  return (
    <div>
      <DocumentTable data={data} totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
    </div>
  )
}
