"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from "react"

type AuthContextType = {
    isLoggedIn: Record<string, any> | null
    setIsLoggedIn: (value: Record<string, any> | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<Record<string, any> | null>(null)

    useEffect(() => {
        const user = document.cookie.includes("user=");
        if (user) {
            setIsLoggedIn(JSON.parse(user as unknown as string))
        }
    }, [])

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
