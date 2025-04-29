import { cookies } from "next/headers";
import ManageClientComps from "./__components/ManageClientComps";


export default async function ManagePage() {

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  return <ManageClientComps accessToken={accessToken} />
}
