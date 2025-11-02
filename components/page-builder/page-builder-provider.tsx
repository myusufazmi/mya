'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { BlockData, PageBuilderData } from '@/types/page-builder'

interface PageBuilderContextType {
  blocks: BlockData[]
  selectedBlockId: string | null
  addBlock: (block: BlockData, index?: number) => void
  updateBlock: (id: string, updates: Partial<BlockData>) => void
  deleteBlock: (id: string) => void
  moveBlock: (fromIndex: number, toIndex: number) => void
  selectBlock: (id: string | null) => void
  clearBlocks: () => void
  loadBlocks: (blocks: BlockData[]) => void
  getPageData: () => PageBuilderData
}

const PageBuilderContext = createContext<PageBuilderContextType | undefined>(undefined)

export function PageBuilderProvider({ 
  children,
  initialBlocks = []
}: { 
  children: ReactNode
  initialBlocks?: BlockData[]
}) {
  const [blocks, setBlocks] = useState<BlockData[]>(initialBlocks)
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null)

  const addBlock = (block: BlockData, index?: number) => {
    setBlocks(prev => {
      if (index !== undefined) {
        const newBlocks = [...prev]
        newBlocks.splice(index, 0, block)
        return newBlocks
      }
      return [...prev, block]
    })
  }

  const updateBlock = (id: string, updates: Partial<BlockData>) => {
    setBlocks(prev =>
      prev.map(block =>
        block.id === id ? { ...block, ...updates } : block
      )
    )
  }

  const deleteBlock = (id: string) => {
    setBlocks(prev => prev.filter(block => block.id !== id))
    if (selectedBlockId === id) {
      setSelectedBlockId(null)
    }
  }

  const moveBlock = (fromIndex: number, toIndex: number) => {
    setBlocks(prev => {
      const newBlocks = [...prev]
      const [removed] = newBlocks.splice(fromIndex, 1)
      newBlocks.splice(toIndex, 0, removed)
      return newBlocks
    })
  }

  const selectBlock = (id: string | null) => {
    setSelectedBlockId(id)
  }

  const clearBlocks = () => {
    setBlocks([])
    setSelectedBlockId(null)
  }

  const loadBlocks = (newBlocks: BlockData[]) => {
    setBlocks(newBlocks)
    setSelectedBlockId(null)
  }

  const getPageData = (): PageBuilderData => {
    return {
      blocks,
      settings: {
        layout: 'full',
        maxWidth: '1280px',
      }
    }
  }

  return (
    <PageBuilderContext.Provider
      value={{
        blocks,
        selectedBlockId,
        addBlock,
        updateBlock,
        deleteBlock,
        moveBlock,
        selectBlock,
        clearBlocks,
        loadBlocks,
        getPageData,
      }}
    >
      {children}
    </PageBuilderContext.Provider>
  )
}

export const usePageBuilder = () => {
  const context = useContext(PageBuilderContext)
  if (!context) {
    throw new Error('usePageBuilder must be used within PageBuilderProvider')
  }
  return context
}
