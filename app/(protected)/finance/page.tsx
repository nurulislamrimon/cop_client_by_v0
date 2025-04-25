import { cookies } from "next/headers";
import { fetcher } from "@/server_actions/fetcher";
import FinanceOverviewPageClientComps from "./__components/FinanceClientComps";
import { revalidationTime } from "@/constants/common.constants";

export default async function FinanceOverviewPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const data = await fetcher("/member/me", {
    authToken: accessToken,
    revalidate: revalidationTime
  });

  return <FinanceOverviewPageClientComps balance={data?.data?.balance} statistics={data?.data?.transaction_snapshot} accessToken={accessToken} />;
}
