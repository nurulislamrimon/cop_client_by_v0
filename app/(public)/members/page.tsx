import { fetcher } from "@/server_actions/fetcher"
import { Button } from "@/components/ui/button"
import PageTransition from "@/components/page-transition"
import { PlusCircle } from "lucide-react"
import MemberClientComponents from "./__components/MemberClientComponents"
import { ISearchParams } from "@/interfaces/meta"
import { revalidationTime } from "@/constants/common.constants"
import Link from "next/link"


export default async function MembersPage({ searchParams }: { searchParams: Promise<ISearchParams> }) {
  const params = await searchParams;
  const page = parseInt(params.page ?? "1", 10);
  const limit = parseInt(params.limit ?? "50", 10);
  const search = params.search || "";

  const memberData = await fetcher(`/member?sortBy=id&sortOrder=asc&limit=${limit}&page=${page}&searchTerm=${search}`, { revalidate: revalidationTime })

  return (
    <PageTransition>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Members</h1>
          <Link href="/add/members">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Member
            </Button>
          </Link>
        </div>
        <MemberClientComponents members={memberData?.data} meta={memberData?.meta} />
      </div>
    </PageTransition>
  )
}
