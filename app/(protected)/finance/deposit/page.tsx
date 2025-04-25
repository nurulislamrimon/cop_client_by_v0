import DepositClientComps from "./__components/DepositClientComps.tsx"
import { cookies } from "next/headers";


export default async function DepositPage() {

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  return <DepositClientComps accessToken={accessToken} />
}
