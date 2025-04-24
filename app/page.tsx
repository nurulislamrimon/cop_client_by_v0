import { fetcher } from "@/server_actions/fetcher";
import DashboardClientComponents from "./__components/DashboardClientComponents";

export default async function Home() {
  const data = await fetcher("/member/by-admin");
  console.log(data);

  return (
    <div className="space-y-8">
      <DashboardClientComponents />
    </div>
  );
}
