'use server'

import { cookies } from 'next/headers'
import { fetcher } from './fetcher'

export async function deleteItem({ url, revalidatePaths }: { url: string, revalidatePaths: string[] }): Promise<{ success: boolean; message: string; errorMessages?: any, data?: any }> {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const result = await fetcher(url, {
        method: "DELETE",
        authToken: accessToken,
        revalidatePaths
    })

    return result
}
