import ProfitClientComps from "./__components/ProfitClientComps.tsx"
import { cookies } from "next/headers";


export default async function ProfitPage() {

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  return <ProfitClientComps accessToken={accessToken} />
}
