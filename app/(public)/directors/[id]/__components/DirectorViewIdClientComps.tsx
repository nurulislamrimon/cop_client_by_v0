
"use client"

import PreviewCard from "@/components/preview-card"

export default function DirectorViewIdClientComps({ committee }: { committee?: Record<string, any> }) {
    let committeeData: Record<string, string> = {}
    let profile_photo = ''
    if (committee) {
        const { member, ...rest } = committee
        profile_photo = member.profile_photo;
        delete member.profile_photo;
        delete member.id;
        committeeData = {
            ...(rest || {}),
            ...(member || {})
        }
    }

    return (
        <PreviewCard
            title={committee?.full_name}
            data={committeeData}
            backLink="/committee"
            editPage={"/edit/committee/" + committee?.id}
            imageSrc={profile_photo || `/placeholder.svg?height=128&width=128&text=${committeeData.full_name
                ?.split(" ")
                ?.map((n: any) => n[0])
                ?.join("")}`}
            badges={[committeeData?.designation, `Term: ${committeeData?.valid_till ? new Date(committeeData?.valid_till) : "-"}`]}
        />
    )
}
