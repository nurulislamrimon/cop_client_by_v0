import PreviewCard from '@/components/preview-card'
import React from 'react'

export default function EachMemberClientComp({ member }: { member?: Record<string, string> }) {
    let memberData: Record<string, string> = {}
    let profile_photo = ''

    if (member) {
        const { profile_photo: photo, ...rest } = member;
        memberData = rest
        profile_photo = photo
        delete rest.profile_photo
    }


    return (
        <PreviewCard
            title={memberData.full_name as string}
            data={memberData}
            backLink="/members"
            imageSrc={profile_photo || `/placeholder.svg?height=128&width=128&text=${(memberData.name as string)
                ?.split(" ")
                ?.map((n) => n[0])
                ?.join("")}`}
            badges={[`${memberData.shares || 0} Shares`, (memberData?.account_status as string)?.charAt(0).toUpperCase() + (memberData?.account_status as string)?.slice(1)]}
        />
    )
}
