import { revalidationTimeLong } from '@/constants/common.constants';
import { fetcher } from '@/server_actions/fetcher';
import CommitteeViewIdClientComps from './__components/CommitteeViewIdClientComps';

export default async function CommitteeMemberPreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const param = await params;
  const id = param.id;

  const committeeData = await fetcher(`/committee/${id}`, {
    revalidate: revalidationTimeLong,
  });


  return <CommitteeViewIdClientComps committee={committeeData?.data} />;
}
