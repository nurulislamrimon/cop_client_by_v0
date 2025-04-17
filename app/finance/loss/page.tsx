"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import PageTransition from "@/components/page-transition"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for losses
const lossData = {
  currentMonth: "$12,800",
  previousMonth: "$14,200",
  yearToDate: "$152,400",
  projectedAnnual: "$175,000",
  monthlyChange: "-9.9%",
  yearlyChange: "-5.2%",
  categories: [
    { name: "Operating Expenses", amount: "$5,200", percentage: "40.6%" },
    { name: "Bad Loans", amount: "$3,800", percentage: "29.7%" },
    { name: "Administrative Costs", amount: "$2,400", percentage: "18.8%" },
    { name: "Other Expenses", amount: "$1,400", percentage: "10.9%" },
  ],
  monthly: [
    { month: "January", amount: "$13,500" },
    { month: "February", amount: "$12,800" },
    { month: "March", amount: "$14,200" },
    { month: "April", amount: "$14,200" },
    { month: "May", amount: "$12,800" },
    { month: "June", amount: "$13,100" },
    { month: "July", amount: "$12,500" },
    { month: "August", amount: "$13,800" },
    { month: "September", amount: "$12,200" },
    { month: "October", amount: "$11,800" },
    { month: "November", amount: "$10,900" },
    { month: "December", amount: "$10,600" },
  ],
}

export default function LossPage() {
  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Loss</h1>
          <Button variant="outline">
            <ArrowDown className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: "Current Month",
              value: lossData.currentMonth,
              subtitle: `${lossData.monthlyChange} from last month`,
              color: "text-red-500",
            },
            {
              title: "Previous Month",
              value: lossData.previousMonth,
              subtitle: "April 2023",
              color: "text-red-500",
            },
            {
              title: "Year to Date",
              value: lossData.yearToDate,
              subtitle: "January - May 2023",
              color: "text-red-500",
            },
            {
              title: "Projected Annual",
              value: lossData.projectedAnnual,
              subtitle: `${lossData.yearlyChange} from last year`,
              color: "text-red-500",
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
            <TabsTrigger value="categories">Loss Categories</TabsTrigger>
            <TabsTrigger value="monthly">Monthly Breakdown</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Loss Overview</CardTitle>
                <CardDescription>Summary of loss performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Monthly Loss Trend</h3>
                    <div className="h-[200px] w-full bg-muted rounded-md flex items-end justify-between p-2">
                      {lossData.monthly.map((month, index) => {
                        const height = Number.parseInt(month.amount.replace(/[^0-9]/g, "")) / 150
                        return (
                          <div key={index} className="flex flex-col items-center">
                            <div
                              className="w-8 bg-red-500 rounded-t-sm transition-all duration-500"
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
                      <h3 className="text-lg font-medium mb-4">Loss Metrics</h3>
                      <ul className="space-y-4">
                        <li className="flex justify-between items-center">
                          <span className="text-sm">Loss Ratio</span>
                          <span className="font-medium">16.3%</span>
                        </li>
                        <li className="flex justify-between items-center">
                          <span className="text-sm">Expense Ratio</span>
                          <span className="font-medium">12.5%</span>
                        </li>
                        <li className="flex justify-between items-center">
                          <span className="text-sm">Bad Loan Percentage</span>
                          <span className="font-medium">3.2%</span>
                        </li>
                        <li className="flex justify-between items-center">
                          <span className="text-sm">Operating Cost Ratio</span>
                          <span className="font-medium">8.7%</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-4">Loss Mitigation Strategies</h3>
                      <ul className="space-y-4">
                        <li className="flex justify-between items-center">
                          <span className="text-sm">Cost Reduction Plan</span>
                          <span className="font-medium text-green-500">In Progress</span>
                        </li>
                        <li className="flex justify-between items-center">
                          <span className="text-sm">Loan Review Process</span>
                          <span className="font-medium text-green-500">Implemented</span>
                        </li>
                        <li className="flex justify-between items-center">
                          <span className="text-sm">Operational Efficiency</span>
                          <span className="font-medium text-amber-500">Under Review</span>
                        </li>
                        <li className="flex justify-between items-center">
                          <span className="text-sm">Digital Transformation</span>
                          <span className="font-medium text-blue-500">Planned</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="categories" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Loss Categories</CardTitle>
                <CardDescription>Breakdown of losses by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {lossData.categories.map((category, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">{category.name}</p>
                            <p className="text-2xl font-bold">{category.amount}</p>
                            <p className="text-sm text-muted-foreground">{category.percentage} of total</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Category</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Percentage</TableHead>
                          <TableHead>YoY Change</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Operating Expenses</TableCell>
                          <TableCell>{lossData.categories[0].amount}</TableCell>
                          <TableCell>{lossData.categories[0].percentage}</TableCell>
                          <TableCell className="text-red-500">+2.3%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Bad Loans</TableCell>
                          <TableCell>{lossData.categories[1].amount}</TableCell>
                          <TableCell>{lossData.categories[1].percentage}</TableCell>
                          <TableCell className="text-green-500">-8.5%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Administrative Costs</TableCell>
                          <TableCell>{lossData.categories[2].amount}</TableCell>
                          <TableCell>{lossData.categories[2].percentage}</TableCell>
                          <TableCell className="text-red-500">+1.2%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Other Expenses</TableCell>
                          <TableCell>{lossData.categories[3].amount}</TableCell>
                          <TableCell>{lossData.categories[3].percentage}</TableCell>
                          <TableCell className="text-green-500">-3.7%</TableCell>
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
                <CardTitle>Monthly Loss Breakdown</CardTitle>
                <CardDescription>Loss figures for each month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Month</TableHead>
                        <TableHead>Loss</TableHead>
                        <TableHead>Change</TableHead>
                        <TableHead>Notes</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {lossData.monthly.map((month, index) => {
                        const prevMonth = index > 0 ? lossData.monthly[index - 1] : null
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
                            <TableCell className={isPositive ? "text-red-500" : "text-green-500"}>
                              {isPositive ? "+" : ""}
                              {change}%
                            </TableCell>
                            <TableCell className="text-muted-foreground text-sm">
                              {index === 0 && "Annual maintenance costs"}
                              {index === 2 && "Quarterly tax payments"}
                              {index === 4 && "Reduced operating expenses"}
                              {index === 7 && "Increased utility costs"}
                              {index === 9 && "Cost-cutting measures implemented"}
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
