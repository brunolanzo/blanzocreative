import { defineArrayMember } from 'sanity'
import { beforeAfterBlock } from './beforeAfterBlock'
import { compositionBlock, compositionItem } from './compositionBlock'
import { creditsBlock } from './creditsBlock'
import { embedBlock } from './embedBlock'
import { galleryBlock } from './galleryBlock'
import { imageBlock } from './imageBlock'
import { mosaicBlock } from './mosaicBlock'
import { quoteBlock } from './quoteBlock'
import { spacerBlock } from './spacerBlock'
import { splitBlock } from './splitBlock'
import { textBlock } from './textBlock'
import { videoBlock } from './videoBlock'

/** Ordem em que os blocos aparecem no menu "Adicionar bloco" do painel. */
export const pageBlockTypes = [
  videoBlock,
  imageBlock,
  mosaicBlock,
  splitBlock,
  beforeAfterBlock,
  compositionBlock,
  galleryBlock,
  textBlock,
  quoteBlock,
  creditsBlock,
  embedBlock,
  spacerBlock,
]

export const blockSchemaTypes = [...pageBlockTypes, compositionItem]

/** Membros do array "Corpo da página" do projeto. */
export const pageBuilderMembers = pageBlockTypes.map((block) => defineArrayMember({ type: block.name }))
