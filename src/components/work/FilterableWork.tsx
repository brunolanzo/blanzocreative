'use client'

import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/cn'
import { useReducedMotion } from '@/lib/environment'
import { rememberList } from '@/lib/last-list'
import { DURATION, EASE, REVEAL_DISTANCE, STAGGER } from '@/lib/motion'
import { scrollToElement } from '@/lib/smooth-scroll'
import type { UiStrings } from '@/lib/ui-strings'
import { onBeforeUrlTagChange, pushUrlTag, useUrlTag } from '@/lib/url-tag'
import { ProjectCard, type ProjectCardData } from './ProjectCard'
import { type FilterTag, TagFilter } from './TagFilter'

gsap.registerPlugin(Flip)

const HOME_LIMIT = 8

type Labels = Pick<UiStrings, 'allTags' | 'filterLabel' | 'viewAllWork' | 'loadMore' | 'emptyFilter'>

type FilterableWorkProps = {
  projects: ProjectCardData[]
  tags: FilterTag[]
  ui: Labels
} & (
  | { mode: 'home'; featured: ProjectCardData[] }
  | { mode: 'index'; initialTag: string | null; documentTitles: Record<string, string>; pageSize?: number }
)

const hasTag = (tag: string) => (project: ProjectCardData) => project.tags?.some((item) => item.slug === tag) ?? false

/** Home: destaques; com tag, primeiro os destaques daquela tag e depois a ordem geral (máx. 8). */
function homeSelection(projects: ProjectCardData[], featured: ProjectCardData[], tag: string | null) {
  if (!tag) return (featured.length > 0 ? featured : projects).slice(0, HOME_LIMIT)
  const featuredIds = new Set(featured.map((project) => project._id))
  const first = featured.filter(hasTag(tag))
  const rest = projects.filter((project) => hasTag(tag)(project) && !featuredIds.has(project._id))
  return [...first, ...rest].slice(0, HOME_LIMIT)
}

/**
 * Grid de projetos com filtro por tag, igual na home e em /work.
 * A troca de filtro anima sem pulo de layout: os cards que saem somem, os que ficam
 * deslizam até o lugar novo (GSAP Flip) e a altura do grid acompanha.
 */
