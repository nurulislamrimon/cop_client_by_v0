import { fetcher } from '@/server_actions/fetcher';
import { cookies } from 'next/headers';
import EditTransactionForm from './__components/EditTransactionForm';

export default async function EditMemberPage({ params }: { params: Promise<{ id: string }> }) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const param = await params;
    const id = param.id;

    const transactionData = await fetcher(`/transaction/${id}`, { authToken: accessToken });

    return <EditTransactionForm initialData={transactionData?.data} accessToken={accessToken} />
}
