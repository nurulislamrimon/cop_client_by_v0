"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import PageTransition from "@/components/page-transition"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for profit
const profitData = {
  currentMonth: "$33,200",
  previousMonth: "$29,800",
  yearToDate: "$398,400",
  projectedAnnual: "$450,000",
  monthlyGrowth: "11.4%",
  yearlyGrowth: "12.5%",
  sources: [
    { name: "Membership Fees", amount: "$12,500", percentage: "37.7%" },
    { name: "Investment Returns", amount: "$8,700", percentage: "26.2%" },
    { name: "Service Charges", amount: "$6,200", percentage: "18.7%" },
    { name: "Interest on Loans", amount: "$5,800", percentage: "17.5%" },
  ],
  monthly: [
    { month: "January", amount: "$31,200" },
    { month: "February", amount: "$29,500" },
    { month: "March", amount: "$32,700" },
    { month: "April", amount: "$33,200" },
    { month: "May", amount: "$35,800" },
    { month: "June", amount: "$34,200" },
    { month: "July", amount: "$36,500" },
    { month: "August", amount: "$33,800" },
    { month: "September", amount: "$32,400" },
    { month: "October", amount: "$34,700" },
    { month: "November", amount: "$33,200" },
    { month: "December", amount: "$31,400" },
  ],
}

export default function ProfitPage() {
  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Profit</h1>
          <Button variant="outline">
            <ArrowDown className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: "Current Month",
              value: profitData.currentMonth,
              subtitle: `${profitData.monthlyGrowth} from last month`,
              color: "text-green-500",
            },
            {
              title: "Previous Month",
              value: profitData.previousMonth,
              subtitle: "April 2023",
              color: "text-green-500",
            },
            {
              title: "Year to Date",
              value: profitData.yearToDate,
              subtitle: "January - May 2023",
              color: "text-green-500",
            },
            {
              title: "Projected Annual",
              value: profitData.projectedAnnual,
              subtitle: `${profitData.yearlyGrowth} growth`,
              color: "text-green-500",
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.subtitle}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sources">Profit Sources</TabsTrigger>
            <TabsTrigger value="monthly">Monthly Breakdown</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Profit Overview</CardTitle>
                <CardDescription>Summary of profit performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Monthly Profit Trend</h3>
                    <div className="h-[200px] w-full bg-muted rounded-md flex items-end justify-between p-2">
                      {profitData.monthly.map((month, index) => {
                        const height = Number.parseInt(month.amount.replace(/[^0-9]/g, "")) / 400
                        return (
                          <div key={index} className="flex flex-col items-center">
                            <div
                              className="w-8 bg-primary rounded-t-sm transition-all duration-500"
                              style={{
                                height: `${height}px`,
                                animationDelay: `${index * 0.1}s`,
                              }}
                            ></div>
                            <span className="text-xs mt-1 text-muted-foreground">{month.month.substring(0, 3)}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Key Performance Indicators</h3>
                      <ul className="space-y-4">
                        <li className="flex justify-between items-center">
                          <span className="text-sm">Profit Margin</span>
                          <span className="font-medium">42.3%</span>
                        </li>
                        <li className="flex justify-between items-center">
                          <span className="text-sm">Return on Investment</span>
                          <span className="font-medium">18.5%</span>
                        </li>
                        <li className="flex justify-between items-center">
                          <span className="text-sm">Operating Efficiency</span>
                          <span className="font-medium">76.2%</span>
                        </li>
                        <li className="flex justify-between items-center">
                          <span className="text-sm">Member Growth Rate</span>
                          <span className="font-medium">8.7%</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-4">Profit Distribution</h3>
                      <ul className="space-y-4">
                        <li className="flex justify-between items-center">
                          <span className="text-sm">Member Dividends</span>
                          <span className="font-medium">45%</span>
                        </li>
                        <li className="flex justify-between items-center">
                          <span className="text-sm">Reinvestment</span>
                          <span className="font-medium">30%</span>
                        </li>
                        <li className="flex justify-between items-center">
                          <span className="text-sm">Community Projects</span>
                          <span className="font-medium">15%</span>
                        </li>
                        <li className="flex justify-between items-center">
                          <span className="text-sm">Reserves</span>
                          <span className="font-medium">10%</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="sources" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Profit Sources</CardTitle>
                <CardDescription>Breakdown of profit by source</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {profitData.sources.map((source, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">{source.name}</p>
                            <p className="text-2xl font-bold">{source.amount}</p>
                            <p className="text-sm text-muted-foreground">{source.percentage} of total</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Source</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Percentage</TableHead>
                          <TableHead>YoY Change</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Membership Fees</TableCell>
                          <TableCell>{profitData.sources[0].amount}</TableCell>
                          <TableCell>{profitData.sources[0].percentage}</TableCell>
                          <TableCell className="text-green-500">+5.2%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Investment Returns</TableCell>
                          <TableCell>{profitData.sources[1].amount}</TableCell>
                          <TableCell>{profitData.sources[1].percentage}</TableCell>
                          <TableCell className="text-green-500">+12.8%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Service Charges</TableCell>
                          <TableCell>{profitData.sources[2].amount}</TableCell>
                          <TableCell>{profitData.sources[2].percentage}</TableCell>
                          <TableCell className="text-green-500">+3.5%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Interest on Loans</TableCell>
                          <TableCell>{profitData.sources[3].amount}</TableCell>
                          <TableCell>{profitData.sources[3].percentage}</TableCell>
                          <TableCell className="text-green-500">+7.1%</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="monthly" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Profit Breakdown</CardTitle>
                <CardDescription>Profit figures for each month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Month</TableHead>
                        <TableHead>Profit</TableHead>
                        <TableHead>Change</TableHead>
                        <TableHead>Notes</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {profitData.monthly.map((month, index) => {
                        const prevMonth = index > 0 ? profitData.monthly[index - 1] : null
                        const prevAmount = prevMonth ? Number.parseInt(prevMonth.amount.replace(/[^0-9]/g, "")) : 0
                        const currentAmount = Number.parseInt(month.amount.replace(/[^0-9]/g, ""))
                        const change = prevMonth
                          ? (((currentAmount - prevAmount) / prevAmount) * 100).toFixed(1)
                          : "0.0"
                        const isPositive = Number.parseFloat(change) >= 0

                        return (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{month.month}</TableCell>
                            <TableCell>{month.amount}</TableCell>
                            <TableCell className={isPositive ? "text-green-500" : "text-red-500"}>
                              {isPositive ? "+" : ""}
                              {change}%
                            </TableCell>
                            <TableCell className="text-muted-foreground text-sm">
                              {index === 0 && "New year initiatives"}
                              {index === 3 && "Quarterly dividend payout"}
                              {index === 6 && "Mid-year review, increased rates"}
                              {index === 9 && "New investment returns"}
                              {index === 11 && "Year-end adjustments"}
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  )
}
