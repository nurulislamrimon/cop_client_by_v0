'use client'

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowDown, ArrowUp, Banknote } from "lucide-react"
import PageTransition from "@/components/page-transition"
import { useInView } from "react-intersection-observer"
import YearlyMonthlyFinanceStatistics from "./YearlyMonthlyFinanceStatistics"
import { Suspense } from "react"
import { currency } from "@/constants/common.constants"

export default function FinanceOverviewPageClientComps({ balance, statistics, accessToken }: { balance?: number; statistics?: Record<string, number>, accessToken?: string }) {

  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Financial Overview</h1>
        </div>

        <motion.div
          ref={statsRef}
          initial={{ opacity: 0 }}
          animate={statsInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            {
              title: "Present Balance",
              value: balance + currency,
              icon: Banknote,
              color: "text-green-500",
              bgColor: "bg-green-100 dark:bg-green-900",
            },
            {
              title: "Total Deposit",
              value: statistics?.total_deposit_amount || 0 + currency,
              icon: ArrowUp,
              color: "text-blue-500",
              bgColor: "bg-blue-100 dark:bg-blue-900",
            },
            {
              title: "Total Withdraw",
              value: statistics?.total_withdraw_amount || 0 + currency,
              icon: ArrowDown,
              color: "text-red-500",
              bgColor: "bg-red-200 dark:bg-emerald-900",
            },
            {
              title: "Total Profit",
              value: statistics?.total_profit_amount || 0 + currency,
              icon: ArrowUp,
              color: "text-purple-500",
              bgColor: "bg-purple-100 dark:bg-purple-900",
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-full ${stat.bgColor}`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        <Suspense>
          <YearlyMonthlyFinanceStatistics accessToken={accessToken} />
        </Suspense>
      </div>
    </PageTransition>
  )
}
