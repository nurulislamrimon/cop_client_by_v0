"use client"

import { useRouter } from "next/navigation"
import PageTransition from "@/components/page-transition"
import DataTable from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

// Mock data for directors
const directors = [
  {
    id: "1",
    name: "Michael Brown",
    position: "CEO",
    email: "m.brown@example.com",
    appointed: "2019-05-10",
    term: "2025-05-10",
  },
  {
    id: "2",
    name: "Emily Davis",
    position: "CFO",
    email: "emily.d@example.com",
    appointed: "2019-05-10",
    term: "2025-05-10",
  },
  {
    id: "3",
    name: "John Smith",
    position: "COO",
    email: "john.smith@example.com",
    appointed: "2020-01-15",
    term: "2026-01-15",
  },
  {
    id: "4",
    name: "Sarah Johnson",
    position: "CTO",
    email: "sarah.j@example.com",
    appointed: "2020-01-15",
    term: "2026-01-15",
  },
  {
    id: "5",
    name: "David Martinez",
    position: "Director of Operations",
    email: "d.martinez@example.com",
    appointed: "2021-03-20",
    term: "2027-03-20",
  },
  {
    id: "6",
    name: "Patricia Moore",
    position: "Director of Finance",
    email: "p.moore@example.com",
    appointed: "2021-03-20",
    term: "2027-03-20",
  },
  {
    id: "7",
    name: "James Taylor",
    position: "Director of Marketing",
    email: "j.taylor@example.com",
    appointed: "2022-06-05",
    term: "2028-06-05",
  },
]

export default function DirectorsPage() {
  const router = useRouter()

  const columns = [
    { key: "name", title: "Name" },
    { key: "position", title: "Position" },
    { key: "email", title: "Email" },
    { key: "appointed", title: "Appointed" },
    { key: "term", title: "Term End" },
  ]

  return (
    <PageTransition>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Directors</h1>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Director
          </Button>
        </div>
        <DataTable
          data={directors}
          columns={columns}
          searchKey="name"
          onRowClick={(director) => router.push(`/directors/${director.id}`)}
        />
      </div>
    </PageTransition>
  )
}
