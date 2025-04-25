import WithdrawClientComps from "./__components/WithdrawClientComps.tsx"
import { cookies } from "next/headers";


export default async function WithdrawPage() {

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  return <WithdrawClientComps accessToken={accessToken} />
}
