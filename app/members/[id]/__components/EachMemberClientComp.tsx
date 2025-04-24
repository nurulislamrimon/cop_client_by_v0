import PreviewCard from '@/components/preview-card'
import { useParams } from 'next/navigation'
import React from 'react'

export default function EachMemberClientComp({ member }: { member: Record<string, unknown> }) {

    return (
        <PreviewCard
            title={member.name as string}
            data={{
                email: member.email,
                phone: member.phone_number,
                joinDate: member.created_at,
                status: member.status || "Active",
                shares: member.shares || 0,
                address: member.address,
                occupation: member.occupation,
                referredBy: (member.created_by as Record<string, string>)?.full_name as string,
            }}
            backLink="/members"
            imageSrc={`/placeholder.svg?height=128&width=128&text=${(member.name as string)
                ?.split(" ")
                ?.map((n) => n[0])
                ?.join("")}`}
            badges={[`${member.shares} Shares`, member.status as string || "Active"]}
        />
    )
}
