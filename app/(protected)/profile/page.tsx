import { fetcher } from "@/server_actions/fetcher";
import ProfileClientComp from "./__components/ProfileClientComp";
import { revalidationTime } from "@/constants/common.constants";
import { cookies } from "next/headers";

export default async function ProfilePage() {

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const memberData = await fetcher('/member/me', {
    authToken: accessToken,
    revalidate: revalidationTime
  })
  if (memberData?.data?.access_rule) {
    delete memberData.data.access_rule
  }
  if (memberData?.data?.transaction_snapshot) {
    delete memberData.data.transaction_snapshot
  }

  return (
    <ProfileClientComp member={memberData?.data} />
  );
}
