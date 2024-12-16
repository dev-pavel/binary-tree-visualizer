'use client'

import {useEffect, useRef, useState} from 'react'
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Card, CardContent} from "@/components/ui/card"
import {useBinarySearchTree} from "@/hooks/use-binary-search-tree";
import dynamic from "next/dynamic";
import {useGraphsStore} from "@/providers/graphs-store-provider";

const Tree = dynamic(() => import("react-d3-tree"), {ssr: false});

export default function BinaryTreeVisualizer() {
    const [inputValue, setInputValue] = useState('')
    const [graphTitle, setGraphTitle] = useState('New Binary Tree Graph')
    const containerRef = useRef(null);
    const {tree, parsedTree, insert, setTree} = useBinarySearchTree()
    const [translate, setTranslate] = useState({x: 0, y: 0});
    const saveGraph = useGraphsStore(store => store.saveGraph)
    const currentGraphId = useGraphsStore(store => store.currentGraphId)
    const graphs = useGraphsStore(store => store.graphs)
    const changeGraph = useGraphsStore(store => store.changeGraph)
    const deleteGraph = useGraphsStore(store => store.deleteGraph)

    const handleAddNumber = () => {
        const value = parseInt(inputValue)
        if (isNaN(value)) {
            alert("Please enter a valid number")
            return
        }
        insert(value)
        setInputValue("")
    }

    const handleSaveGraph = () => {
        if (!tree || !graphTitle) {
            alert("Please enter a graph title and add some numbers to the graph")
            return
        }
        saveGraph({title: graphTitle, graph: tree})
    }

    const handleNewGraph = () => {
        changeGraph("")
    }

    const handleDeleteGraph = () => {
        if (!currentGraphId) {
            return
        }

        deleteGraph(currentGraphId)
    }

    useEffect(() => {
        if (containerRef.current) {
            const {clientWidth, clientHeight} = containerRef.current;
            setTranslate({
                x: clientWidth / 2,
                y: clientHeight / 4, // Slightly up from center for better visualization
            });
        }
    }, []);

    useEffect(() => {
        const currentGraph = graphs.find(graph => graph.id === currentGraphId) || null

        if (currentGraph) {
            setTree(currentGraph?.content || null)
            setGraphTitle(currentGraph?.title || "")
        } else {
            setTree(null)
            setGraphTitle("New Binary Tree Graph")
        }

    }, [currentGraphId, graphs, setTree]);

    return (
        <div className="flex flex-col h-screen p-4">
            <h1 className="text-2xl font-bold mb-4">Binary Tree Visualizer</h1>

            <div className="flex space-x-2 mb-4">
                <Input
                    type="text"
                    value={graphTitle}
                    onChange={(e) => setGraphTitle(e.target.value)}
                    placeholder="Enter graph title"
                />
                <Button
                    variant="destructive"
                    onClick={handleDeleteGraph}
                    disabled={!currentGraphId}
                >Delete graph</Button>
            </div>

            <Card className="flex-grow mb-4 overflow-hidden">
                <CardContent className="h-full flex flex-col items-center justify-center pt-6" ref={containerRef}>
                    {parsedTree ? (
                        <Tree
                            data={parsedTree}
                            orientation="vertical"
                            translate={translate}
                            collapsible={false}
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            Enter a number below
                        </div>
                    )}
                </CardContent>
            </Card>


            <div className="flex space-x-2 mb-4 max-w-96">
                <Input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter a number"
                />
                <Button onClick={handleAddNumber}>Add Number</Button>
            </div>

            <div className="flex space-x-2">
                <Button onClick={handleSaveGraph}>Save Graph</Button>
                <Button onClick={handleNewGraph}>New Graph</Button>
            </div>
        </div>
    )
}

