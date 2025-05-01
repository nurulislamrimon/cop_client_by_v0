"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { fetcher } from "@/server_actions/fetcher";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebouncedApi } from "@/hooks/use-debounce-api";

interface Snapshot {
  id: number;
  full_name: string;
  total_deposit: number;
  total_withdraw: number;
  total_expense: number;
  total_profit: number;
  total_loss: number;
  total_invest: number;
  total_deposit_amount: number;
  total_withdraw_amount: number;
  total_expense_amount: number;
  total_profit_amount: number;
  total_loss_amount: number;
  total_invest_amount: number;
  member_id: number;
  balance: number;
}

interface GrandTotal {
  total_deposit_amount: number;
  total_withdraw_amount: number;
  total_expense_amount: number;
  total_balance: number;
}

export default function ManageOverviewClientComps({
  accessToken,
}: {
  accessToken?: string;
}) {
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [data, setData] = useState<Snapshot[]>([]);
  const [grandTotal, setGrandTotal] = useState<GrandTotal | null>(null);
  const [loading, setLoading] = useState(true);

  useDebouncedApi({
    handler: async () => {
      setLoading(true);
      try {
        let query = `/transaction/snapshot/by-admin?page=1&limit=50`;
        if (filter) {
          query += `&member_id=${filter}`;
        }
        if (search) {
          query += `&searchTerm=${search}`;
        }

        const response = await fetcher(query, { authToken: accessToken });
        setData(response?.data?.individuals || []);
        setGrandTotal(response?.data?.grandTotal || null);
      } catch (err) {
        console.error("Error fetching statistics:", err);
      } finally {
        setLoading(false);
      }
    },
    deps: [accessToken, filter, search],
  });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">📊 Transaction Snapshots</h1>
      <div className="flex items-center space-x-5 space-y-5 flex-wrap">
        <div className="flex items-center">
          <Input
            placeholder="Search ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64"
          />
        </div>
        <div className="flex items-center">
          <Input
            placeholder="Filter by Member ID..."
            type="number"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-64"
          />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-52 rounded-2xl" />
          ))}
        </div>
      ) : (
        <>
          {grandTotal && (
            <Card className="mt-8 p-6 rounded-2xl shadow-md border-t-4 border-blue-600 bg-blue-50">
              <CardContent className="space-y-2 text-blue-900">
                <h2 className="text-xl font-bold">Grand Total</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    Total Deposit Amount:{" "}
                    <span className="font-semibold">
                      {grandTotal.total_deposit_amount}
                    </span>
                  </div>
                  <div>
                    Total Withdraw Amount:{" "}
                    <span className="font-semibold">
                      {grandTotal.total_withdraw_amount}
                    </span>
                  </div>
                  <div>
                    Total Expense Amount:{" "}
                    <span className="font-semibold">
                      {grandTotal.total_expense_amount}
                    </span>
                  </div>
                  <div>
                    Total Balance:{" "}
                    <span
                      className={`font-semibold ${
                        grandTotal.total_balance >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {grandTotal.total_balance}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {data.map((item, i) => (
              <Card
                key={i || 0}
                className="shadow-lg hover:shadow-xl transition rounded-2xl p-4"
              >
                <CardContent className="space-y-2">
                  <div className="text-lg font-semibold">
                    {item?.full_name} - {item?.member_id || 0}
                  </div>
                  <div className="text-sm text-gray-700 font-semibold">
                    💰 Balance:{" "}
                    <span
                      className={`${
                        item.balance || 0 >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {item.balance || 0}
                    </span>
                  </div>

                  <div className="pt-2 mt-2 text-sm text-gray-500 grid grid-cols-2 gap-2">
                    <div>
                      Deposit Amount:{" "}
                      <span className="font-medium">
                        {item.total_deposit_amount || 0}
                      </span>
                    </div>
                    <div>
                      Withdraw Amount:{" "}
                      <span className="font-medium">
                        {item.total_withdraw_amount || 0}
                      </span>
                    </div>
                    <div>
                      Expense Amount:{" "}
                      <span className="font-medium">
                        {item.total_expense_amount || 0}
                      </span>
                    </div>
                    <div>
                      Profit Amount:{" "}
                      <span className="font-medium">
                        {item.total_profit_amount || 0}
                      </span>
                    </div>
                    <div>
                      Loss Amount:{" "}
                      <span className="font-medium">
                        {item.total_loss_amount || 0}
                      </span>
                    </div>
                    <div>
                      Invest Amount:{" "}
                      <span className="font-medium">
                        {item.total_invest_amount || 0}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {data.length === 0 && (
            <div className="text-center text-gray-500 mt-10">
              No results found for Member ID:{" "}
              <span className="font-semibold">{filter}</span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