export function FilterableWork(props: FilterableWorkProps) {
  const { projects, tags, ui, mode } = props
  const pageSize = props.mode === 'index' ? (props.pageSize ?? 12) : HOME_LIMIT
  const reduced = useReducedMotion()
  const grid = useRef<HTMLUListElement>(null)
  const bar = useRef<HTMLDivElement>(null)
  const pending = useRef<{ state: Flip.FlipState; height: number } | null>(null)
  const revealFrom = useRef<number | null>(null)
  const fading = useRef<gsap.core.Tween | null>(null)

  const urlTag = useUrlTag(props.mode === 'index' ? props.initialTag : null)
  const [homeTag, setHomeTag] = useState<string | null>(null)
  const [shown, setShown] = useState(pageSize)
  // A pílula clicada acende na hora; o grid troca depois que os cards que saem somem.
  const [choosing, setChoosing] = useState<{ tag: string | null } | null>(null)

  const knownTags = useMemo(() => new Set(tags.map((tag) => tag.slug)), [tags])
  const requested = mode === 'index' ? urlTag : homeTag
  const activeTag = requested && knownTags.has(requested) ? requested : null

  function selectionFor(tag: string | null) {
    if (props.mode === 'home') return homeSelection(projects, props.featured, tag)
    return tag ? projects.filter(hasTag(tag)) : projects
  }

  const selection = selectionFor(activeTag)
  const visible = props.mode === 'index' ? selection.slice(0, shown) : selection
  const highlighted = choosing ? choosing.tag : activeTag

  function capture() {
    const element = grid.current
    if (reduced || !element) return
    pending.current = {
      state: Flip.getState(element.querySelectorAll('[data-card]')),
      height: element.offsetHeight,
    }
  }

  const documentTitle = props.mode === 'index' ? props.documentTitles[activeTag ?? ''] : undefined
  useEffect(() => {
    if (documentTitle) document.title = documentTitle
  }, [documentTitle])

  // Voltar/avançar do navegador em /work: anima a troca e volta ao primeiro lote.
  useEffect(() => {
    if (mode !== 'index') return
    return onBeforeUrlTagChange(() => {
      capture()
      setShown(pageSize)
    })
    // capture lê só refs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, pageSize, reduced])

  // Roda depois de toda renderização, mas só age quando há uma troca capturada.
  useLayoutEffect(() => {
    const saved = pending.current
    const element = grid.current
    if (!saved || !element) return
    pending.current = null
    const height = element.offsetHeight
    Flip.from(saved.state, {
      targets: element.querySelectorAll('[data-card]'),
      duration: DURATION.base,
      ease: EASE.out,
      onEnter: (entering) =>
        gsap.fromTo(
          entering,
          { opacity: 0, y: REVEAL_DISTANCE },
          { opacity: 1, y: 0, duration: DURATION.base, ease: EASE.out, stagger: STAGGER, clearProps: 'opacity,transform' },
        ),
    })
    gsap.fromTo(element, { height: saved.height }, { height, duration: DURATION.base, ease: EASE.out, clearProps: 'height' })
  })

  // "Carregar mais": os cards novos entram em sequência e o foco vai para o primeiro.
  useLayoutEffect(() => {
    const from = revealFrom.current
    const element = grid.current
    if (from === null || !element) return
    revealFrom.current = null
    const added = Array.from(element.querySelectorAll<HTMLElement>('[data-card]')).slice(from)
    added[0]?.querySelector<HTMLAnchorElement>('[data-card-link]')?.focus({ preventScroll: true })
    if (reduced) return
    gsap.fromTo(
      added,
      { opacity: 0, y: REVEAL_DISTANCE },
      { opacity: 1, y: 0, duration: DURATION.base, ease: EASE.out, stagger: STAGGER, clearProps: 'opacity,transform' },
    )
  }, [shown, reduced])

  function changeTag(next: string | null) {
    if (next === highlighted) return
    const cards = Array.from(grid.current?.querySelectorAll<HTMLElement>('[data-card]') ?? [])
    if (fading.current) {
      fading.current.kill()
      fading.current = null
      gsap.set(cards, { clearProps: 'opacity' })
    }
    if (next === activeTag) {
      // Voltou ao filtro atual antes de a troca terminar: só desfaz o sumiço.
      setChoosing(null)
      return
    }

    setChoosing({ tag: next })
    const commit = () => {
      fading.current = null
      capture()
      setChoosing(null)
      if (props.mode === 'index') {
        setShown(pageSize)
        pushUrlTag(next)
      } else {
        setHomeTag(next)
      }
    }
    const nextIds = new Set(selectionFor(next).map((project) => project._id))
    const leaving = cards.filter((card) => !nextIds.has(card.dataset.card ?? ''))
    if (reduced || leaving.length === 0) {
      commit()
      return
    }
    fading.current = gsap.to(leaving, { opacity: 0, duration: DURATION.fast, ease: EASE.out, onComplete: commit })
  }

  function filterFromCard(slug: string) {
    changeTag(slug)
    if (bar.current && bar.current.getBoundingClientRect().top < 0) scrollToElement(bar.current)
  }

  function loadMore() {
    revealFrom.current = shown
    setShown((count) => count + pageSize)
  }

  const viewAllHref = activeTag ? `/work?tag=${activeTag}` : '/work'

  return (
    <div>
      <div ref={bar}>
        <TagFilter
          tags={tags}
          active={highlighted}
          allLabel={ui.allTags}
          groupLabel={ui.filterLabel}
          onChange={changeTag}
        />
      </div>

      <ul ref={grid} className="mt-32 grid gap-x-32 gap-y-48 md:grid-cols-2">
        {visible.map((project, index) => (
          <li key={project._id} data-card={project._id} className="md:even:pt-48">
            <ProjectCard
              project={project}
              priority={mode === 'index' && index < 2}
              headingLevel={mode === 'index' ? 'h2' : 'h3'}
              onTagClick={filterFromCard}
              onOpen={() => rememberList(activeTag)}
            />
          </li>
        ))}
      </ul>

      {visible.length === 0 && <p className="text-body-l text-fg-secondary">{ui.emptyFilter}</p>}

      <div className={cn('mt-64 flex flex-wrap items-center gap-16', mode === 'index' && 'justify-center')}>
        {mode === 'home' && (
          <Button href={viewAllHref} variant="ghost" className="-ml-[26px]">
            {ui.viewAllWork} →
          </Button>
        )}
        {mode === 'index' && selection.length > visible.length && (
          <Button variant="outline" onClick={loadMore}>
            {ui.loadMore}
          </Button>
        )}
      </div>
    </div>
  )
}
