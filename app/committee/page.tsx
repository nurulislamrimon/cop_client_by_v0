import PageTransition from "@/components/page-transition"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import CommitteeClientComps from "./__components/CommitteeClientComps"
import { fetcher } from "@/server_actions/fetcher"
import { ISearchParams } from "@/interfaces/meta"

export default async function CommitteePage({ searchParams }: { searchParams: Promise<ISearchParams> }) {

  const params = await searchParams;
  const page = parseInt(params.page ?? "1", 10);
  const limit = parseInt(params.limit ?? "10", 10);
  const search = params.search || "";

  const committeeData = await fetcher(`/committee?sortOrder=asc&limit=${limit}&page=${page}&searchTerm=${search}`)

  return (
    <PageTransition>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Committee</h1>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Committee Member
          </Button>
        </div>
        <CommitteeClientComps committees={committeeData?.data} />
      </div>
    </PageTransition>
  )
}
