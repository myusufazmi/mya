import { LucideIcon } from 'lucide-react'
import Link from 'next/link'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  action?: {
    label: string
    href?: string
    onClick?: () => void
  }
  secondaryAction?: {
    label: string
    href?: string
    onClick?: () => void
  }
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  secondaryAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      {/* Icon */}
      <div className="mb-4 rounded-full bg-gray-100 dark:bg-gray-800 p-6">
        <Icon className="h-12 w-12 text-gray-400 dark:text-gray-500" />
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-md">
        {description}
      </p>

      {/* Actions */}
      {(action || secondaryAction) && (
        <div className="flex items-center gap-3">
          {action && (
            action.href ? (
              <Link
                href={action.href}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
              >
                {action.label}
              </Link>
            ) : (
              <button
                onClick={action.onClick}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
              >
                {action.label}
              </button>
            )
          )}

          {secondaryAction && (
            secondaryAction.href ? (
              <Link
                href={secondaryAction.href}
                className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                {secondaryAction.label}
              </Link>
            ) : (
              <button
                onClick={secondaryAction.onClick}
                className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                {secondaryAction.label}
              </button>
            )
          )}
        </div>
      )}
    </div>
  )
}
