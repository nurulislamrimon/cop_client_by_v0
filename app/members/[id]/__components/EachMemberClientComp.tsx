import PreviewCard from '@/components/preview-card'
import React from 'react'

export default function EachMemberClientComp({ member }: { member: Record<string, unknown> }) {

    return (
        <PreviewCard
            title={member.full_name as string}
            data={{
                name: member.full_name,
                email: member.email,
                fatherName: member.father_name,
                dateOfBirth: member.date_of_birth && new Date(member.date_of_birth as string).toDateString(),
                phone: member.phone_number,
                joinDate: member.joining_date && new Date(member.joining_date as string).toDateString(),
                address: member.address,
                id: member.id,
                occupation: member.occupation,
                referedBy: member.reffered_by,
            }}
            backLink="/members"
            imageSrc={`/placeholder.svg?height=128&width=128&text=${(member.name as string)
                ?.split(" ")
                ?.map((n) => n[0])
                ?.join("")}`}
            badges={[`${member.shares || 0} Shares`, (member?.account_status as string)?.charAt(0).toUpperCase() + (member?.account_status as string)?.slice(1)]}
        />
    )
}
