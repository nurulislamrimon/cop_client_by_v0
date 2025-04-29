import { cookies } from "next/headers";
import { fetcher } from "@/server_actions/fetcher";
import FinanceOverviewPageClientComps from "./__components/ManageFinanceClientComps";
import ManageFinanceClientComps from "./__components/ManageFinanceClientComps";

export default async function FinanceOverviewPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;


  return <ManageFinanceClientComps accessToken={accessToken} />
}
