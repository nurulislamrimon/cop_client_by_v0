"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowDown, ArrowUp, DollarSign, TrendingUp } from "lucide-react"
import PageTransition from "@/components/page-transition"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for balance
const balanceData = {
  totalAssets: "$1,245,600",
  totalLiabilities: "$345,200",
  netWorth: "$900,400",
  cashOnHand: "$125,000",
  investments: "$750,000",
  loans: "$320,000",
  property: "$370,600",
  accounts: [
    { name: "Operating Account", balance: "$125,000", type: "Cash" },
    { name: "Investment Fund A", balance: "$350,000", type: "Investment" },
    { name: "Investment Fund B", balance: "$400,000", type: "Investment" },
    { name: "Property Assets", balance: "$370,600", type: "Property" },
    { name: "Member Loans", balance: "$320,000", type: "Liability" },
    { name: "Other Liabilities", balance: "$25,200", type: "Liability" },
  ],
}

export default function BalancePage() {
  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Balance Sheet</h1>
          <Button variant="outline">
            <ArrowDown className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: "Total Assets",
              value: balanceData.totalAssets,
              icon: DollarSign,
              color: "text-green-500",
              bgColor: "bg-green-100 dark:bg-green-900",
            },
            {
              title: "Total Liabilities",
              value: balanceData.totalLiabilities,
              icon: ArrowDown,
              color: "text-red-500",
              bgColor: "bg-red-100 dark:bg-red-900",
            },
            {
              title: "Net Worth",
              value: balanceData.netWorth,
              icon: TrendingUp,
              color: "text-blue-500",
              bgColor: "bg-blue-100 dark:bg-blue-900",
            },
            {
              title: "Cash on Hand",
              value: balanceData.cashOnHand,
              icon: ArrowUp,
              color: "text-emerald-500",
              bgColor: "bg-emerald-100 dark:bg-emerald-900",
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
        </div>

        <Tabs defaultValue="summary" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="assets">Assets</TabsTrigger>
            <TabsTrigger value="liabilities">Liabilities</TabsTrigger>
          </TabsList>
          <TabsContent value="summary" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Balance Summary</CardTitle>
                <CardDescription>Overview of all accounts and balances</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Account</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead className="text-right">Balance</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {balanceData.accounts.map((account, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{account.name}</TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                account.type === "Liability"
                                  ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                                  : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                              }`}
                            >
                              {account.type}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">{account.balance}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="assets" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Asset Breakdown</CardTitle>
                <CardDescription>Detailed view of all assets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Cash</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">{balanceData.cashOnHand}</p>
                        <p className="text-sm text-muted-foreground">10% of total assets</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Investments</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">{balanceData.investments}</p>
                        <p className="text-sm text-muted-foreground">60% of total assets</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Property</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">{balanceData.property}</p>
                        <p className="text-sm text-muted-foreground">30% of total assets</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Asset</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead className="text-right">Value</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {balanceData.accounts
                          .filter((account) => account.type !== "Liability")
                          .map((account, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{account.name}</TableCell>
                              <TableCell>{account.type}</TableCell>
                              <TableCell className="text-right">{account.balance}</TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="liabilities" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Liability Breakdown</CardTitle>
                <CardDescription>Detailed view of all liabilities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Member Loans</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">{balanceData.loans}</p>
                        <p className="text-sm text-muted-foreground">93% of total liabilities</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Other Liabilities</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">$25,200</p>
                        <p className="text-sm text-muted-foreground">7% of total liabilities</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Liability</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {balanceData.accounts
                          .filter((account) => account.type === "Liability")
                          .map((account, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{account.name}</TableCell>
                              <TableCell>{account.type}</TableCell>
                              <TableCell className="text-right">{account.balance}</TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  )
}
