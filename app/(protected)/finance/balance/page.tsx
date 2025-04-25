import { cookies } from "next/headers";
import { fetcher } from "@/server_actions/fetcher";
import { revalidationTime } from "@/constants/common.constants";
import BalanceClientComps from "./__components/BalanceClientComps";

export default async function FinanceOverviewPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const data = await fetcher("/member/me", {
    authToken: accessToken,
    revalidate: revalidationTime
  });
  return <BalanceClientComps user={data?.data} />
}
