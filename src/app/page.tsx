'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export default function BinaryTreeVisualizer() {
  const [inputValue, setInputValue] = useState('')
  const [nodes, setNodes] = useState<number[]>([])
  const [graphTitle, setGraphTitle] = useState('Binary Tree Graph')

  const handleAddNumber = () => {
    const num = parseInt(inputValue)
    if (!isNaN(num)) {
      setNodes([...nodes, num])
      setInputValue('')
    }
  }

  const handleSaveGraph = () => {
    // In a real application, this would save the current graph to history
    console.log('Saving graph:', nodes)
  }

  const handleNewGraph = () => {
    setNodes([])
    setGraphTitle('Binary Tree Graph')
  }

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
          <Button onClick={() => setGraphTitle(graphTitle)}>Change Title</Button>
        </div>

        <Card className="flex-grow mb-4 overflow-hidden">
          <CardContent className="h-full flex flex-col items-center justify-center pt-6">
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              Graph Placeholder
            </div>
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

