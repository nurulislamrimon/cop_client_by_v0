"use client"

import { useRouter } from "next/navigation"
import PageTransition from "@/components/page-transition"
import DataTable from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

// Mock data for members
const members = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    joinDate: "2020-05-12",
    status: "Active",
    shares: 120,
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    joinDate: "2019-11-23",
    status: "Active",
    shares: 85,
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "m.brown@example.com",
    joinDate: "2021-02-08",
    status: "Active",
    shares: 65,
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.d@example.com",
    joinDate: "2018-07-30",
    status: "Inactive",
    shares: 40,
  },
  {
    id: "5",
    name: "Robert Wilson",
    email: "r.wilson@example.com",
    joinDate: "2022-01-15",
    status: "Active",
    shares: 110,
  },
  { id: "6", name: "Jennifer Lee", email: "j.lee@example.com", joinDate: "2020-09-04", status: "Active", shares: 75 },
  {
    id: "7",
    name: "David Martinez",
    email: "d.martinez@example.com",
    joinDate: "2019-04-22",
    status: "Active",
    shares: 95,
  },
  {
    id: "8",
    name: "Lisa Anderson",
    email: "l.anderson@example.com",
    joinDate: "2021-06-17",
    status: "Inactive",
    shares: 30,
  },
  {
    id: "9",
    name: "James Taylor",
    email: "j.taylor@example.com",
    joinDate: "2020-03-09",
    status: "Active",
    shares: 60,
  },
  {
    id: "10",
    name: "Patricia Moore",
    email: "p.moore@example.com",
    joinDate: "2018-12-01",
    status: "Active",
    shares: 150,
  },
  {
    id: "11",
    name: "Thomas Jackson",
    email: "t.jackson@example.com",
    joinDate: "2021-08-14",
    status: "Active",
    shares: 55,
  },
  {
    id: "12",
    name: "Nancy White",
    email: "n.white@example.com",
    joinDate: "2019-10-25",
    status: "Inactive",
    shares: 25,
  },
]

export default function MembersPage() {
  const router = useRouter()

  const columns = [
    { key: "name", title: "Name" },
    { key: "email", title: "Email" },
    { key: "joinDate", title: "Join Date" },
    {
      key: "status",
      title: "Status",
      render: (member: any) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            member.status === "Active"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
          }`}
        >
          {member.status}
        </span>
      ),
    },
    {
      key: "shares",
      title: "Shares",
      render: (member: any) => <span className="font-medium">{member.shares}</span>,
    },
  ]

  return (
    <PageTransition>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Members</h1>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Member
          </Button>
        </div>
        <DataTable
          data={members}
          columns={columns}
          searchKey="name"
          onRowClick={(member) => router.push(`/members/${member.id}`)}
        />
      </div>
    </PageTransition>
  )
}
