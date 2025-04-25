'use client'

import { useRouter } from "next/navigation"
import React from 'react'
import DataTable from '@/components/data-table'

export default function CommitteeClientComps({ committees }: { committees: Record<string, unknown>[] }) {
    const router = useRouter()
    const columns = [
        { key: "id", title: "ID" },
        { key: "full_name", title: "Name" },
        { key: "designation", title: "Position" },
        { key: "selected_at", title: "Appointed" },
        { key: "valid_till", title: "Term End" },
    ]
    return (
        <>
            <DataTable
                data={committees?.map((item: any) => ({
                    ...item,
                    selected_at: item.selected_at ? new Date(item.selected_at).toDateString() : "-",
                    valid_till: item.valid_till ? new Date(item.valid_till).toDateString() : "-",
                    full_name: item.member?.full_name ?? "",
                }))}
                columns={columns}
                searchKey="name"
                onRowClick={(member) => router.push(`/committee/${member.id}`)}
            /></>
    )
}
