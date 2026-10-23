import { AppLink } from '@/components/navigation/AppLink'
import { SanityImage } from '@/components/media/SanityImage'
import { Display } from '@/components/ui/Display'
import { Eyebrow } from '@/components/ui/Eyebrow'
import type { ProjectCardData } from '@/components/work/ProjectCard'
import { videoPoster } from '@/lib/media'
import type { UiStrings } from '@/lib/ui-strings'
import { Reveal } from '@/components/motion/Reveal'

/** "Próximo projeto": o bloco inteiro é um link. Hover do DS: mídia cresce 1.04 e o título fica vermelho-rosado. */
export function NextProject({ project, ui }: { project: ProjectCardData; ui: Pick<UiStrings, 'nextProject' | 'viewProject'> }) {
  const thumbnail = project.thumbnail
  const poster = thumbnail?.kind === 'video' ? videoPoster(thumbnail.video, 1600) : undefined
  return (
    <Reveal as="section" className="container-site border-t border-hairline py-section">
      <AppLink href={`/work/${project.slug}`} className="group grid items-center gap-32 md:grid-cols-12 md:gap-x-32">
        <div className="flex flex-col items-start gap-16 md:col-span-5">
          <Eyebrow>{ui.nextProject}</Eyebrow>
          <Display as="p" size="m" className="transition-colors duration-220 ease-out group-hover:text-flash-500">
            {project.title}
          </Display>
          {project.client && <p className="text-body text-fg-secondary">{project.client}</p>}
          <span className="mt-8 text-label font-medium uppercase transition-colors duration-220 ease-out group-hover:text-flash-500">
            {ui.viewProject} →
          </span>
        </div>
        <div className="relative aspect-card overflow-hidden rounded-md bg-raised md:col-span-7">
          <div className="absolute inset-0 transition-transform duration-800 ease-out group-hover:scale-[1.04]">
            {poster ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={poster} alt="" loading="lazy" decoding="async" className="size-full object-cover" />
            ) : (
              <SanityImage
                image={thumbnail?.image}
                sizes="(min-width: 768px) 58vw, 100vw"
                fill
                decorative
                className="object-cover"
              />
            )}
          </div>
        </div>
      </AppLink>
    </Reveal>
  )
}
