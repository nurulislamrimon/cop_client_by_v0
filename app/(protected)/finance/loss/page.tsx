import LossClientComps from "./__components/LossClientComps.tsx"
import { cookies } from "next/headers";


export default async function LossPage() {

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  return <LossClientComps accessToken={accessToken} />
}
