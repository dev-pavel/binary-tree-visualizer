import "./globals.css";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { GraphHistorySidebar } from "@/components/graph-history-sidebar"

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body>
        <SidebarProvider>
            <div className="flex h-screen w-full">
                <GraphHistorySidebar />
                <SidebarInset className="flex-grow">
                    <main>{children}</main>
                </SidebarInset>
            </div>
        </SidebarProvider>
        </body>
        </html>
    )
}

