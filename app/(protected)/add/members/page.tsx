import { cookies } from 'next/headers';
import React from 'react'
import AddMemberForm from './__components/AddMemberForm';

export default async function Page() {

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    return (
        <AddMemberForm accessToken={accessToken} />
    )
}
