import PageTransition from "@/components/page-transition"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { ISearchParams } from "@/interfaces/meta"
import { fetcher } from "@/server_actions/fetcher";
import DirectorsClientComps from "./__components/DirectorsClientComps";
import { revalidationTime } from "@/config/constants/common.constants";

export default async function DirectorsPage({ searchParams }: { searchParams: Promise<ISearchParams> }) {

  const params = await searchParams;
  const page = parseInt(params.page ?? "1", 10);
  const limit = parseInt(params.limit ?? "10", 10);
  const search = params.search || "";

  const committeeData = await fetcher(`/committee?type_of_committee=director&sortOrder=asc&limit=${limit}&page=${page}&searchTerm=${search}`, { revalidate: revalidationTime })

  return (
    <PageTransition>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Directors</h1>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Director
          </Button>
        </div>
        <DirectorsClientComps directors={committeeData?.data} />
      </div>
    </PageTransition>
  )
}
