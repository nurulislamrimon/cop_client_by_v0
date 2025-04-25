import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useInView } from "react-intersection-observer"
import { ArrowDown, ArrowUp, TrendingDown, TrendingUp } from "lucide-react"
import { fetcher } from '@/server_actions/fetcher'
import { currency, revalidationTime } from '@/config/constants/common.constants'

export default function YearlyMonthlyFinanceStatistics({ accessToken }: { accessToken?: string }) {
    const [yearlyStats, setYearlyStats] = useState<any>(null);
    const [monthlyStats, setMonthlyStats] = useState<any>(null);

    console.log(yearlyStats);
    console.log(monthlyStats);

    useEffect(() => {
        const fetchStats = async () => {
            const yearly = await fetcher("/dashboard/last-year-statistics", {
                authToken: accessToken,
                revalidate: revalidationTime,
            });

            const monthly = await fetcher("/dashboard/last-month-statistics", {
                authToken: accessToken,
                revalidate: revalidationTime,
            });

            setYearlyStats(yearly?.data);
            setMonthlyStats(monthly?.data);
        };

        fetchStats();
    }, []);

    const [cardsRef, cardsInView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    })

    return (
        <div>
            <motion.div
                ref={cardsRef}
                initial={{ opacity: 0, y: 20 }}
                animate={cardsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <Tabs defaultValue="monthly" className="w-full">
                    <TabsList className="grid w-full max-w-md grid-cols-2">
                        <TabsTrigger value="monthly">Monthly</TabsTrigger>
                        <TabsTrigger value="yearly">Yearly</TabsTrigger>
                    </TabsList>
                    <TabsContent value="monthly" className="mt-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Monthly Financial Summary</CardTitle>
                                <CardDescription>Overview of this month's financial performance</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-muted-foreground">Deposit</span>
                                            <span className="text-sm font-medium text-green-500 flex items-center">
                                                <ArrowUp className="mr-1 h-4 w-4" />
                                                {(monthlyStats?.currentMonth?.Deposit || 0) + currency}
                                            </span>
                                        </div>
                                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                                            <div className="h-full bg-green-500 rounded-full" style={{ width: monthlyStats?.difference?.Deposit || 0 + "%" }}></div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-muted-foreground">Expenses</span>
                                            <span className="text-sm font-medium text-red-500 flex items-center">
                                                <ArrowDown className="mr-1 h-4 w-4" />
                                                {(monthlyStats?.currentMonth?.Expense || 0) + currency}
                                            </span>
                                        </div>
                                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                                            <div className="h-full bg-red-500 rounded-full" style={{ width: monthlyStats?.difference?.Expense || 0 + "%" }}></div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-muted-foreground">Profit</span>
                                            <span className="text-sm font-medium text-blue-500 flex items-center">
                                                <TrendingUp className="mr-1 h-4 w-4" />
                                                {(monthlyStats?.currentMonth?.Profit || 0) + currency}
                                            </span>
                                        </div>
                                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                                            <div className="h-full bg-blue-500 rounded-full" style={{ width: monthlyStats?.difference?.Profit || 0 + "%" }}></div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="yearly" className="mt-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Yearly Financial Summary</CardTitle>
                                <CardDescription>Overview of this year's financial performance</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-muted-foreground">Deposit</span>
                                            <span className="text-sm font-medium text-green-500 flex items-center">
                                                <ArrowUp className="mr-1 h-4 w-4" />
                                                {(yearlyStats?.currentYear?.Deposit || 0) + currency}
                                            </span>
                                        </div>
                                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                                            <div className="h-full bg-green-500 rounded-full" style={{ width: yearlyStats?.difference?.Deposit || 0 + "%" }}></div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-muted-foreground">Expenses</span>
                                            <span className="text-sm font-medium text-red-500 flex items-center">
                                                <ArrowDown className="mr-1 h-4 w-4" />
                                                {(yearlyStats?.currentYear?.Expense || 0) + currency}
                                            </span>
                                        </div>
                                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                                            <div className="h-full bg-red-500 rounded-full" style={{ width: yearlyStats?.difference?.Expense || 0 + "%" }}></div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-muted-foreground">Profit</span>
                                            <span className="text-sm font-medium text-blue-500 flex items-center">
                                                <TrendingUp className="mr-1 h-4 w-4" />
                                                {(yearlyStats?.currentYear?.Profit || 0) + currency}
                                            </span>
                                        </div>
                                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                                            <div className="h-full bg-blue-500 rounded-full" style={{ width: yearlyStats?.difference?.Profit || 0 + "%" }}></div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={cardsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                <Card>
                    <CardHeader>
                        <CardTitle>Monthly Finance Statistics</CardTitle>
                        <CardDescription>Current financial position</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Deposit</span>
                                    <span className="text-sm font-medium">
                                        <small>Last Month -</small> {(monthlyStats?.currentMonth?.Deposit || 0) + currency}
                                        <br />
                                        <small>Prev Month - </small>{(monthlyStats?.previousMonth?.Deposit || 0) + currency}
                                    </span>
                                </div>
                                <div className="h-2 bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 rounded-full" style={{ width: (monthlyStats?.difference?.Deposit || 0) + "%" }}></div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Withdraw</span>
                                    <span className="text-sm font-medium">
                                        <small>Last Month -</small> {(monthlyStats?.currentMonth?.Withdraw || 0) + currency}
                                        <br />
                                        <small>Prev Month - </small>{(monthlyStats?.previousMonth?.Withdraw || 0) + currency}
                                    </span>
                                </div>
                                <div className="h-2 bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-red-500 rounded-full" style={{ width: (monthlyStats?.difference?.Withdraw || 0) + "%" }}></div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Profit</span>
                                    <span className="text-sm font-medium">
                                        <small>Last Month -</small> {(monthlyStats?.currentMonth?.Profit || 0) + currency}
                                        <br />
                                        <small>Prev Month - </small>{(monthlyStats?.previousMonth?.Profit || 0) + currency}
                                    </span>
                                </div>
                                <div className="h-2 bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 rounded-full" style={{ width: (monthlyStats?.difference?.Profit || 0) + "%" }}></div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Lose</span>
                                    <span className="text-sm font-medium">
                                        <small>Last Month -</small> {(monthlyStats?.currentMonth?.Lose || 0) + currency}
                                        <br />
                                        <small>Prev Month - </small>{(monthlyStats?.previousMonth?.Lose || 0) + currency}
                                    </span>
                                </div>
                                <div className="h-2 bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 rounded-full" style={{ width: (monthlyStats?.difference?.Lose || 0) + "%" }}></div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Expense</span>
                                    <span className="text-sm font-medium">
                                        <small>Last Month -</small> {(monthlyStats?.currentMonth?.Expense || 0) + currency}
                                        <br />
                                        <small>Prev Month - </small>{(monthlyStats?.previousMonth?.Expense || 0) + currency}
                                    </span>
                                </div>
                                <div className="h-2 bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 rounded-full" style={{ width: (monthlyStats?.difference?.Lose || 0) + "%" }}></div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Investment</span>
                                    <span className="text-sm font-medium">
                                        <small>Last Month -</small> {(monthlyStats?.currentMonth?.Investment || 0) + currency}
                                        <br />
                                        <small>Prev Month - </small>{(monthlyStats?.previousMonth?.Investment || 0) + currency}
                                    </span>
                                </div>
                                <div className="h-2 bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 rounded-full" style={{ width: (monthlyStats?.difference?.Lose || 0) + "%" }}></div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Yearly Finance Statistics</CardTitle>
                        <CardDescription>Current financial position</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Deposit</span>
                                    <span className="text-sm font-medium">
                                        <small>Last Year -</small> {(yearlyStats?.currentYear?.Deposit || 0) + currency}
                                        <br />
                                        <small>Prev Year - </small>{(yearlyStats?.previousYear?.Deposit || 0) + currency}
                                    </span>
                                </div>
                                <div className="h-2 bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 rounded-full" style={{ width: (yearlyStats?.difference?.Deposit || 0) + "%" }}></div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Withdraw</span>
                                    <span className="text-sm font-medium">
                                        <small>Last Year -</small> {(yearlyStats?.currentYear?.Withdraw || 0) + currency}
                                        <br />
                                        <small>Prev Year - </small>{(yearlyStats?.previousYear?.Withdraw || 0) + currency}
                                    </span>
                                </div>
                                <div className="h-2 bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-red-500 rounded-full" style={{ width: (yearlyStats?.difference?.Withdraw || 0) + "%" }}></div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Profit</span>
                                    <span className="text-sm font-medium">
                                        <small>Last Year -</small> {(yearlyStats?.currentYear?.Profit || 0) + currency}
                                        <br />
                                        <small>Prev Year - </small>{(yearlyStats?.previousYear?.Profit || 0) + currency}
                                    </span>
                                </div>
                                <div className="h-2 bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 rounded-full" style={{ width: (yearlyStats?.difference?.Profit || 0) + "%" }}></div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Lose</span>
                                    <span className="text-sm font-medium">
                                        <small>Last Year -</small> {(yearlyStats?.currentYear?.Lose || 0) + currency}
                                        <br />
                                        <small>Prev Year - </small>{(yearlyStats?.previousYear?.Lose || 0) + currency}
                                    </span>
                                </div>
                                <div className="h-2 bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 rounded-full" style={{ width: (yearlyStats?.difference?.Lose || 0) + "%" }}></div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Expense</span>
                                    <span className="text-sm font-medium">
                                        <small>Last Year -</small> {(yearlyStats?.currentYear?.Expense || 0) + currency}
                                        <br />
                                        <small>Prev Year - </small>{(yearlyStats?.previousYear?.Expense || 0) + currency}
                                    </span>
                                </div>
                                <div className="h-2 bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 rounded-full" style={{ width: (yearlyStats?.difference?.Lose || 0) + "%" }}></div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Investment</span>
                                    <span className="text-sm font-medium">
                                        <small>Last Year -</small> {(yearlyStats?.currentYear?.Investment || 0) + currency}
                                        <br />
                                        <small>Prev Year - </small>{(yearlyStats?.previousYear?.Investment || 0) + currency}
                                    </span>
                                </div>
                                <div className="h-2 bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 rounded-full" style={{ width: (yearlyStats?.difference?.Lose || 0) + "%" }}></div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>


            </motion.div></div>
    )
}
