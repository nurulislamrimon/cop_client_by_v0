import PreviewCard from "@/components/preview-card";
import React from "react";

export default function ProfileClientComp({
  member,
}: {
  member?: Record<string, string>;
}) {
  let memberData: Record<string, string> = {};
  let profile_photo = "";

  if (member) {
    const { profile_photo: photo_field, profile_photo_url, ...rest } = member;
    memberData = rest;
    profile_photo = profile_photo_url;
    delete rest.profile_photo;
  }

  return (
    <PreviewCard
      title={memberData.full_name as string}
      data={memberData}
      backLink="/members"
      editPage={"/profile/edit"}
      deleteUrl={"/member/" + memberData?.id}
      imageSrc={
        profile_photo ||
        `/placeholder.svg?height=128&width=128&text=${(
          memberData.name as string
        )
          ?.split(" ")
          ?.map((n) => n[0])
          ?.join("")}`
      }
      badges={
        memberData
          ? [
            `${memberData.shares ?? 0} Shares`,
            memberData.account_status
              ? memberData.account_status.charAt(0).toUpperCase() + memberData.account_status.slice(1)
              : 'Unknown Status',
          ]
          : []
      }

    />
  );
}
