"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import nprogress from "nprogress"
import "nprogress/nprogress.css"

nprogress.configure({ showSpinner: false })

export default function TopLoader() {
    const pathname = usePathname()

    useEffect(() => {
        nprogress.start()
        nprogress.done()
    }, [pathname])

    return null
}
