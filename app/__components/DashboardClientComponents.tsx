"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Users,
  UserCheck,
  UserCog,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

const DashboardClientComponents = ({
  data,
}: {
  data: { members?: number; committee?: number; director?: number };
}) => {
  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [cardsRef, cardsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl mx-auto"
      >
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Welcome to Our Combination of Power
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Working together for a better future through community ownership and
          shared prosperity
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/members">
              View Members <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/finance">
              Financial Overview <DollarSign className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </motion.div>
      <motion.div
        ref={statsRef}
        initial={{ opacity: 0 }}
        animate={statsInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {[
          {
            title: "Members",
            value: data?.members,
            icon: Users,
            color: "bg-blue-100 dark:bg-blue-900",
          },
          {
            title: "Committee Members",
            value: data?.committee,
            icon: UserCheck,
            color: "bg-green-100 dark:bg-green-900",
          },
          {
            title: "Directors",
            value: data?.director,
            icon: UserCog,
            color: "bg-purple-100 dark:bg-purple-900",
          },
          {
            title: "Total Assets",
            value: "N/A",
            icon: TrendingUp,
            color: "bg-amber-100 dark:bg-amber-900",
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-full ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        ref={cardsRef}
        initial={{ opacity: 0 }}
        animate={cardsInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {[
          {
            title: "Members",
            description: "View and manage all co-operative members",
            link: "/members",
            icon: Users,
            delay: 0,
          },
          {
            title: "Committee",
            description: "Meet our dedicated committee members",
            link: "/committee",
            icon: UserCheck,
            delay: 0.1,
          },
          {
            title: "Directors",
            description: "Learn about our board of directors",
            link: "/directors",
            icon: UserCog,
            delay: 0.2,
          },
        ].map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={cardsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 + item.delay }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <Link href={item.link}>
              <Card className="h-full cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <item.icon className="h-5 w-5 text-primary" />
                    <CardTitle>{item.title}</CardTitle>
                  </div>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="ghost"
                    className="group w-full justify-start p-0"
                  >
                    View details
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={cardsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="rounded-lg border bg-card p-6"
      >
        <h2 className="text-2xl font-bold mb-4">Financial Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[
            { title: "Deposits", value: "$345,200", path: "/finance/deposit" },
            {
              title: "Withdrawals",
              value: "$124,800",
              path: "/finance/withdraw",
            },
            { title: "Profit", value: "$78,500", path: "/finance/profit" },
            { title: "Balance", value: "$1,245,600", path: "/finance/balance" },
          ].map((item, index) => (
            <Link key={item.title} href={item.path}>
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <p className="text-sm font-medium text-muted-foreground">
                    {item.title}
                  </p>
                  <p className="text-2xl font-bold">{item.value}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <div className="mt-4">
          <Button asChild variant="outline" size="sm">
            <Link href="/finance">
              View All Financial Data <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </motion.div>
    </>
  );
};

export default DashboardClientComponents;
