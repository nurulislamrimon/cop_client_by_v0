"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { fetcher } from "@/server_actions/fetcher";
import { FileUploader } from "@/components/ui/file-uploader";

interface Member {
    id: string;
    full_name: string;
    father_name?: string;
    mother_name?: string;
    phone_number: string;
    email: string;
    address?: string;
    occupation?: string;
    reffered_by?: string;
    joining_date?: string;
    date_of_birth?: string;
    role?: string;
    profile_photo?: string;
}

export default function EditMemberForm({
    accessToken,
    member,
}: {
    accessToken?: string;
    member: Member;
}) {
    const router = useRouter();
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState<Member>(member);

    useEffect(() => {
        setFormData(member);
    }, [member]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileSelect = (selectedFile: File | null) => {
        setFile(selectedFile);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let fileName = formData.profile_photo;

            if (file) {
                fileName = `${Date.now()}_${file.name}`;
            }

            const result = await fetcher(`/member/${member.id}`, {
                method: "PATCH",
                authToken: accessToken,
                body: {
                    ...formData,
                    profile_photo: fileName || "",
                },
                revalidatePaths: ["/", `/members/${member.id}`, "/members"],
            });

            if (!result?.success) {
                const errorMessages = result?.error?.errorMessages;
                if (Array.isArray(errorMessages)) {
                    errorMessages.forEach((e) => toast.error(e.message));
                } else {
                    toast.error("Failed to update member!");
                }
                return;
            }

            if (file && result?.data?.uploadUrl) {
                const upload = await fetch(result.data.uploadUrl, {
                    method: "PUT",
                    headers: { "Content-Type": file.type },
                    body: file,
                });

                if (!upload.ok) throw new Error("Upload failed");

                toast.success("File uploaded successfully!");
            }

            toast.success("Member updated successfully!");
            router.push("/members");
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
                                Edit Member
                            </h1>

                            <Input
                                name="full_name"
                                label="Full Name"
                                value={formData.full_name}
                                onChange={handleChange}
                                required
                            />
                            <Input
                                name="phone_number"
                                label="Phone Number"
                                value={formData.phone_number}
                                onChange={handleChange}
                                required
                            />
                            <Input
                                name="father_name"
                                label="Father's Name"
                                value={formData.father_name || ""}
                                onChange={handleChange}
                            />
                            <Input
                                name="mother_name"
                                label="Mother's Name"
                                value={formData.mother_name || ""}
                                onChange={handleChange}
                            />
                            <Input
                                name="joining_date"
                                label="Joining Date"
                                type="date"
                                value={formData.joining_date || ""}
                                onChange={handleChange}
                            />
                            <Input
                                name="date_of_birth"
                                label="Date of Birth"
                                type="date"
                                value={formData.date_of_birth || ""}
                                onChange={handleChange}
                            />
                            <Input
                                name="email"
                                type="email"
                                label="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <Input
                                name="role"
                                label="Role (optional)"
                                value={formData.role || ""}
                                onChange={handleChange}
                            />
                            <Input
                                name="address"
                                label="Address"
                                value={formData.address || ""}
                                onChange={handleChange}
                            />
                            <Input
                                name="occupation"
                                label="Occupation"
                                value={formData.occupation || ""}
                                onChange={handleChange}
                            />
                            <Input
                                name="reffered_by"
                                label="Referred By"
                                value={formData.reffered_by || ""}
                                onChange={handleChange}
                            />

                            <div className="md:col-span-2">
                                <FileUploader
                                    label="Change Profile Photo (optional)"
                                    onFileSelect={handleFileSelect}
                                />
                            </div>

                            <Button
                                type="submit"
                                className="col-span-full"
                                disabled={loading}
                            >
                                {loading ? "Saving..." : "Update Member"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
