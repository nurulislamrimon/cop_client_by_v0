"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { deleteItem } from "@/server_actions/deleteItem";
import ConfirmDeleteModal from "@/components/ui/confirm-delete-modal";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { mainRoutes } from "@/constants/common.constants";
import { formatObjectKey } from "@/utils/format";


interface PreviewCardProps {
  title: string;
  data: Record<string, any>;
  backLink: string;
  editPage: string;
  deleteUrl: string;
  imageSrc?: string;
  badges?: string[];
}

export default function PreviewCard({ title, data, backLink, editPage, deleteUrl, imageSrc, badges = [] }: PreviewCardProps) {
  const [openConfirm, setOpenConfirm] = useState(false);
  const router = useRouter()

  const handleDelete = async () => {
    const result = await deleteItem({
      url: deleteUrl,
      revalidatePaths: [...mainRoutes],
    });
    if (result.success) {
      toast.success("Member deleted successfully!")
      router.push('/members')
    } else {
      if (Array.isArray(result?.errorMessages)) {
        result?.errorMessages.forEach((e) => toast.error(e.message))
      } else {
        toast.error(result.message)
      }
    }
    setOpenConfirm(false);
  };

  return (
    <>
      <ConfirmDeleteModal
        open={openConfirm}
        onConfirm={handleDelete}
        onCancel={() => setOpenConfirm(false)}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mb-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href={backLink}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
        </div>

        <Card className="overflow-hidden">
          <CardHeader className="pb-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">{title}</CardTitle>
              <div className="flex gap-2">
                {badges.map((badge) => (
                  <Badge key={badge} variant="secondary">
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6">
              {imageSrc && (
                <div className="flex-shrink-0">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src={imageSrc || "/placeholder.svg"} alt={title} />
                    <AvatarFallback className="text-2xl">
                      {title
                        ?.split(" ")
                        ?.map((word) => word[0])
                        ?.join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>
              )}
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(data)?.map(([key, value]) => (
                    <div key={key} className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        {formatObjectKey(key)}
                      </p>
                      <p className="font-medium">{value || "-"}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t bg-muted/50 px-6 py-4">
            <div className="flex justify-end gap-2">
              <Link href={editPage}>
                <Button variant="outline">Edit</Button>
              </Link>
              <Button>
                <a href={"tel:" + data?.phone_number}>Contact</a>
              </Button>
              <Button
                variant="destructive"
                onClick={() => setOpenConfirm(true)}
              >
                Delete
              </Button>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </>
  );
}
