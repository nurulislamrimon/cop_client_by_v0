import { cookies } from "next/headers";
import { fetcher } from "@/server_actions/fetcher";
import ManageFinanceClientComps from "./__components/ManageOverviewClientComps";

export default async function ManageOverviewPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  return <ManageFinanceClientComps accessToken={accessToken} />;
}
