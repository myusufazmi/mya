import { HeroBlockContent } from '@/types/page-builder'

export function HeroBlock({ content }: { content: HeroBlockContent }) {
  const alignClass = content.textAlign === 'center' ? 'text-center' : content.textAlign === 'right' ? 'text-right' : 'text-left'
  
  let bgStyle: React.CSSProperties = {}
  
  if (content.backgroundType === 'color') {
    bgStyle.backgroundColor = content.backgroundColor
  } else if (content.backgroundType === 'gradient' && content.gradient) {
    bgStyle.background = `linear-gradient(${content.gradient.direction || 'to-r'}, ${content.gradient.from}, ${content.gradient.to})`
  } else if (content.backgroundType === 'image' && content.backgroundImage) {
    bgStyle.backgroundImage = `url(${content.backgroundImage})`
    bgStyle.backgroundSize = 'cover'
    bgStyle.backgroundPosition = 'center'
  }

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ ...bgStyle, minHeight: content.minHeight || '500px' }}
    >
      {content.overlay && (
        <div 
          className="absolute inset-0 bg-black"
          style={{ opacity: content.overlayOpacity || 0.5 }}
        />
      )}
      
      <div className={`relative z-10 max-w-4xl mx-auto px-4 ${alignClass}`}>
        {content.subtitle && (
          <p className="text-xl text-white/90 mb-4">
            {content.subtitle}
          </p>
        )}
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          {content.title}
        </h1>
        {content.description && (
          <p className="text-xl text-white/80 mb-8">
            {content.description}
          </p>
        )}
        {content.buttons && content.buttons.length > 0 && (
          <div className="flex flex-wrap gap-4 justify-center">
            {content.buttons.map((btn, idx) => (
              <a
                key={idx}
                href={btn.url}
                className={`px-8 py-4 rounded-lg font-semibold transition ${
                  btn.style === 'primary' 
                    ? 'bg-white text-gray-900 hover:bg-gray-100'
                    : btn.style === 'secondary'
                    ? 'bg-gray-800 text-white hover:bg-gray-700'
                    : 'border-2 border-white text-white hover:bg-white/10'
                }`}
              >
                {btn.text}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
