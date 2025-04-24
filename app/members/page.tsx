import { fetcher } from "@/server_actions/fetcher"
import { Button } from "@/components/ui/button"
import PageTransition from "@/components/page-transition"
import { PlusCircle } from "lucide-react"
import MemberClientComponents from "./__components/MemberClientComponents"

interface MembersPageProps {
  searchParams: {
    page?: string
    limit?: string
  }
}

export default async function MembersPage({ searchParams }: MembersPageProps) {
  const page = parseInt(await searchParams?.page ?? "1", 10)
  const limit = parseInt(await searchParams?.limit ?? "10", 10)

  const memberData = await fetcher(`/member?sortOrder=asc&limit=${limit}&page=${page}`)

  return (
    <PageTransition>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Members</h1>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Member
          </Button>
        </div>
        <MemberClientComponents members={memberData?.data} meta={memberData?.meta} />
      </div>
    </PageTransition>
  )
}
