"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { fetcher } from "@/server_actions/fetcher";

interface EditCommitteeFormProps {
    accessToken?: string;
    committeeId: number;
    members?: { id: number; full_name: string }[];
    initialData: {
        type_of_committee: string;
        designation: string;
        member_id: number | null;
        selected_at: string;
        valid_till: string | null;
    };
}

const committeeTypes = ["executive", "director"];

export default function EditCommitteeForm({ accessToken, committeeId, members, initialData }: EditCommitteeFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        type_of_committee: initialData.type_of_committee || "executive",
        designation: initialData.designation || "",
        member_id: initialData.member_id ? String(initialData.member_id) : "",
        selected_at: initialData.selected_at ? initialData.selected_at.slice(0, 10) : "",
        valid_till: initialData.valid_till ? initialData.valid_till.slice(0, 10) : "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await fetcher(`/committee/${committeeId}`, {
                method: "PATCH",
                authToken: accessToken,
                body: {
                    ...formData,
                    member_id: formData.member_id ? parseInt(formData.member_id) : null,
                    selected_at: formData.selected_at ? new Date(formData.selected_at) : undefined,
                    valid_till: formData.valid_till ? new Date(formData.valid_till) : undefined,
                },
                revalidatePaths: ["/", "/committee", "/committee/" + committeeId, "/directors", "/directors" + committeeId],
            });

            if (!result?.success) {
                const errorMessages = result?.error?.errorMessages;
                if (Array.isArray(errorMessages)) {
                    errorMessages.forEach((e) => toast.error(e.message));
                } else {
                    toast.error("Failed to update committee!");
                }
                return;
            }

            toast.success("Committee updated successfully!");
            router.push("/");
        } catch (err) {
            console.error(err);
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
                                Edit Committee
                            </h1>

                            <div className="col-span-full">
                                <label className="block mb-1 text-sm font-medium">Type of Committee</label>
                                <select
                                    name="type_of_committee"
                                    value={formData.type_of_committee}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md"
                                    required
                                >
                                    {committeeTypes.map((type) => (
                                        <option key={type} value={type}>
                                            {type.charAt(0).toUpperCase() + type.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <Input
                                name="designation"
                                label="Designation"
                                value={formData.designation}
                                onChange={handleChange}
                                required
                            />

                            <div className="col-span-full">
                                <label className="block mb-1 text-sm font-medium">Select Member (Optional)</label>
                                <select
                                    name="member_id"
                                    value={formData.member_id}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md"
                                >
                                    <option value="">-- None --</option>
                                    {members?.map((member) => (
                                        <option key={member.id} value={member.id}>
                                            {member.full_name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <Input
                                name="selected_at"
                                label="Selected At"
                                type="date"
                                value={formData.selected_at}
                                onChange={handleChange}
                            />
                            <Input
                                name="valid_till"
                                label="Valid Till"
                                type="date"
                                value={formData.valid_till || ""}
                                onChange={handleChange}
                            />

                            <Button
                                type="submit"
                                className="col-span-full"
                                disabled={loading}
                            >
                                {loading ? "Saving..." : "Update Committee"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
