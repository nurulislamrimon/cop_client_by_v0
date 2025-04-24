import PageTransition from "@/components/page-transition"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import MemberClientComponents from "./__components/MemberClientComponents"
import { fetcher } from "@/server_actions/fetcher"


export default async function MembersPage() {
  const memberData = await fetcher('/member')
  // console.log(memberData);

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
        <MemberClientComponents members={memberData?.data} />
      </div>
    </PageTransition>
  )
}
