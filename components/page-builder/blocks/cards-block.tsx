'use client'

import { CardBlockContent } from '@/lib/page-builder/types'

interface CardsBlockContent {
  cards: CardBlockContent[]
  columns?: 2 | 3 | 4
  gap?: string
}

export function CardsBlock({ content }: { content: CardsBlockContent }) {
  const columns = content.columns || 3
  const gap = content.gap || '1.5rem'

  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <div 
      className={`grid ${gridCols[columns]} gap-6`}
      style={{ gap }}
    >
      {content.cards.map((card, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
        >
          {card.image && (
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {card.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {card.description}
            </p>
            {card.link && card.buttonText && (
              <a
                href={card.link}
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
              >
                {card.buttonText}
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
