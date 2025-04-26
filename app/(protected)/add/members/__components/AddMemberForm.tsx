"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { fetcher } from "@/server_actions/fetcher";
import { FileUploader } from "@/components/ui/file-uploader";

export default function AddMemberForm({
  accessToken,
}: {
  accessToken?: string;
}) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    father_name: "",
    mother_name: "",
    phone_number: "",
    email: "",
    password: "",
    address: "",
    occupation: "",
    reffered_by: "",
  });

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
      let fileName: string | undefined;
      if (file) {
        fileName = `${Date.now()}_${file.name}`;
      }

      // Step 1: Submit form with fileName (not the file itself)
      const result = await fetcher("/member/add", {
        method: "POST",
        authToken: accessToken,
        body: {
          ...formData,
          profile_photo: fileName || "",
        },
        revalidatePaths: ["/", "/members"],
      });

      if (!result?.success) {
        const errorMessages = result?.error?.errorMessages;
        if (Array.isArray(errorMessages)) {
          errorMessages.forEach((e) => toast.error(e.message));
        } else {
          toast.error("Failed to create member!");
        }
        return;
      }

      // Step 2: Upload file if provided and URL is returned
      if (file && result?.data?.uploadUrl) {
        const upload = await fetch(result.data.uploadUrl, {
          method: "PUT",
          headers: { "Content-Type": file.type },
          body: file,
        });

        if (!upload.ok) throw new Error("Upload failed");

        toast.success("File uploaded successfully!");
      }

      toast.success("Member added successfully!");
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
                Add New Member
              </h1>

              <Input
                name="full_name"
                label="Full Name"
                onChange={handleChange}
                required
              />
              <Input
                name="phone_number"
                label="Phone Number"
                onChange={handleChange}
                required
              />
              <Input
                name="father_name"
                label="Father's Name"
                onChange={handleChange}
              />
              <Input
                name="mother_name"
                label="Mother's Name"
                onChange={handleChange}
              />
              <Input
                name="joining_date"
                label="Joining Date"
                type="date"
                onChange={handleChange}
              />
              <Input
                name="date_of_birth"
                label="Date of Birth"
                type="date"
                onChange={handleChange}
              />
              <Input
                name="email"
                type="email"
                label="Email"
                onChange={handleChange}
                required
              />
              <Input
                name="password"
                type="password"
                label="Password"
                onChange={handleChange}
                required
              />
              <Input
                name="role"
                label="Role (optional)"
                onChange={handleChange}
              />
              <Input name="address" label="Address" onChange={handleChange} />
              <Input
                name="occupation"
                label="Occupation"
                onChange={handleChange}
              />
              <Input
                name="reffered_by"
                label="Referred By"
                onChange={handleChange}
              />

              <div className="md:col-span-2">
                <FileUploader
                  label="Profile Photo"
                  onFileSelect={handleFileSelect}
                />
              </div>

              <Button
                type="submit"
                className="col-span-full"
                disabled={loading}
              >
                {loading ? "Saving..." : "Add Member"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
