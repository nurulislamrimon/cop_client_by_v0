'use server'

import { cookies } from 'next/headers'
import { fetcher } from './fetcher'
import { accessTokenValidity } from '@/config/constants/common.constants'

type LoginPayload = {
    email: string
    password: string
}

// login
export async function loginAction({ email, password }: LoginPayload): Promise<{ success: boolean; message: string; error?: any, data?: any }> {
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

        cookieStore.set({
            name: 'user',
            value: JSON.stringify(result.data.user),
            path: '/',
            maxAge: accessTokenValidity,
        })
        return result
    }

    return result
}

// logout 
export async function logoutAction(): Promise<{ success: boolean; message: string }> {
    try {
        const cookieStore = await cookies()

        cookieStore.set({
            name: 'accessToken',
            value: '',
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 0,
        })

        cookieStore.set({
            name: 'user',
            value: '',
            path: '/',
            maxAge: 0,
        })

        return { success: true, message: 'Logged out successfully' }
    } catch (error) {
        return { success: false, message: 'Failed to logout' }
    }
}
