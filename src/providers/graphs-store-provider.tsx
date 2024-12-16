'use client'

import {type ReactNode, createContext, useRef, useContext} from 'react'
import {useStore} from 'zustand'

import {type GraphsStore, createGraphsStore} from '@/stores/graphs-store'

export type GraphsStoreApi = ReturnType<typeof createGraphsStore>

export const GraphsStoreContext = createContext<GraphsStoreApi | undefined>(
    undefined,
)

export interface GraphsStoreProviderProps {
    children: ReactNode
}

export const GraphsStoreProvider = ({
                                        children,
                                    }: GraphsStoreProviderProps) => {
    const storeRef = useRef<GraphsStoreApi>()
    if (!storeRef.current) {
        storeRef.current = createGraphsStore()
    }

    return (
        <GraphsStoreContext.Provider value={storeRef.current}>
            {children}
        </GraphsStoreContext.Provider>
    )
}

export const useGraphsStore = <T, >(
    selector: (store: GraphsStore) => T,
): T => {
    const graphsStoreContext = useContext(GraphsStoreContext)

    if (!graphsStoreContext) {
        throw new Error(`useGraphsStore must be used within GraphsStoreProvider`)
    }

    return useStore(graphsStoreContext, selector)
}
