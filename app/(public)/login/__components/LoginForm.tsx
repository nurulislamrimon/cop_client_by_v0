'use client'

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { loginAction } from "@/server_actions/auth.server_action"

export default function LoginForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get("callbackUrl") || "/"

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const data = await loginAction({ email, password })
            if (data.success) {
                toast.success("Login successful!")
                router.push(callbackUrl)
            } else {
                const errorMessages = data.error?.errorMessages
                if (Array.isArray(errorMessages)) {
                    errorMessages.forEach((e) => toast.error(e.message))
                } else {
                    toast.error("Invalid credentials")
                }
            }
        } catch {
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card className="max-w-md w-full p-6 shadow-xl rounded-2xl">
                    <CardContent>
                        <form className="space-y-6" onSubmit={handleLogin}>
                            <h1 className="text-2xl font-bold text-center">Login</h1>
                            <Input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={loading}
                            />
                            <Input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={loading}
                            />
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={loading || !email || !password}
                            >
                                {loading ? "Logging in..." : "Login"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}
