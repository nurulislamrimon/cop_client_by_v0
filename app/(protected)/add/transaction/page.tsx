import { cookies } from 'next/headers';
import React from 'react'
import AddTransactionForm from './__components/AddTransactionForm';

export default async function AddTransactionPage() {

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    return (
        <AddTransactionForm accessToken={accessToken} />
    )
}
