import { fetcher } from "@/server_actions/fetcher"
import { Button } from "@/components/ui/button"
import PageTransition from "@/components/page-transition"
import { PlusCircle } from "lucide-react"
import MemberClientComponents from "./__components/MemberClientComponents"
import { ISearchParams } from "@/interfaces/meta"
import { revalidationTime } from "@/config/constants/common"


export default async function MembersPage({ searchParams }: { searchParams: Promise<ISearchParams> }) {
  const params = await searchParams;
  const page = parseInt(params.page ?? "1", 10);
  const limit = parseInt(params.limit ?? "10", 10);
  const search = params.search || "";

  const memberData = await fetcher(`/member?sortOrder=asc&limit=${limit}&page=${page}&searchTerm=${search}`, { revalidate: revalidationTime })

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
