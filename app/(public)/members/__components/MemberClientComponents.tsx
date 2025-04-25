'use client'
import React from 'react'
import { useRouter } from "next/navigation"
import DataTable from '@/components/data-table'
import { IMeta } from '@/interfaces/meta'


export default function MemberClientComponents({ members, meta }: { members?: Record<string, unknown>[], meta: IMeta }) {
  const status = "Active"
  const router = useRouter()

  const columns = [
    {
      key: "id",
      title: "ID",
      render: (member: any) => <span className="font-medium">{member.id}</span>,
    },
    { key: "full_name", title: "Name" },
    { key: "email", title: "Email" },
    { key: "joining_date", title: "Joined" },
    {
      key: "status",
      title: "Status",
      render: (member: any) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${status === "Active"
            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
            }`}
        >
          {status}
        </span>
      ),
    },
  ]
  return (
    <>
      <DataTable
        data={members?.map((item: any) => { return { ...item, joining_date: item?.joining_date ? new Date(item?.joining_date).toDateString() : "-" } }) || []}
        meta={meta}
        columns={columns}
        searchKey="full_name"
        onRowClick={(member) => router.push(`/members/${member.id}`)}
      />
    </ >
  )
}
