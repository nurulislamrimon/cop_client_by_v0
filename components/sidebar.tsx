"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Home, Users, UserCheck, UserCog, DollarSign, Menu, X, ChevronDown, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const menuItems = [
  { name: "Home", path: "/", icon: Home },
  { name: "Members", path: "/members", icon: Users },
  { name: "Committee", path: "/committee", icon: UserCheck },
  { name: "Directors", path: "/directors", icon: UserCog },
  {
    name: "Finance",
    path: "/finance",
    icon: DollarSign,
    submenu: [
      { name: "Deposit", path: "/finance/deposit" },
      { name: "Withdraw", path: "/finance/withdraw" },
      { name: "Profit", path: "/finance/profit" },
      { name: "Loss", path: "/finance/loss" },
      { name: "Investment", path: "/finance/investment" },
      { name: "Expense", path: "/finance/expense" },
      { name: "Balance", path: "/finance/balance" },
    ],
  },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    // Close mobile menu when path changes
    setIsMobileMenuOpen(false)

    // Open finance submenu if on a finance page
    if (pathname.startsWith("/finance")) {
      setOpenSubmenu("Finance")
    }
  }, [pathname])

  if (!isMounted) return null

  const toggleSubmenu = (name: string) => {
    setOpenSubmenu(openSubmenu === name ? null : name)
  }

  const sidebarVariants = {
    hidden: { x: -300, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  }

  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  }

  const submenuVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  }

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      <AnimatePresence>
        {(isMobileMenuOpen || window.innerWidth >= 768) && (
          <motion.aside
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={sidebarVariants}
            className={cn(
              "fixed inset-y-0 left-0 z-40 w-64 bg-background border-r p-4 flex flex-col md:relative",
              isMobileMenuOpen ? "block" : "hidden md:block",
            )}
          >
            <div className="flex items-center justify-center h-16 mb-8">
              <motion.h1
                className="text-2xl font-bold text-primary"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Co-operative
              </motion.h1>
            </div>

            <nav className="flex-1 space-y-1">
              {menuItems.map((item, index) => (
                <div key={item.name} className="mb-1">
                  {item.submenu ? (
                    <>
                      <motion.button
                        custom={index}
                        initial="hidden"
                        animate="visible"
                        variants={menuItemVariants}
                        onClick={() => toggleSubmenu(item.name)}
                        className={cn(
                          "flex items-center w-full px-4 py-2 text-left rounded-md hover:bg-accent transition-colors",
                          pathname === item.path || pathname.startsWith(item.path + "/")
                            ? "bg-accent text-accent-foreground font-medium"
                            : "text-foreground",
                        )}
                      >
                        <item.icon className="mr-2 h-5 w-5" />
                        <span>{item.name}</span>
                        {openSubmenu === item.name ? (
                          <ChevronDown className="ml-auto h-4 w-4" />
                        ) : (
                          <ChevronRight className="ml-auto h-4 w-4" />
                        )}
                      </motion.button>
                      <AnimatePresence>
                        {openSubmenu === item.name && (
                          <motion.div
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={submenuVariants}
                            className="pl-8 mt-1 space-y-1 overflow-hidden"
                          >
                            {item.submenu.map((subitem, subIndex) => (
                              <motion.div
                                key={subitem.name}
                                custom={subIndex}
                                initial="hidden"
                                animate="visible"
                                variants={menuItemVariants}
                              >
                                <Link
                                  href={subitem.path}
                                  className={cn(
                                    "flex items-center px-4 py-2 text-sm rounded-md hover:bg-accent transition-colors",
                                    pathname === subitem.path
                                      ? "bg-accent/50 text-accent-foreground font-medium"
                                      : "text-muted-foreground",
                                  )}
                                >
                                  {subitem.name}
                                </Link>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link href={item.path}>
                      <motion.div
                        custom={index}
                        initial="hidden"
                        animate="visible"
                        variants={menuItemVariants}
                        className={cn(
                          "flex items-center px-4 py-2 rounded-md hover:bg-accent transition-colors",
                          pathname === item.path ? "bg-accent text-accent-foreground font-medium" : "text-foreground",
                        )}
                      >
                        <item.icon className="mr-2 h-5 w-5" />
                        <span>{item.name}</span>
                      </motion.div>
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            <div className="pt-4 border-t">
              <p className="text-xs text-muted-foreground text-center">© {new Date().getFullYear()} Co-operative Org</p>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
