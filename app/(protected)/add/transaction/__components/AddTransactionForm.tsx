"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { fetcher } from "@/server_actions/fetcher";
import { toast } from "sonner";
import { financeRoutes } from "@/constants/common.constants";

const transactionTypes = ["Deposit", "Withdraw", "Profit", "Lose", "Expense", "Investment"];

interface Member {
    id: number;
    full_name: string;
}

export default function AddTransactionForm({ accessToken }: { accessToken?: string }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [members, setMembers] = useState<Member[]>([]);
    const [formData, setFormData] = useState({
        trx_type: "Deposit",
        amount: "",
        note: "",
        member_id: "",
        collector_id: "",
        approver_id: "",
        collected_at: new Date().toISOString().slice(0, 10), // today's date
    });

    useEffect(() => {
        async function fetchMembers() {
            const result = await fetcher("/member")
            if (result.success && Array.isArray(result?.data)) {
                setMembers(result?.data)
            } else {
                const errorMessages = result?.errorMessages;
                if (Array.isArray(errorMessages)) {
                    errorMessages?.forEach(e => toast.error(e.message))
                } else {
                    toast.error("Failed to fetch members!")
                }
            }
        }
        fetchMembers();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await fetcher("/transaction/add", {
                method: "POST",
                authToken: accessToken,
                body: {
                    ...formData,
                    amount: parseInt(formData.amount),
                    member_id: parseInt(formData.member_id),
                    collector_id: formData.collector_id ? parseInt(formData.collector_id) : undefined,
                    approver_id: formData.approver_id ? parseInt(formData.approver_id) : undefined,
                    collected_at: new Date(formData.collected_at),
                },
                revalidatePaths: ["/", "/finance", ...financeRoutes.map(r => "/finance" + r)],
            });

            if (!result?.success) {
                const errorMessages = result?.error?.errorMessages;
                if (Array.isArray(errorMessages)) {
                    errorMessages.forEach((e) => toast.error(e.message));
                } else {
                    toast.error("Failed to add transaction!");
                }
                return;
            }

            toast.success("Transaction added successfully!");
            router.push("/finance");
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card className="max-w-2xl w-full p-6 shadow-xl rounded-2xl">
                    <CardContent>
                        <form
                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                            onSubmit={handleSubmit}
                        >
                            <h1 className="text-2xl font-bold col-span-full text-center">
                                Add New Transaction
                            </h1>

                            <div className="col-span-full">
                                <label className="block mb-1 text-sm font-medium">Transaction Type</label>
                                <select
                                    name="trx_type"
                                    value={formData.trx_type}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md"
                                    required
                                >
                                    {transactionTypes.map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <Input
                                name="amount"
                                label="Amount"
                                type="number"
                                value={formData.amount}
                                onChange={handleChange}
                                required
                            />

                            <Input
                                name="note"
                                label="Note (optional)"
                                value={formData.note}
                                onChange={handleChange}
                            />

                            <div className="col-span-full">
                                <label className="block mb-1 text-sm font-medium">Member</label>
                                <select
                                    name="member_id"
                                    value={formData.member_id}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md"
                                    required
                                >
                                    <option value="">-- Select Member --</option>
                                    {members.map((member) => (
                                        <option key={member.id} value={member.id}>
                                            {member.full_name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-span-full">
                                <label className="block mb-1 text-sm font-medium">Collector (optional)</label>
                                <select
                                    name="collector_id"
                                    value={formData.collector_id}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md"
                                >
                                    <option value="">-- Select Collector --</option>
                                    {members.map((member) => (
                                        <option key={member.id} value={member.id}>
                                            {member.full_name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-span-full">
                                <label className="block mb-1 text-sm font-medium">Approver (optional)</label>
                                <select
                                    name="approver_id"
                                    value={formData.approver_id}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md"
                                >
                                    <option value="">-- Select Approver --</option>
                                    {members.map((member) => (
                                        <option key={member.id} value={member.id}>
                                            {member.full_name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <Input
                                name="collected_at"
                                label="Collected At"
                                type="date"
                                value={formData.collected_at}
                                onChange={handleChange}
                            />

                            <Button
                                type="submit"
                                className="col-span-full"
                                disabled={loading}
                            >
                                {loading ? "Saving..." : "Add Transaction"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
