"use client"

import { useParams } from "next/navigation"
import PreviewCard from "@/components/preview-card"

// Mock data for members
const members = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    joinDate: "May 12, 2020",
    status: "Active",
    shares: 120,
    address: "123 Main St, Anytown, CA 94321",
    occupation: "Software Engineer",
    referredBy: "Sarah Johnson",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+1 (555) 234-5678",
    joinDate: "November 23, 2019",
    status: "Active",
    shares: 85,
    address: "456 Oak Ave, Somewhere, CA 94123",
    occupation: "Marketing Manager",
    referredBy: "Michael Brown",
  },
  // More members would be here
]

export default function MemberPreviewPage() {
  const params = useParams()
  const memberId = params.id as string

  // Find the member with the matching ID
  const member = members.find((m) => m.id === memberId) || members[0]

  return (
    <PreviewCard
      title={member.name}
      data={{
        email: member.email,
        phone: member.phone,
        joinDate: member.joinDate,
        status: member.status,
        shares: member.shares,
        address: member.address,
        occupation: member.occupation,
        referredBy: member.referredBy,
      }}
      backLink="/members"
      imageSrc={`/placeholder.svg?height=128&width=128&text=${member.name
        .split(" ")
        .map((n) => n[0])
        .join("")}`}
      badges={[`${member.shares} Shares`, member.status]}
    />
  )
}
