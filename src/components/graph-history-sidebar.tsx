import {Sidebar, SidebarContent, SidebarHeader} from "@/components/ui/sidebar";


export function GraphHistorySidebar() {
    const graphHistory = [
        {id: 1, name: 'Graph 1', date: '2023-05-01'},
        {id: 2, name: 'Graph 2', date: '2023-05-02'},
        {id: 3, name: 'Graph 3', date: '2023-05-03'},
    ]

    return (
        <Sidebar>
            <SidebarHeader className="p-4">
                <h2 className="text-lg font-semibold">Graph History</h2>
            </SidebarHeader>
            <SidebarContent>
                <ul className="space-y-2">
                    {graphHistory.map((graph) => (
                        <li key={graph.id} className="p-2 hover:bg-accent rounded-md cursor-pointer">
                            <p className="font-medium">{graph.name}</p>
                            <p className="text-sm text-muted-foreground">{graph.date}</p>
                        </li>
                    ))}
                </ul>
            </SidebarContent>
        </Sidebar>
    )
}

