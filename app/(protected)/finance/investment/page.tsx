"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowDown, TrendingUp } from "lucide-react"
import PageTransition from "@/components/page-transition"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for investments
const investmentData = {
  totalInvestments: "$750,000",
  currentReturn: "$58,500",
  returnRate: "7.8%",
  yearlyGrowth: "12.5%",
  portfolios: [
    { name: "Fixed Income", amount: "$300,000", percentage: "40%", return: "5.2%" },
    { name: "Equity", amount: "$225,000", percentage: "30%", return: "11.5%" },
    { name: "Real Estate", amount: "$150,000", percentage: "20%", return: "8.3%" },
    { name: "Alternative", amount: "$75,000", percentage: "10%", return: "9.7%" },
  ],
  investments: [
    { name: "Government Bonds", type: "Fixed Income", amount: "$150,000", return: "4.5%" },
    { name: "Corporate Bonds", type: "Fixed Income", amount: "$150,000", return: "5.8%" },
    { name: "Blue Chip Stocks", type: "Equity", amount: "$125,000", return: "10.2%" },
    { name: "Growth Stocks", type: "Equity", amount: "$100,000", return: "13.1%" },
    { name: "Commercial Property", type: "Real Estate", amount: "$100,000", return: "7.5%" },
    { name: "Residential Property", type: "Real Estate", amount: "$50,000", return: "9.8%" },
    { name: "Private Equity", type: "Alternative", amount: "$45,000", return: "12.3%" },
    { name: "Commodities", type: "Alternative", amount: "$30,000", return: "5.8%" },
  ],
}

export default function InvestmentPage() {
  return (
    <div className="relative w-full">
      <PageTransition>
        <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center">
            <h2
              className="text-4xl md:text-5xl font-bold text-white animate-pulse"
              style={{ filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.75))" }}
            >
              🚧 Coming Soon 🚧
            </h2>
            <p className="mt-2 text-lg text-white/80">We're working hard to bring you more features.</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">Investments</h1>
            <Button variant="outline">
              <ArrowDown className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: "Total Investments",
                value: investmentData.totalInvestments,
                subtitle: `${investmentData.yearlyGrowth} growth`,
                color: "text-blue-500",
              },
              {
                title: "Current Return",
                value: investmentData.currentReturn,
                subtitle: "Annual return",
                color: "text-green-500",
              },
              {
                title: "Return Rate",
                value: investmentData.returnRate,
                subtitle: "Average annual",
                color: "text-emerald-500",
              },
              {
                title: "Portfolio Growth",
                value: investmentData.yearlyGrowth,
                subtitle: "Year over year",
                color: "text-purple-500",
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
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="investments">Investments</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Investment Overview</CardTitle>
                  <CardDescription>Summary of investment performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Portfolio Allocation</h3>
                      <div className="h-[200px] w-full bg-muted rounded-md flex items-end justify-between p-2">
                        {investmentData.portfolios.map((portfolio, index) => {
                          const height = Number.parseInt(portfolio.percentage.replace("%", "")) * 2
                          return (
                            <div key={index} className="flex flex-col items-center">
                              <div
                                className={`w-16 rounded-t-sm transition-all duration-500 ${index === 0
                                  ? "bg-blue-500"
                                  : index === 1
                                    ? "bg-green-500"
                                    : index === 2
                                      ? "bg-amber-500"
                                      : "bg-purple-500"
                                  }`}
                                style={{
                                  height: `${height}px`,
                                  animationDelay: `${index * 0.1}s`,
                                }}
                              ></div>
                              <span className="text-xs mt-1 text-muted-foreground">{portfolio.name}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Investment Performance</h3>
                        <ul className="space-y-4">
                          <li className="flex justify-between items-center">
                            <span className="text-sm">1 Year Return</span>
                            <span className="font-medium text-green-500">7.8%</span>
                          </li>
                          <li className="flex justify-between items-center">
                            <span className="text-sm">3 Year Return</span>
                            <span className="font-medium text-green-500">22.5%</span>
                          </li>
                          <li className="flex justify-between items-center">
                            <span className="text-sm">5 Year Return</span>
                            <span className="font-medium text-green-500">38.2%</span>
                          </li>
                          <li className="flex justify-between items-center">
                            <span className="text-sm">Since Inception</span>
                            <span className="font-medium text-green-500">65.7%</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-4">Investment Strategy</h3>
                        <ul className="space-y-4">
                          <li className="flex justify-between items-center">
                            <span className="text-sm">Risk Profile</span>
                            <span className="font-medium">Moderate</span>
                          </li>
                          <li className="flex justify-between items-center">
                            <span className="text-sm">Time Horizon</span>
                            <span className="font-medium">Long-term</span>
                          </li>
                          <li className="flex justify-between items-center">
                            <span className="text-sm">Rebalancing</span>
                            <span className="font-medium">Quarterly</span>
                          </li>
                          <li className="flex justify-between items-center">
                            <span className="text-sm">Target Return</span>
                            <span className="font-medium">8.5%</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="portfolio" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio Allocation</CardTitle>
                  <CardDescription>Breakdown of investment portfolio</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {investmentData.portfolios.map((portfolio, index) => (
                        <Card key={index}>
                          <CardContent className="p-4">
                            <div className="space-y-1">
                              <p className="text-sm font-medium text-muted-foreground">{portfolio.name}</p>
                              <p className="text-2xl font-bold">{portfolio.amount}</p>
                              <div className="flex justify-between">
                                <p className="text-sm text-muted-foreground">{portfolio.percentage} of total</p>
                                <p className="text-sm font-medium text-green-500 flex items-center">
                                  <TrendingUp className="mr-1 h-3 w-3" />
                                  {portfolio.return}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Portfolio</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Allocation</TableHead>
                            <TableHead>Return</TableHead>
                            <TableHead>YoY Change</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {investmentData.portfolios.map((portfolio, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{portfolio.name}</TableCell>
                              <TableCell>{portfolio.amount}</TableCell>
                              <TableCell>{portfolio.percentage}</TableCell>
                              <TableCell className="text-green-500">{portfolio.return}</TableCell>
                              <TableCell className="text-green-500">
                                {index === 0 ? "+3.2%" : index === 1 ? "+15.8%" : index === 2 ? "+7.5%" : "+9.2%"}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="investments" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Individual Investments</CardTitle>
                  <CardDescription>Details of all investment holdings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Investment</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Return</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {investmentData.investments.map((investment, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{investment.name}</TableCell>
                            <TableCell>{investment.type}</TableCell>
                            <TableCell>{investment.amount}</TableCell>
                            <TableCell className="text-green-500">{investment.return}</TableCell>
                            <TableCell>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${Number.parseFloat(investment.return.replace("%", "")) > 8
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                                  : Number.parseFloat(investment.return.replace("%", "")) > 5
                                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                                    : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100"
                                  }`}
                              >
                                {Number.parseFloat(investment.return.replace("%", "")) > 8
                                  ? "Outperforming"
                                  : Number.parseFloat(investment.return.replace("%", "")) > 5
                                    ? "On Target"
                                    : "Underperforming"}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </PageTransition>
    </div>
  )
}
