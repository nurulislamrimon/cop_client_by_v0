import { cookies } from "next/headers";
import ManageTrxClientComps from "./__components/ManageTrxClientComps";

export default async function ManagePage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  return <ManageTrxClientComps accessToken={accessToken} />;
}
