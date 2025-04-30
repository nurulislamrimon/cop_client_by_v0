import { mainRoutes, revalidationTimeLong } from '@/constants/common.constants';
import { fetcher } from '@/server_actions/fetcher';
import { cookies } from 'next/headers';
import EditCommitteeForm from './__components/EditCommitteeForm';

export default async function EditCommitteePage({ params }: { params: Promise<{ id: string }> }) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const param = await params;
    const id = Number(param.id);

    const committeeData = await fetcher(`/committee/${id}`, { authToken: accessToken });
    const membersData = await fetcher(`/member?sortBy=id&sortOrder=asc&limit=100`, { authToken: accessToken });

    return <EditCommitteeForm committeeId={id} initialData={committeeData?.data} members={membersData?.data} accessToken={accessToken} />
}
