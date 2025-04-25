"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowDown, Plus } from "lucide-react"
import PageTransition from "@/components/page-transition"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for expenses
const expenseData = {
  currentMonth: "$45,300",
  previousMonth: "$43,800",
  yearToDate: "$543,600",
  projectedAnnual: "$650,000",
  monthlyChange: "+3.4%",
  yearlyChange: "+5.2%",
  categories: [
    { name: "Operational", amount: "$18,120", percentage: "40%" },
    { name: "Administrative", amount: "$13,590", percentage: "30%" },
    { name: "Salaries", amount: "$9,060", percentage: "20%" },
    { name: "Marketing", amount: "$4,530", percentage: "10%" },
  ],
  expenses: [
    { id: "1", date: "2023-05-15", category: "Operational", description: "Office Rent", amount: "$5,200" },
    { id: "2", date: "2023-05-12", category: "Operational", description: "Utilities", amount: "$1,800" },
    { id: "3", date: "2023-05-10", category: "Administrative", description: "Software Licenses", amount: "$3,500" },
    { id: "4", date: "2023-05-08", category: "Salaries", description: "Staff Payroll", amount: "$9,060" },
    { id: "5", date: "2023-05-05", category: "Marketing", description: "Digital Advertising", amount: "$2,200" },
    { id: "6", date: "2023-05-03", category: "Operational", description: "Equipment Maintenance", amount: "$1,500" },
    { id: "7", date: "2023-05-01", category: "Administrative", description: "Insurance", amount: "$4,800" },
    { id: "8", date: "2023-04-28", category: "Operational", description: "Office Supplies", amount: "$950" },
    { id: "9", date: "2023-04-25", category: "Marketing", description: "Event Sponsorship", amount: "$2,330" },
    { id: "10", date: "2023-04-22", category: "Administrative", description: "Legal Services", amount: "$5,290" },
  ],
}

export default function ExpensePage() {
  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Expenses</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Expense
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: "Current Month",
              value: expenseData.currentMonth,
              subtitle: `${expenseData.monthlyChange} from last month`,
              color: "text-red-500",
            },
            {
              title: "Previous Month",
              value: expenseData.previousMonth,
              subtitle: "April 2023",
              color: "text-red-500",
            },
            {
              title: "Year to Date",
              value: expenseData.yearToDate,
              subtitle: "January - May 2023",
              color: "text-red-500",
            },
            {
              title: "Projected Annual",
              value: expenseData.projectedAnnual,
              subtitle: `${expenseData.yearlyChange} from last year`,
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

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="all">All Expenses</TabsTrigger>
            <TabsTrigger value="new">New Expense</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Expense History</CardTitle>
                <CardDescription>View all recent expenses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {expenseData.expenses.map((expense) => (
                        <TableRow key={expense.id}>
                          <TableCell>{expense.date}</TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                expense.category === "Operational"
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                                  : expense.category === "Administrative"
                                    ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
                                    : expense.category === "Salaries"
                                      ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100"
                                      : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                              }`}
                            >
                              {expense.category}
                            </span>
                          </TableCell>
                          <TableCell>{expense.description}</TableCell>
                          <TableCell className="text-right font-medium">{expense.amount}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="flex justify-end mt-4">
                  <Button variant="outline">
                    <ArrowDown className="mr-2 h-4 w-4" />
                    Export CSV
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="new" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>New Expense</CardTitle>
                <CardDescription>Record a new expense</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="operational">Operational</SelectItem>
                          <SelectItem value="administrative">Administrative</SelectItem>
                          <SelectItem value="salaries">Salaries</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                        <Input id="amount" type="text" placeholder="0.00" className="pl-7" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input id="date" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="payment-method">Payment Method</Label>
                      <Select>
                        <SelectTrigger id="payment-method">
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                          <SelectItem value="credit-card">Credit Card</SelectItem>
                          <SelectItem value="cash">Cash</SelectItem>
                          <SelectItem value="check">Check</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="description">Description</Label>
                      <Input id="description" placeholder="Expense description" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="notes">Notes</Label>
                      <Input id="notes" placeholder="Additional information" />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button>Submit Expense</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="categories" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Expense Categories</CardTitle>
                <CardDescription>Breakdown of expenses by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {expenseData.categories.map((category, index) => (
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

                  <div className="h-[200px] w-full bg-muted rounded-md flex items-end justify-around p-2">
                    {expenseData.categories.map((category, index) => {
                      const height = Number.parseInt(category.percentage.replace("%", "")) * 2
                      return (
                        <div key={index} className="flex flex-col items-center">
                          <div
                            className={`w-16 rounded-t-sm transition-all duration-500 ${
                              index === 0
                                ? "bg-blue-500"
                                : index === 1
                                  ? "bg-purple-500"
                                  : index === 2
                                    ? "bg-amber-500"
                                    : "bg-green-500"
                            }`}
                            style={{
                              height: `${height}px`,
                              animationDelay: `${index * 0.1}s`,
                            }}
                          ></div>
                          <span className="text-xs mt-1 text-muted-foreground">{category.name}</span>
                        </div>
                      )
                    })}
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
