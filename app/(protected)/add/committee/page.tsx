import { mainRoutes } from '@/constants/common.constants';
import { fetcher } from '@/server_actions/fetcher';
import { cookies } from 'next/headers';
import AddCommitteeForm from './__components/AddCommitteeForm';

export default async function EditMemberPage() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const memberData = await fetcher(`/member`, { authToken: accessToken, revalidatePaths: [...mainRoutes] });

    return <AddCommitteeForm members={memberData?.data} accessToken={accessToken} />
}
