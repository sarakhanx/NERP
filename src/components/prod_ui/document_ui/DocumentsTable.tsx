'use client'

import { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Document , DocumentTableProps} from "@/lib/type"
import Link from 'next/link'


export default function DocumentTable({ data, totalPages, currentPage, onPageChange }: DocumentTableProps) {
  const [sortColumn, setSortColumn] = useState<keyof Document>('doc_id')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const sortedData = [...data].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1
    if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1
    return 0
  })

  const handleSort = (column: keyof Document) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="cursor-pointer" onClick={() => handleSort('doc_id')}>
              Doc ID {sortColumn === 'doc_id' && (sortDirection === 'asc' ? '▲' : '▼')}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort('created_at')}>
              Created At {sortColumn === 'created_at' && (sortDirection === 'asc' ? '▲' : '▼')}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort('ex_vat')}>
              Ex VAT {sortColumn === 'ex_vat' && (sortDirection === 'asc' ? '▲' : '▼')}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort('vat')}>
              VAT {sortColumn === 'vat' && (sortDirection === 'asc' ? '▲' : '▼')}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort('in_vat')}>
              In VAT {sortColumn === 'in_vat' && (sortDirection === 'asc' ? '▲' : '▼')}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort('user_name')}>
              User {sortColumn === 'user_name' && (sortDirection === 'asc' ? '▲' : '▼')}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort('branch_name')}>
              Branch {sortColumn === 'branch_name' && (sortDirection === 'asc' ? '▲' : '▼')}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((doc) => (
            <TableRow key={doc.doc_id}><Link href={`/nerp/warehouse-services/debug/${doc.doc_id}`}>
              <TableCell className='font-bold prm-b'><span>{doc.doc_prefix_name.String}</span>/{doc.doc_id}</TableCell></Link>
              <TableCell>{new Date(doc.created_at.Time).toLocaleString()}</TableCell>
              <TableCell>{doc.ex_vat.toFixed(2)}</TableCell>
              <TableCell>{doc.vat.toFixed(2)}</TableCell>
              <TableCell>{doc.in_vat.toFixed(2)}</TableCell>
              <TableCell>{doc.user_name}</TableCell>
              <TableCell>{doc.branch_name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => onPageChange(currentPage - 1)}
              className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink 
                onClick={() => onPageChange(i + 1)}
                isActive={currentPage === i + 1}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext 
              onClick={() => onPageChange(currentPage + 1)}
              className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}