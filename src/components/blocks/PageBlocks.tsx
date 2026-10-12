import { BeforeAfterBlock } from './BeforeAfterBlock'
import { CompositionBlock } from './CompositionBlock'
import { CreditsBlock } from './CreditsBlock'
import { EmbedBlock } from './EmbedBlock'
import { GalleryBlock } from './GalleryBlock'
import { ImageBlock } from './ImageBlock'
import { MosaicBlock } from './MosaicBlock'
import { QuoteBlock } from './QuoteBlock'
import { SpacerBlock } from './SpacerBlock'
import { SplitBlock } from './SplitBlock'
import { TextBlock } from './TextBlock'
import type { BlockUi, PageBlock } from './types'
import { VideoBlock } from './VideoBlock'

/**
 * Corpo da página de projeto: cada bloco do construtor do painel vira o componente dele.
 * Para criar um tipo novo de bloco, veja o passo a passo no CLAUDE.md.
 */
export function PageBlocks({ blocks, ui }: { blocks: PageBlock[] | null | undefined; ui: BlockUi }) {
  if (!blocks?.length) return null
  return (
    <>
      {blocks.map((block) => {
        switch (block._type) {
          case 'videoBlock':
            return <VideoBlock key={block._key} block={block} ui={ui} />
          case 'imageBlock':
            return <ImageBlock key={block._key} block={block} />
          case 'mosaicBlock':
            return <MosaicBlock key={block._key} block={block} />
          case 'splitBlock':
            return <SplitBlock key={block._key} block={block} />
          case 'beforeAfterBlock':
            return <BeforeAfterBlock key={block._key} block={block} ui={ui} />
          case 'compositionBlock':
            return <CompositionBlock key={block._key} block={block} />
          case 'galleryBlock':
            return <GalleryBlock key={block._key} block={block} ui={ui} />
          case 'textBlock':
            return <TextBlock key={block._key} block={block} />
          case 'quoteBlock':
            return <QuoteBlock key={block._key} block={block} />
          case 'creditsBlock':
            return <CreditsBlock key={block._key} block={block} ui={ui} />
          case 'embedBlock':
            return <EmbedBlock key={block._key} block={block} ui={ui} />
          case 'spacerBlock':
            return <SpacerBlock key={block._key} block={block} />
          default:
            return null
        }
      })}
    </>
  )
}
