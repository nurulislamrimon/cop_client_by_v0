import { fetcher } from "@/server_actions/fetcher";

export default async function Home() {
  try {
    const data = await fetcher("/member");
    console.log(data);
  } catch (error) {
    console.log(error);
  }

  return <div className="space-y-8"></div>;
}
