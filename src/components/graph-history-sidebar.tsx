'use client'

import {Sidebar, SidebarContent, SidebarHeader} from "@/components/ui/sidebar";
import {useGraphsStore} from "@/providers/graphs-store-provider";
import {useEffect} from "react";


export function GraphHistorySidebar() {
    const graphs = useGraphsStore(store => store.graphs)
    const changeGraph = useGraphsStore(store => store.changeGraph)
    const getGraphs = useGraphsStore(store => store.getGraphs)


    useEffect(() => {
        getGraphs()
    }, [getGraphs]);

    return (
        <Sidebar>
            <SidebarHeader className="p-4">
                <h2 className="text-lg font-semibold">Graph History</h2>
            </SidebarHeader>
            <SidebarContent>
                <ul className="space-y-2">
                    {graphs.map((graph) => (
                        <li
                            key={graph.id}
                            className="p-2 hover:bg-accent rounded-md cursor-pointer"
                            onClick={() => changeGraph(graph.id)}
                        >
                            <p className="font-medium">{graph.title}</p>
                            <p className="text-sm text-muted-foreground">{graph.date}</p>
                        </li>
                    ))}
                </ul>
            </SidebarContent>
        </Sidebar>
    )
}

