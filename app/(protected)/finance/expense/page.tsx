import { cookies } from "next/headers";
import ExpenseClientComps from "./__components/ExpenseClientComps.tsx";


export default async function ExpensePage() {

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  return <ExpenseClientComps accessToken={accessToken} />
}
