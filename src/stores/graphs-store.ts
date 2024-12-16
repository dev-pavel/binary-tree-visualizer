import {createStore} from 'zustand/vanilla'

interface TreeNode {
    value: number;
    left: TreeNode | null;
    right: TreeNode | null;
}

export type GraphsState = {
    currentGraphId: string
    graphs: {
        id: string
        date: string
        title: string
        content: TreeNode
    }[]
}

interface DBGraph {
    id: string
    date: string
    title: string
    content: string
}

export type GraphsActions = {
    saveGraph: ({title, graph, graphId}: { title: string, graph: TreeNode, graphId?: string }) => void
    getGraphs: () => void
    changeGraph: (graphId: string) => void
    deleteGraph: (graphId: string) => void
}

export type GraphsStore = GraphsState & GraphsActions

export const defaultInitState: GraphsState = {
    currentGraphId: "",
    graphs: [],
}

export const createGraphsStore = (
    initState: GraphsState = defaultInitState,
) => {
    return createStore<GraphsStore>()((set, get) => ({
        ...initState,
        saveGraph: async ({title, graph}) => {
            const currentGraphId = get().currentGraphId

            if (currentGraphId) {
                try {
                    await fetch(`http://localhost:8080/graphs/${currentGraphId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            date: new Date().toDateString(),
                            title,
                            content: JSON.stringify(graph)
                        }),
                    })
                    const response = await fetch('http://localhost:8080/graphs')
                    const graphs = await response.json()
                    set({graphs: graphs.map((graph: DBGraph) => ({...graph, content: JSON.parse(graph.content)}))})
                } catch (e) {
                    console.log(e)
                }
            } else {
                try {
                    const response = await fetch('http://localhost:8080/graphs', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            date: new Date().toDateString(),
                            title,
                            content: JSON.stringify(graph)
                        }),
                    })
                    const newGraph = await response.json()
                    set((state) => ({
                        currentGraphId: newGraph.id,
                        graphs: [
                            ...state.graphs,
                            {
                                ...newGraph,
                                content: JSON.parse(newGraph.content)
                            }
                        ],
                    }))
                } catch (e) {
                    console.log(e)
                }
            }
        },
        getGraphs: async () => {
            try {
                const response = await fetch('http://localhost:8080/graphs')
                const graphs = await response.json()
                set({graphs: graphs.map((graph: DBGraph) => ({...graph, content: JSON.parse(graph.content)}))})
            } catch (e) {
                console.log(e)
            }
        },
        changeGraph: (chatId) => {
            set({currentGraphId: chatId})
        },
        deleteGraph: async (graphId) => {
            try {
                await fetch(`http://localhost:8080/graphs/${graphId}`, {
                    method: 'DELETE',
                })
                const response = await fetch('http://localhost:8080/graphs')
                const graphs = await response.json()
                set({
                    currentGraphId: "",
                    graphs: graphs.map((graph: DBGraph) => ({...graph, content: JSON.parse(graph.content)}))
                })
            } catch (e) {
                console.log(e)
            }
        }
    }))
}
