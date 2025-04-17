"use client"

import { useRouter } from "next/navigation"
import PageTransition from "@/components/page-transition"
import DataTable from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

// Mock data for committee members
const committeeMembers = [
  {
    id: "1",
    name: "Robert Wilson",
    position: "Chairperson",
    email: "r.wilson@example.com",
    appointed: "2021-03-15",
    term: "2023-03-15",
  },
  {
    id: "2",
    name: "Jennifer Lee",
    position: "Vice Chairperson",
    email: "j.lee@example.com",
    appointed: "2021-03-15",
    term: "2023-03-15",
  },
  {
    id: "3",
    name: "David Martinez",
    position: "Secretary",
    email: "d.martinez@example.com",
    appointed: "2021-03-15",
    term: "2023-03-15",
  },
  {
    id: "4",
    name: "Patricia Moore",
    position: "Treasurer",
    email: "p.moore@example.com",
    appointed: "2021-03-15",
    term: "2023-03-15",
  },
  {
    id: "5",
    name: "James Taylor",
    position: "Member",
    email: "j.taylor@example.com",
    appointed: "2022-01-10",
    term: "2024-01-10",
  },
  {
    id: "6",
    name: "Lisa Anderson",
    position: "Member",
    email: "l.anderson@example.com",
    appointed: "2022-01-10",
    term: "2024-01-10",
  },
  {
    id: "7",
    name: "Thomas Jackson",
    position: "Member",
    email: "t.jackson@example.com",
    appointed: "2022-01-10",
    term: "2024-01-10",
  },
  {
    id: "8",
    name: "Nancy White",
    position: "Member",
    email: "n.white@example.com",
    appointed: "2022-06-20",
    term: "2024-06-20",
  },
]

export default function CommitteePage() {
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
          <h1 className="text-2xl font-bold tracking-tight">Committee</h1>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Committee Member
          </Button>
        </div>
        <DataTable
          data={committeeMembers}
          columns={columns}
          searchKey="name"
          onRowClick={(member) => router.push(`/committee/${member.id}`)}
        />
      </div>
    </PageTransition>
  )
}
