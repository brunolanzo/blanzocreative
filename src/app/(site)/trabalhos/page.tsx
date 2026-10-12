import type { Metadata } from 'next'
import { WorkIndex } from '@/components/work/WorkIndex'
import { getSettings } from '@/sanity/lib/settings'

export async function generateMetadata(): Promise<Metadata> {
  const { ui } = await getSettings()
  return { title: ui.navWork, alternates: { canonical: '/trabalhos' } }
}

export default function WorkPage() {
  return <WorkIndex tag={null} />
}
