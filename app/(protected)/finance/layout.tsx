"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const financeLinks = [
  { name: "Overview", path: "/finance" },
  { name: "Deposit", path: "/finance/deposit" },
  { name: "Withdraw", path: "/finance/withdraw" },
  { name: "Profit", path: "/finance/profit" },
  { name: "Loss", path: "/finance/loss" },
  { name: "Expense", path: "/finance/expense" },
  { name: "Balance", path: "/finance/balance" },
  { name: "Investment", path: "/finance/investment" },
  { name: "Profile", path: "/profile" },
]

export default function FinanceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <div className="space-y-6">
      <div className="border-b">
        <nav className="flex overflow-x-auto py-4">
          <ul className="flex min-w-full flex-none gap-2 px-1">
            {financeLinks.map((link) => (
              <li key={link.path}>
                <Link href={link.path}>
                  <div className="relative">
                    <div
                      className={cn(
                        "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        pathname === link.path ? "text-primary" : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {link.name}
                    </div>
                    {pathname === link.path && (
                      <motion.div
                        layoutId="finance-tab-indicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {children}
    </div>
  )
}
