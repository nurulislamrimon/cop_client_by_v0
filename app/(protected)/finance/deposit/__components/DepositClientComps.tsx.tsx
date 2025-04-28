"use client"

import { useEffect, useState } from "react"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"
import PageTransition from "@/components/page-transition"
import { fetcher } from "@/server_actions/fetcher"
import { currency } from "@/constants/common.constants"
import Link from "next/link"
import { useRouter } from "next/navigation"
type Deposit = {
  id: number
  amount: number
  collected_at: string
  member_id: number
  member: { full_name: string }
  trx_type: string
  note: string | null
}

export default function DepositClientComps({ accessToken }: { accessToken?: string }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortType, setSortType] = useState("recent")
  const [deposits, setDeposits] = useState<Deposit[]>([])
  const [loading, setLoading] = useState(true)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const router = useRouter()

  useEffect(() => {
    const getDeposits = async () => {
      setLoading(true)

      let query = `/transaction?trx_type=Deposit`

      if (sortType === "amountasc") {
        query += "&sortBy=amount&&sortOrder=asc"
      } else if (sortType === "amountdesc") {
        query += "&sortBy=amount&&sortOrder=desc"
      }

      if (searchQuery) {
        query += "&searchTerm=" + searchQuery
      }

      if (startDate) {
        query += "&collected_at[gt]=" + startDate
      }

      if (endDate) {
        query += "&collected_at[lt]=" + endDate
      }

      const data = await fetcher(query, { authToken: accessToken })

      setDeposits(data?.data || [])
      setLoading(false)
    }

    getDeposits()
  }, [accessToken, sortType, searchQuery, startDate, endDate])

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Deposits</h1>
          <Link href="/add/transaction">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Deposit
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsContent value="all" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Deposit History</CardTitle>
                <CardDescription>View all deposits made by members</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="relative flex-1 min-w-[200px]">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search deposits..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>

                    <Select value={sortType} onValueChange={setSortType}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sorting" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recent">Recent</SelectItem>
                        <SelectItem value="amountasc">Amount (Low-High)</SelectItem>
                        <SelectItem value="amountdesc">Amount (High-Low)</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="flex gap-2 items-center">
                      <Input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-[150px]"
                      />
                      <span>to</span>
                      <Input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-[150px]"
                      />
                    </div>
                  </div>

                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Member</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Note</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {loading ? (
                          <TableRow>
                            <TableCell colSpan={5} className="h-24 text-center">
                              Loading deposits...
                            </TableCell>
                          </TableRow>
                        ) : deposits.length > 0 ? (
                          deposits.map((deposit) => (
                            <TableRow
                              key={deposit.id}
                              className="group relative"
                            >
                              <TableCell>{new Date(deposit.collected_at).toDateString()}</TableCell>
                              <TableCell>{deposit?.member?.full_name}</TableCell>
                              <TableCell className="font-medium">{(deposit.amount.toFixed(2)) + currency}</TableCell>
                              <TableCell>{deposit.note || "-"}</TableCell>
                              <TableCell className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => router.push(`/edit/transaction/${deposit.id}`)}
                                >
                                  Edit
                                </Button>
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
        </Tabs>
      </div>
    </PageTransition>
  )
}
