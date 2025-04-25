"use client"

import { useParams } from "next/navigation"
import PreviewCard from "@/components/preview-card"

// Mock data for committee members
const committeeMembers = [
  {
    id: "1",
    name: "Robert Wilson",
    position: "Chairperson",
    email: "r.wilson@example.com",
    phone: "+1 (555) 987-6543",
    appointed: "March 15, 2021",
    term: "March 15, 2023",
    department: "Executive",
    responsibilities: "Overall leadership and governance",
    meetings: "12/12 attended",
    bio: "Robert has been a member of the co-operative for 5 years and has extensive experience in organizational leadership.",
  },
  {
    id: "2",
    name: "Jennifer Lee",
    position: "Vice Chairperson",
    email: "j.lee@example.com",
    phone: "+1 (555) 876-5432",
    appointed: "March 15, 2021",
    term: "March 15, 2023",
    department: "Executive",
    responsibilities: "Supporting chairperson and strategic planning",
    meetings: "11/12 attended",
    bio: "Jennifer brings 10 years of experience in community organizing and has been instrumental in growing our membership.",
  },
  // More committee members would be here
]

export default function CommitteeMemberPreviewPage() {
  const params = useParams()
  const memberId = params.id as string

  // Find the committee member with the matching ID
  const member = committeeMembers.find((m) => m.id === memberId) || committeeMembers[0]

  return (
    <PreviewCard
      title={member.name}
      data={{
        position: member.position,
        email: member.email,
        phone: member.phone,
        appointed: member.appointed,
        term: member.term,
        department: member.department,
        responsibilities: member.responsibilities,
        meetings: member.meetings,
        bio: member.bio,
      }}
      backLink="/committee"
      imageSrc={`/placeholder.svg?height=128&width=128&text=${member.name
        .split(" ")
        .map((n) => n[0])
        .join("")}`}
      badges={[member.position, `Term: ${member.term}`]}
    />
  )
}
