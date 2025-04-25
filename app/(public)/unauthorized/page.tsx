"use client";

import Link from "next/link";
import { LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function UnauthorizedPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center max-w-md p-6 rounded-2xl shadow-lg bg-card border"
            >
                <div className="flex justify-center mb-4">
                    <LockKeyhole className="h-12 w-12 text-destructive" />
                </div>
                <h1 className="text-2xl font-semibold mb-2 text-foreground">Unauthorized</h1>
                <p className="text-sm text-muted-foreground mb-6">
                    You do not have permission to access this page. Please login with the correct account.
                </p>
                <Button asChild>
                    <Link href="/login">Go to Login</Link>
                </Button>
            </motion.div>
        </div>
    );
}
