/**
 * Page Builder - Main Export
 */

export * from './types'
export * from './block-registry'
export { blockRegistry } from './block-registry'
export * from './blocks'

// Initialize and register blocks
import { blockRegistry } from './block-registry'
import { coreBlocks } from './blocks'

/**
 * Register all core blocks
 */
export function registerCoreBlocks(): void {
  try {
    blockRegistry.registerMany(coreBlocks)
    console.log(`Registered ${coreBlocks.length} core blocks`)
  } catch (error) {
    console.error('Failed to register core blocks:', error)
  }
}
