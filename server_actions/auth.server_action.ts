'use server'

import { cookies } from 'next/headers'
import { fetcher } from './fetcher'
import { accessTokenValidity } from '@/config/constants/common.constants'

type LoginPayload = {
    email: string
    password: string
}

export async function loginAction({ email, password }: LoginPayload): Promise<{ success: boolean; message: string; error?: any }> {
    const result = await fetcher("/member/login", {
        method: "POST",
        body: { email, password },
    })

    if (result?.success && result.data?.accessToken && result.data?.user) {
        const cookieStore = await cookies()

        cookieStore.set({
            name: 'accessToken',
            value: result.data.accessToken,
            httpOnly: true,
            path: '/',
            secure: process.env.NODE_ENV === 'production',
            maxAge: accessTokenValidity,
        })

        return { success: true, message: 'Logged in successfully' }
    }

    return result
}
