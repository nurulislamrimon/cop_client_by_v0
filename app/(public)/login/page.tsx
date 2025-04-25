"use client"

import { Suspense } from "react"
import LoginForm from "./__components/LoginForm"

export default function LoginPageWrapper() {
    return (
        <Suspense fallback={<div className="text-center p-8">Loading...</div>}>
            <LoginForm />
        </Suspense>
    )
}
