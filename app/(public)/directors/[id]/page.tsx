import { revalidationTimeLong } from '@/config/constants/common.constants';
import { fetcher } from '@/server_actions/fetcher';
import DirectorViewIdClientComps from './__components/DirectorViewIdClientComps';

export default async function CommitteeMemberPreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const param = await params;
  const id = param.id;

  const committeeData = await fetcher(`/committee/${id}`, {
    revalidate: revalidationTimeLong,
  });


  return <DirectorViewIdClientComps committee={committeeData?.data} />;
}
