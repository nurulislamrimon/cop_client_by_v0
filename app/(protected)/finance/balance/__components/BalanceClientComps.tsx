"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"
import { currency } from "@/constants/common.constants"


export default function BalanceClientComps({ user = {} }: { user: Record<string, any> }) {
    const {
        full_name,
        email,
        phone_number,
        occupation,
        joining_date,
        role,
        profile_photo,
        balance,
        referred_by,
        transaction_snapshot,
    } = user

    const statCards = [
        { label: "Total Deposit", amount: transaction_snapshot?.total_deposit_amount || 0 },
        { label: "Total Withdraw", amount: transaction_snapshot?.total_withdraw_amount || 0 },
        { label: "Total Expense", amount: transaction_snapshot?.total_expense_amount || 0 },
        { label: "Total Invest", amount: transaction_snapshot?.total_investment_amount || 0 },
        { label: "Total Profit", amount: transaction_snapshot?.total_profit_amount || 0 },
        { label: "Total Loss", amount: transaction_snapshot?.total_loss_amount || 0 },
    ]

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8">
            <Card>
                <CardHeader className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                        <AvatarImage src={profile_photo || "/placeholder.svg"} />
                        <AvatarFallback>{full_name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle className="text-xl">{full_name}</CardTitle>
                        <CardDescription>{email}</CardDescription>
                        <div className="mt-1 text-sm text-muted-foreground">{phone_number} • {occupation}</div>
                        <Badge variant="outline" className="mt-2 capitalize">{role}</Badge>
                    </div>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-muted-foreground">Joining Date</p>
                        <p>{new Date(joining_date).toLocaleDateString()}</p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Referred By</p>
                        <p>{referred_by}</p>
                    </div>
                </CardContent>
            </Card>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <Card className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl">
                    <CardContent className="p-6">
                        <h2 className="text-3xl font-bold">Current Balance</h2>
                        <p className="text-5xl mt-2 font-semibold tracking-tight">{balance + currency}</p>
                        <p className="text-sm mt-1 opacity-80">As of today</p>
                    </CardContent>
                </Card>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {statCards.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.05 * index }}
                    >
                        <Card>
                            <CardContent className="p-4">
                                <p className="text-sm text-muted-foreground">{stat.label}</p>
                                <p className="text-2xl font-bold">{stat.amount + currency}</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
