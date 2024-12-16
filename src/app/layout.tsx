import "./globals.css";

import {SidebarProvider, SidebarInset} from "@/components/ui/sidebar"
import {GraphHistorySidebar} from "@/components/graph-history-sidebar"
import {GraphsStoreProvider} from "@/providers/graphs-store-provider";

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body>
        <GraphsStoreProvider>
            <SidebarProvider>
                <div className="flex h-screen w-full">
                    <GraphHistorySidebar/>
                    <SidebarInset className="flex-grow">
                        <main>{children}</main>
                    </SidebarInset>
                </div>
            </SidebarProvider>
        </GraphsStoreProvider>
        </body>
        </html>
    )
}

