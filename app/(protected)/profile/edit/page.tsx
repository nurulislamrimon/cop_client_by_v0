import { fetcher } from '@/server_actions/fetcher';
import EditProfileForm from './__components/EditMemberForm';
import { cookies } from 'next/headers';

export default async function EditMemberPage({ params }: { params: Promise<{ id: string }> }) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const memberData = await fetcher(`/member/me`, { authToken: accessToken });

    if (memberData?.data?.access_rule) {
        delete memberData.data.access_rule
    }
    if (memberData?.data?.transaction_snapshot) {
        delete memberData.data.transaction_snapshot
    }

    return <EditProfileForm member={memberData?.data} accessToken={accessToken} />
}
