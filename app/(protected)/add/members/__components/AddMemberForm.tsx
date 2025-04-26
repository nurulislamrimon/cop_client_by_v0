'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { fetcher } from "@/server_actions/fetcher"

export default function AddMemberForm({ accessToken }: { accessToken?: string }) {
    const router = useRouter()
    const [formData, setFormData] = useState({
        full_name: "",
        father_name: "",
        mother_name: "",
        date_of_birth: "",
        phone_number: "",
        email: "",
        password: "",
        profile_photo: "",
        address: "",
        occupation: "",
        reffered_by: "",
    })

    const [loading, setLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            const result = await fetcher("/member/add", {
                method: 'POST',
                authToken: accessToken,
                body: formData,
                revalidatePaths: ["/members"]
            })
            if (result.success) {
                toast.success("Member added successfully!")
                router.push("/members")
            } else {
                const errorMessages = result.error?.errorMessages
                if (Array.isArray(errorMessages)) {
                    errorMessages.forEach((e) => toast.error(e.message))
                } else {
                    toast.error("Failed to create member!")

                }
            }
        } catch {
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card className="max-w-2xl w-full p-6 shadow-xl rounded-2xl">
                    <CardContent>
                        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
                            <h1 className="text-2xl font-bold col-span-full text-center">Add New Member</h1>

                            <Input name="full_name" placeholder="Full Name" onChange={handleChange} required />
                            <Input name="father_name" placeholder="Father's Name" onChange={handleChange} />
                            <Input name="mother_name" placeholder="Mother's Name" onChange={handleChange} />
                            <Input name="date_of_birth" type="date" onChange={handleChange} />
                            <Input name="phone_number" placeholder="Phone Number" onChange={handleChange} required />
                            <Input name="email" type="email" placeholder="Email" onChange={handleChange} required />
                            <Input name="password" type="password" placeholder="Password" onChange={handleChange} required />
                            <Input name="role" placeholder="Role (optional)" onChange={handleChange} />
                            <Input name="profile_photo" placeholder="Profile Photo URL" onChange={handleChange} />
                            <Input name="address" placeholder="Address" onChange={handleChange} />
                            <Input name="occupation" placeholder="Occupation" onChange={handleChange} />
                            <Input name="reffered_by" placeholder="Referred By" onChange={handleChange} />

                            <Button type="submit" className="col-span-full" disabled={loading}>
                                {loading ? "Saving..." : "Add Member"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}
