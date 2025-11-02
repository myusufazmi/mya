'use client'

import { useState } from 'react'
import { GalleryBlockContent } from '@/lib/page-builder/types'
import { X } from 'lucide-react'

export function GalleryBlock({ content }: { content: GalleryBlockContent }) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)

  const columns = content.columns || 3
  const gap = content.gap || 'md'
  const aspectRatio = content.aspectRatio || 'square'

  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
    5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
  }

  const gapClass: Record<string, string> = {
    none: 'gap-0',
    xs: 'gap-1',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
    '2xl': 'gap-10',
  }

  const aspectClass = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    auto: '',
  }

  const openLightbox = (index: number) => {
    if (content.lightbox) {
      setSelectedImage(index)
      setLightboxOpen(true)
    }
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % content.images.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + content.images.length) % content.images.length)
  }

  return (
    <>
      <div className={`grid ${gridCols[columns]} ${gapClass[gap]}`}>
        {content.images.map((image, index) => (
          <div
            key={index}
            className={`${aspectClass[aspectRatio]} overflow-hidden rounded-lg cursor-pointer group relative`}
            onClick={() => openLightbox(index)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            {image.caption && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-sm">{image.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            <X className="h-6 w-6 text-white" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            <svg
              className="h-6 w-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div className="max-w-4xl max-h-[90vh] p-4">
            <img
              src={content.images[selectedImage].src}
              alt={content.images[selectedImage].alt}
              className="max-w-full max-h-full object-contain"
            />
            {content.images[selectedImage].caption && (
              <p className="text-white text-center mt-4">
                {content.images[selectedImage].caption}
              </p>
            )}
          </div>

          <button
            onClick={nextImage}
            className="absolute right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            <svg
              className="h-6 w-6 text-white"
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
          </button>
        </div>
      )}
    </>
  )
}
