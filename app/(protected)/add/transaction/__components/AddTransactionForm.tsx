"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { fetcher } from "@/server_actions/fetcher";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function AddTransactionPage({ accessToken }: { accessToken?: string }) {
    const router = useRouter();
    const [members, setMembers] = useState<{ id: number; full_name: string }[]>([]);
    const [memberSearch, setMemberSearch] = useState("");
    const [memberLoading, setMemberLoading] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        member_id: "",
        trx_type: "Deposit",
        amount: "",
        note: "",
        collected_at: new Date().toISOString(),
    });

    useEffect(() => {
        async function fetchMembers() {
            setMemberLoading(true);
            try {
                const result = await fetcher("/member?sortBy=id&sortOrder=asc&searchTerm=" + memberSearch);
                if (result.success && Array.isArray(result?.data)) {
                    setMembers(result.data);
                } else {
                    const errorMessages = result?.errorMessages;
                    if (Array.isArray(errorMessages)) {
                        errorMessages.forEach((e) => toast.error(e.message));
                    } else {
                        toast.error("Failed to fetch members!");
                    }
                }
            } catch (error) {
                console.error(error);
                toast.error("Failed to fetch members!");
            } finally {
                setMemberLoading(false);
            }
        }

        fetchMembers();
    }, [memberSearch]);

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
                    member_id: Number(formData.member_id),
                    trx_type: formData.trx_type,
                    amount: Number(formData.amount),
                    note: formData.note,
                    collected_at: formData.collected_at
                },
                revalidatePaths: ["/", "/finance"],
            });

            if (!result?.success) {
                const errorMessages = result?.error?.errorMessages;
                if (Array.isArray(errorMessages)) {
                    errorMessages.forEach((e) => toast.error(e.message));
                } else {
                    toast.error("Failed to create transaction!");
                }
                return;
            }

            toast.success("Transaction added successfully!");
            router.push("/finance");
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
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

                            {/* Search input */}
                            <div className="col-span-full">
                                <label className="block mb-1 text-sm font-medium">Search Member</label>
                                <Input
                                    placeholder="Type to search..."
                                    value={memberSearch}
                                    onChange={(e) => setMemberSearch(e.target.value)}
                                />
                            </div>

                            {/* Member select */}
                            <div className="col-span-full">
                                <label className="block mb-1 text-sm font-medium">Member</label>
                                <select
                                    name="member_id"
                                    value={formData.member_id}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md"
                                    required
                                    disabled={memberLoading}
                                >
                                    {memberLoading ? (
                                        <option>Loading...</option>
                                    ) : (
                                        <>
                                            <option value="">-- Select Member --</option>
                                            {members.map((member) => (
                                                <option key={member.id} value={member.id}>
                                                    {member?.id} - {member?.full_name}
                                                </option>
                                            ))}
                                        </>
                                    )}
                                </select>
                            </div>

                            {/* Transaction Type */}
                            <div>
                                <label className="block mb-1 text-sm font-medium">Transaction Type</label>
                                <select
                                    name="trx_type"
                                    value={formData.trx_type}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md"
                                    required
                                >
                                    <option value="Deposit">Deposit</option>
                                    <option value="Withdraw">Withdraw</option>
                                    <option value="Profit">Profit</option>
                                    <option value="Loss">Loss</option>
                                    <option value="Expense">Expense</option>
                                    <option value="Investment">Investment</option>
                                </select>
                            </div>

                            {/* Amount */}
                            <div>
                                <Input
                                    name="amount"
                                    type="number"
                                    label="Amount"
                                    placeholder="Enter amount"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Note */}
                            <div className="col-span-full">
                                <Input
                                    name="note"
                                    label="Note (optional)"
                                    placeholder="Any note..."
                                    value={formData.note}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block mb-1 text-sm font-medium">Collected At</label>
                                <Input
                                    name="collected_at"
                                    type="datetime-local"
                                    value={formData?.collected_at}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="col-span-full"
                                disabled={loading}
                            >
                                {loading ? (
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                ) : (
                                    "Save Transaction"
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
