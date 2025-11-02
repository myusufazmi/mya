/**
 * Block Registry
 * Central registry for all page builder blocks
 */

import { BlockDefinition, BlockCategory } from './types'

class BlockRegistry {
  private static instance: BlockRegistry
  private blocks: Map<string, BlockDefinition> = new Map()

  private constructor() {}

  /**
   * Get singleton instance
   */
  static getInstance(): BlockRegistry {
    if (!BlockRegistry.instance) {
      BlockRegistry.instance = new BlockRegistry()
    }
    return BlockRegistry.instance
  }

  /**
   * Register a block
   */
  register(block: BlockDefinition): void {
    if (this.blocks.has(block.type)) {
      console.warn(`Block type "${block.type}" is already registered`)
      return
    }

    this.blocks.set(block.type, block)
    console.log(`Block registered: ${block.label} (${block.type})`)
  }

  /**
   * Register multiple blocks
   */
  registerMany(blocks: BlockDefinition[]): void {
    blocks.forEach(block => this.register(block))
  }

  /**
   * Unregister a block
   */
  unregister(type: string): void {
    this.blocks.delete(type)
    console.log(`Block unregistered: ${type}`)
  }

  /**
   * Get block definition
   */
  get(type: string): BlockDefinition | undefined {
    return this.blocks.get(type)
  }

  /**
   * Get all blocks
   */
  getAll(): BlockDefinition[] {
    return Array.from(this.blocks.values())
  }

  /**
   * Get blocks by category
   */
  getByCategory(category: BlockCategory): BlockDefinition[] {
    return this.getAll().filter(block => block.category === category)
  }

  /**
   * Search blocks
   */
  search(query: string): BlockDefinition[] {
    const lowercaseQuery = query.toLowerCase()
    return this.getAll().filter(block => 
      block.label.toLowerCase().includes(lowercaseQuery) ||
      block.type.toLowerCase().includes(lowercaseQuery) ||
      block.description?.toLowerCase().includes(lowercaseQuery)
    )
  }

  /**
   * Check if block exists
   */
  has(type: string): boolean {
    return this.blocks.has(type)
  }

  /**
   * Get block count
   */
  count(): number {
    return this.blocks.size
  }

  /**
   * Get all categories
   */
  getCategories(): BlockCategory[] {
    const categories = new Set<BlockCategory>()
    this.getAll().forEach(block => categories.add(block.category))
    return Array.from(categories)
  }

  /**
   * Clear all blocks (for testing)
   */
  clear(): void {
    this.blocks.clear()
    console.log('All blocks cleared')
  }
}

// Export singleton instance
export const blockRegistry = BlockRegistry.getInstance()
