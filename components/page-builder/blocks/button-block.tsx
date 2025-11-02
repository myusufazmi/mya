import { ButtonBlockContent } from '@/types/page-builder'

export function ButtonBlock({ content }: { content: ButtonBlockContent }) {
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20',
    ghost: 'text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20',
  }

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  return (
    <a
      href={content.url}
      target={content.target || '_self'}
      className={`inline-block rounded-lg font-semibold transition ${variantClasses[content.variant]} ${sizeClasses[content.size]} ${content.fullWidth ? 'w-full text-center' : ''}`}
    >
      {content.text}
    </a>
  )
}
