import { fetcher } from "../server_actions/fetcher";
import DashboardClientComponents from "./__components/DashboardClientComponents";

export default async function Home() {
  const data = await fetcher("/dashboard");

  return (
    <div className="space-y-8">
      <DashboardClientComponents data={data?.data} />
    </div>
  );
}
