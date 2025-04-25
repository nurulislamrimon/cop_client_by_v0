import { fetcher } from "@/server_actions/fetcher";
import EachMemberClientComp from "./__components/EachMemberClientComp";
import { revalidationTime } from "@/config/constants/common.constants";

interface MemberPreviewPageProps {
  params: {
    id: string;
  };
}

export default async function MemberPreviewPage({ params }: MemberPreviewPageProps) {
  const { id } = await params;
  const memberData = await fetcher('/member/' + id, { revalidate: revalidationTime })
  return (
    <EachMemberClientComp member={memberData?.data} />
  );
}
