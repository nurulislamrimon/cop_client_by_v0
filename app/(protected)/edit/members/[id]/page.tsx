import { mainRoutes, revalidationTimeLong } from '@/constants/common.constants';
import { fetcher } from '@/server_actions/fetcher';
import EditMemberForm from './__components/EditMemberForm';
import { cookies } from 'next/headers';

export default async function EditMemberPage({ params }: { params: Promise<{ id: string }> }) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const param = await params;
    const id = param.id;

    const memberData = await fetcher(`/member/${id}`, { authToken: accessToken });

    return <EditMemberForm member={memberData?.data} accessToken={accessToken} />
}
