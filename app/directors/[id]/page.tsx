"use client"

import { useParams } from "next/navigation"
import PreviewCard from "@/components/preview-card"

// Mock data for directors
const directors = [
  {
    id: "1",
    name: "Michael Brown",
    position: "CEO",
    email: "m.brown@example.com",
    phone: "+1 (555) 123-7890",
    appointed: "May 10, 2019",
    term: "May 10, 2025",
    department: "Executive",
    responsibilities: "Overall organizational leadership and strategy",
    experience: "15+ years in cooperative management",
    education: "MBA, Harvard Business School",
    bio: "Michael has led the organization through significant growth, doubling membership and assets in the past three years.",
  },
  {
    id: "2",
    name: "Emily Davis",
    position: "CFO",
    email: "emily.d@example.com",
    phone: "+1 (555) 234-5678",
    appointed: "May 10, 2019",
    term: "May 10, 2025",
    department: "Finance",
    responsibilities: "Financial oversight, budgeting, and investment strategy",
    experience: "12 years in financial management",
    education: "CPA, Finance MBA from Stanford",
    bio: "Emily has implemented robust financial controls and led the organization to its strongest financial position to date.",
  },
  // More directors would be here
]

export default function DirectorPreviewPage() {
  const params = useParams()
  const directorId = params.id as string

  // Find the director with the matching ID
  const director = directors.find((d) => d.id === directorId) || directors[0]

  return (
    <PreviewCard
      title={director.name}
      data={{
        position: director.position,
        email: director.email,
        phone: director.phone,
        appointed: director.appointed,
        term: director.term,
        department: director.department,
        responsibilities: director.responsibilities,
        experience: director.experience,
        education: director.education,
        bio: director.bio,
      }}
      backLink="/directors"
      imageSrc={`/placeholder.svg?height=128&width=128&text=${director.name
        .split(" ")
        .map((n) => n[0])
        .join("")}`}
      badges={[director.position, `Term: ${director.term}`]}
    />
  )
}
