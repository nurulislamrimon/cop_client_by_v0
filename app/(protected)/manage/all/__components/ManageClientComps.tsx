"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import PageTransition from "@/components/page-transition";
import { fetcher } from "@/server_actions/fetcher";
import { currency } from "@/constants/common.constants";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Transaction = {
  id: number;
  amount: number;
  collected_at: string;
  member_id: number;
  member: { full_name: string };
  trx_type: string;
  note: string | null;
};

export default function ManageClientComps({
  accessToken,
}: {
  accessToken?: string;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortType, setSortType] = useState("recent");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [trxType, setTrxType] = useState("");
  const [memberId, setMemberId] = useState("");
  const router = useRouter();

  useEffect(() => {
    const getTransactions = async () => {
      setLoading(true);

      let query = `/transaction/by-admin?`;

      if (sortType === "amountasc") {
        query += "&sortBy=amount&sortOrder=asc";
      } else if (sortType === "amountdesc") {
        query += "&sortBy=amount&sortOrder=desc";
      } else {
        query += "&sortBy=collected_at&sortOrder=desc";
      }

      if (searchQuery) {
        query += "&searchTerm=" + searchQuery;
      }

      if (startDate) {
        query += "&collected_at[gt]=" + startDate;
      }

      if (endDate) {
        query += "&collected_at[lt]=" + endDate;
      }

      if (trxType && trxType !== "all") {
        query += "&trx_type=" + trxType;
      }

      if (memberId) {
        query += "&member_id=" + memberId;
      }

      const data = await fetcher(query, { authToken: accessToken });

      setTransactions(data?.data || []);
      setLoading(false);
    };

    getTransactions();
  }, [
    accessToken,
    sortType,
    searchQuery,
    startDate,
    endDate,
    trxType,
    memberId,
  ]);

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Transactions</h1>
          <Link href="/add/transaction">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Transaction
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsContent value="all" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>
                  View all transactions made by members
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Filters */}
                  <div className="flex items-center gap-4 flex-wrap">
                    {/* Search */}
                    <div className="relative flex-1 min-w-[200px]">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search transactions..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>

                    {/* Sorting */}
                    <Select value={sortType} onValueChange={setSortType}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sorting" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recent">Recent</SelectItem>
                        <SelectItem value="amountasc">
                          Amount (Low-High)
                        </SelectItem>
                        <SelectItem value="amountdesc">
                          Amount (High-Low)
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Transaction Type Filter */}
                    <Select value={trxType} onValueChange={setTrxType}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>{" "}
                        {/* <== NOT empty string */}
                        <SelectItem value="Deposit">Deposit</SelectItem>
                        <SelectItem value="Withdraw">Withdraw</SelectItem>
                        <SelectItem value="Profit">Profit</SelectItem>
                        <SelectItem value="Loss">Loss</SelectItem>
                        <SelectItem value="Expense">Expense</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Member ID filter */}
                    <Input
                      type="number"
                      placeholder="Member ID"
                      className="w-[150px]"
                      value={memberId}
                      onChange={(e) => setMemberId(e.target.value)}
                    />

                    {/* Date Range */}
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

                  {/* Table */}
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Member ID</TableHead>
                          <TableHead>Member</TableHead>
                          <TableHead>Trx Type</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Note</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {loading ? (
                          <TableRow>
                            <TableCell colSpan={7} className="h-24 text-center">
                              Loading transactions...
                            </TableCell>
                          </TableRow>
                        ) : transactions.length > 0 ? (
                          transactions.map((transaction) => (
                            <TableRow
                              key={transaction.id}
                              className="group relative"
                            >
                              <TableCell>
                                {new Date(
                                  transaction.collected_at
                                ).toDateString()}
                              </TableCell>
                              <TableCell>{transaction?.member_id}</TableCell>
                              <TableCell>
                                {transaction?.member?.full_name}
                              </TableCell>
                              <TableCell>{transaction?.trx_type}</TableCell>
                              <TableCell className="font-medium">
                                {transaction.amount.toFixed(2) + currency}
                              </TableCell>
                              <TableCell>{transaction.note || "-"}</TableCell>
                              <TableCell className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() =>
                                    router.push(
                                      `/edit/transaction/${transaction.id}`
                                    )
                                  }
                                >
                                  Edit
                                </Button>
                                {/* You can add Delete button here too */}
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={7} className="h-24 text-center">
                              No transactions found.
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
  );
}
