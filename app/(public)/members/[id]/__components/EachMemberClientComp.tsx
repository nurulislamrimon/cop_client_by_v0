import PreviewCard from "@/components/preview-card";
import React from "react";

export default function EachMemberClientComp({
  member,
}: {
  member?: Record<string, string>;
}) {
  let memberData: Record<string, string> = {};
  let profile_photo = "";

  if (member) {
    const { profile_photo: photo_field, profile_photo_url, date_of_birth, joining_date, created_at, ...rest } = member;
    memberData = rest;
    profile_photo = profile_photo_url;
    delete rest.profile_photo;
    // dates modification
    if (date_of_birth) {
      memberData.date_of_birth = new Date(date_of_birth).toDateString()
    }
    if (joining_date) {
      memberData.joining_date = new Date(joining_date).toDateString()
    }
    if (created_at) {
      memberData.created_at = new Date(created_at).toDateString()
    }
  }

  return (
    <PreviewCard
      title={memberData.full_name as string}
      data={memberData}
      backLink="/members"
      editPage={"/edit/members/" + memberData?.id}
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
      badges={[
        `${memberData.shares || 0} Shares`,
        (memberData?.account_status as string)?.charAt(0).toUpperCase() +
        (memberData?.account_status as string)?.slice(1),
      ]}
    />
  );
}
