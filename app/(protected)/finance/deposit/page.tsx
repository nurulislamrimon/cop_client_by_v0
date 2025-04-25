"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, ArrowDown, Calendar, Search } from "lucide-react"
import PageTransition from "@/components/page-transition"

// Mock data for deposits
const deposits = [
  { id: "1", date: "2023-04-15", member: "John Smith", amount: "$2,500.00", type: "Cash", status: "Completed" },
  {
    id: "2",
    date: "2023-04-12",
    member: "Sarah Johnson",
    amount: "$1,200.00",
    type: "Bank Transfer",
    status: "Completed",
  },
  { id: "3", date: "2023-04-10", member: "Michael Brown", amount: "$3,000.00", type: "Check", status: "Completed" },
  { id: "4", date: "2023-04-08", member: "Emily Davis", amount: "$500.00", type: "Cash", status: "Completed" },
  {
    id: "5",
    date: "2023-04-05",
    member: "Robert Wilson",
    amount: "$1,800.00",
    type: "Bank Transfer",
    status: "Completed",
  },
  { id: "6", date: "2023-04-03", member: "Jennifer Lee", amount: "$1,000.00", type: "Cash", status: "Completed" },
  { id: "7", date: "2023-04-01", member: "David Martinez", amount: "$2,200.00", type: "Check", status: "Completed" },
  {
    id: "8",
    date: "2023-03-28",
    member: "Lisa Anderson",
    amount: "$750.00",
    type: "Bank Transfer",
    status: "Completed",
  },
  { id: "9", date: "2023-03-25", member: "James Taylor", amount: "$1,500.00", type: "Cash", status: "Completed" },
  {
    id: "10",
    date: "2023-03-22",
    member: "Patricia Moore",
    amount: "$3,500.00",
    type: "Bank Transfer",
    status: "Completed",
  },
]

export default function DepositPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredDeposits = deposits.filter(
    (deposit) =>
      deposit.member.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deposit.amount.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deposit.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Deposits</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Deposit
          </Button>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="all">All Deposits</TabsTrigger>
            <TabsTrigger value="new">New Deposit</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Deposit History</CardTitle>
                <CardDescription>View all deposits made by members</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search deposits..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="bank">Bank Transfer</SelectItem>
                        <SelectItem value="check">Check</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon">
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Member</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredDeposits.length > 0 ? (
                          filteredDeposits.map((deposit) => (
                            <TableRow key={deposit.id}>
                              <TableCell>{deposit.date}</TableCell>
                              <TableCell>{deposit.member}</TableCell>
                              <TableCell className="font-medium">{deposit.amount}</TableCell>
                              <TableCell>{deposit.type}</TableCell>
                              <TableCell>
                                <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                                  {deposit.status}
                                </span>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={5} className="h-24 text-center">
                              No deposits found.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="new" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>New Deposit</CardTitle>
                <CardDescription>Record a new deposit from a member</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="member">Member</Label>
                      <Select>
                        <SelectTrigger id="member">
                          <SelectValue placeholder="Select member" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="john">John Smith</SelectItem>
                          <SelectItem value="sarah">Sarah Johnson</SelectItem>
                          <SelectItem value="michael">Michael Brown</SelectItem>
                          <SelectItem value="emily">Emily Davis</SelectItem>
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
                      <Label htmlFor="type">Deposit Type</Label>
                      <Select>
                        <SelectTrigger id="type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cash">Cash</SelectItem>
                          <SelectItem value="bank">Bank Transfer</SelectItem>
                          <SelectItem value="check">Check</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input id="date" type="date" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="notes">Notes</Label>
                      <Input id="notes" placeholder="Additional information" />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button>Submit Deposit</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reports" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Deposit Reports</CardTitle>
                <CardDescription>Generate and view deposit reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="start-date">Start Date</Label>
                      <Input id="start-date" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="end-date">End Date</Label>
                      <Input id="end-date" type="date" />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">
                      <ArrowDown className="mr-2 h-4 w-4" />
                      Export CSV
                    </Button>
                    <Button>Generate Report</Button>
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
