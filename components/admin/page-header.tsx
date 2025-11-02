import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface Breadcrumb {
  label: string
  href?: string
}

interface PageHeaderAction {
  label: string
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  icon?: React.ReactNode
}

interface PageHeaderProps {
  title: string
  description?: string
  breadcrumbs?: Breadcrumb[]
  actions?: PageHeaderAction[]
}

export function PageHeader({
  title,
  description,
  breadcrumbs,
  actions,
}: PageHeaderProps) {
  return (
    <div className="mb-6">
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center space-x-2">
              {index > 0 && <ChevronRight className="h-4 w-4" />}
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="hover:text-gray-900 dark:hover:text-white transition"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-gray-900 dark:text-white font-medium">
                  {crumb.label}
                </span>
              )}
            </div>
          ))}
        </nav>
      )}

      {/* Header Content */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {title}
          </h1>
          {description && (
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {description}
            </p>
          )}
        </div>

        {/* Actions */}
        {actions && actions.length > 0 && (
          <div className="flex items-center gap-3">
            {actions.map((action, index) => {
              const isPrimary = action.variant !== 'secondary'
              const buttonClass = isPrimary
                ? 'inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium'
                : 'inline-flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition font-medium'

              if (action.href) {
                return (
                  <Link key={index} href={action.href} className={buttonClass}>
                    {action.icon && <span>{action.icon}</span>}
                    <span>{action.label}</span>
                  </Link>
                )
              }

              return (
                <button
                  key={index}
                  onClick={action.onClick}
                  className={buttonClass}
                >
                  {action.icon && <span>{action.icon}</span>}
                  <span>{action.label}</span>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
