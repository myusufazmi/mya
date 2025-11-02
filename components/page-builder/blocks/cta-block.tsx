'use client'

import { CTABlockContent } from '@/lib/page-builder/types'

export function CTABlock({ content }: { content: CTABlockContent }) {
  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
  }

  const buttonVariant = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
    outline: 'border-2 border-current hover:bg-current/10',
  }

  const alignment = content.alignment || 'center'
  const variant = content.buttonVariant || 'primary'

  return (
    <div
      className={`py-16 px-6 rounded-lg ${alignClass[alignment]}`}
      style={{
        backgroundColor: content.backgroundColor || '#F3F4F6',
        color: content.textColor || '#111827',
      }}
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {content.title}
        </h2>
        {content.description && (
          <p className="text-lg md:text-xl mb-8 opacity-90">
            {content.description}
          </p>
        )}
        <a
          href={content.buttonUrl}
          className={`inline-block px-8 py-4 rounded-lg font-semibold transition ${buttonVariant[variant]}`}
        >
          {content.buttonText}
        </a>
      </div>
    </div>
  )
}
