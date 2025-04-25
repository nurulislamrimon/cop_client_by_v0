"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowDown, ArrowUp, DollarSign, TrendingDown, TrendingUp } from "lucide-react"
import PageTransition from "@/components/page-transition"
import { useInView } from "react-intersection-observer"

// Mock data for financial overview
const financialData = {
  totalAssets: "$1,245,600",
  totalLiabilities: "$345,200",
  netWorth: "$900,400",
  monthlyIncome: "$78,500",
  monthlyExpenses: "$45,300",
  monthlyProfit: "$33,200",
  yearlyProfit: "$398,400",
  yearlyGrowth: "12.5%",
}

export default function FinanceOverviewPage() {
  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [cardsRef, cardsInView] = useInView({
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
              title: "Total Assets",
              value: financialData.totalAssets,
              icon: DollarSign,
              color: "text-green-500",
              bgColor: "bg-green-100 dark:bg-green-900",
            },
            {
              title: "Net Worth",
              value: financialData.netWorth,
              icon: TrendingUp,
              color: "text-blue-500",
              bgColor: "bg-blue-100 dark:bg-blue-900",
            },
            {
              title: "Monthly Profit",
              value: financialData.monthlyProfit,
              icon: ArrowUp,
              color: "text-emerald-500",
              bgColor: "bg-emerald-100 dark:bg-emerald-900",
            },
            {
              title: "Yearly Growth",
              value: financialData.yearlyGrowth,
              icon: TrendingUp,
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
                        <span className="text-sm font-medium text-muted-foreground">Income</span>
                        <span className="text-sm font-medium text-green-500 flex items-center">
                          <ArrowUp className="mr-1 h-4 w-4" />
                          {financialData.monthlyIncome}
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: "75%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground">Expenses</span>
                        <span className="text-sm font-medium text-red-500 flex items-center">
                          <ArrowDown className="mr-1 h-4 w-4" />
                          {financialData.monthlyExpenses}
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-red-500 rounded-full" style={{ width: "45%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground">Profit</span>
                        <span className="text-sm font-medium text-blue-500 flex items-center">
                          <TrendingUp className="mr-1 h-4 w-4" />
                          {financialData.monthlyProfit}
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: "30%" }}></div>
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
                        <span className="text-sm font-medium text-muted-foreground">Income</span>
                        <span className="text-sm font-medium text-green-500 flex items-center">
                          <ArrowUp className="mr-1 h-4 w-4" />
                          $942,000
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: "80%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground">Expenses</span>
                        <span className="text-sm font-medium text-red-500 flex items-center">
                          <ArrowDown className="mr-1 h-4 w-4" />
                          $543,600
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-red-500 rounded-full" style={{ width: "50%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground">Profit</span>
                        <span className="text-sm font-medium text-blue-500 flex items-center">
                          <TrendingUp className="mr-1 h-4 w-4" />
                          {financialData.yearlyProfit}
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: "35%" }}></div>
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
              <CardTitle>Assets vs Liabilities</CardTitle>
              <CardDescription>Current financial position</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Assets</span>
                    <span className="text-sm font-medium">{financialData.totalAssets}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: "100%" }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Liabilities</span>
                    <span className="text-sm font-medium">{financialData.totalLiabilities}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 rounded-full" style={{ width: "28%" }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Net Worth</span>
                    <span className="text-sm font-medium">{financialData.netWorth}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: "72%" }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Growth Trends</CardTitle>
              <CardDescription>Year-over-year performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Assets Growth</span>
                  <span className="text-sm font-medium text-green-500 flex items-center">
                    <TrendingUp className="mr-1 h-4 w-4" />
                    15.3%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Membership Growth</span>
                  <span className="text-sm font-medium text-green-500 flex items-center">
                    <TrendingUp className="mr-1 h-4 w-4" />
                    8.7%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Revenue Growth</span>
                  <span className="text-sm font-medium text-green-500 flex items-center">
                    <TrendingUp className="mr-1 h-4 w-4" />
                    12.5%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Expense Growth</span>
                  <span className="text-sm font-medium text-red-500 flex items-center">
                    <TrendingDown className="mr-1 h-4 w-4" />
                    5.2%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </PageTransition>
  )
}
