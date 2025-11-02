'use client'

import { PageBuilderProvider } from '@/components/page-builder/page-builder-provider'
import { PageBuilder } from '@/components/page-builder/page-builder'

export default function PageBuilderPage() {
  return (
    <PageBuilderProvider>
      <PageBuilder />
    </PageBuilderProvider>
  )
}
