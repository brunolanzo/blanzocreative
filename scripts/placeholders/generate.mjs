/**
 * Gera as mídias provisórias (placeholders) usadas pelo seed, no visual do design system:
 * fundo preto, linha fina, texto em Manrope (grátis) e o ponto vermelho-rosado.
 * Cada imagem traz escrito o formato e o tamanho, para avaliar o layout de verdade.
 *
 * Uso: npm run placeholders   (os arquivos vão para scripts/placeholders/out/)
 */
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import ffmpegPath from 'ffmpeg-static'
import opentype from 'opentype.js'
import sharp from 'sharp'

const ROOT = path.dirname(fileURLToPath(import.meta.url))
export const OUT_DIR = path.join(ROOT, 'out')

// Tokens do DS (tokens/colors.css)
const INK_1000 = '#000000'
const INK_900 = '#0A0A0A'
const INK_800 = '#141414'
const INK_700 = '#1E1E1E'
const INK_600 = '#2C2C2C'
const INK_400 = '#6E6E6E'
const INK_300 = '#9B9B9B'
const PAPER = '#FFFFFF'
const FLASH_500 = '#FF2E5B'

const fontFile = (weight) =>
  path.join(ROOT, '../../node_modules/@fontsource/manrope/files', `manrope-latin-${weight}-normal.woff`)
const loadFont = (weight) => opentype.parse(fs.readFileSync(fontFile(weight)).buffer)
const FONT = { 400: loadFont(400), 500: loadFont(500) }

/**
 * Texto convertido em caminho vetorial (não depende de fonte instalada).
 * O espaçamento entre letras é aplicado letra a letra: a opção letterSpacing
 * do opentype.js deforma alguns glifos (ex.: o "9").
 */
function layoutText(text, { x, y, size, weight = 500, tracking = 0 }) {
  const font = FONT[weight]
  const scale = size / font.unitsPerEm
  const glyphs = font.stringToGlyphs(text)
  const paths = []
  let cursor = x
  glyphs.forEach((glyph, index) => {
    paths.push(glyph.getPath(cursor, y, size).toPathData(2))
    const next = glyphs[index + 1]
    const kerning = next ? font.getKerningValue(glyph, next) * scale : 0
    cursor += (glyph.advanceWidth ?? 0) * scale + kerning + (next ? tracking * size : 0)
  })
  return { d: paths.join(' '), width: cursor - x }
}

function textPath(text, { fill = PAPER, ...options }) {
  return `<path d="${layoutText(text, options).d}" fill="${fill}"/>`
}

function textWidth(text, size, weight = 500, tracking = 0) {
  return layoutText(text, { x: 0, y: 0, size, weight, tracking }).width
}

/** Imagem provisória: proporção grande com ponto vermelho, tamanho, rótulo e título. */
function placeholderSvg({ width, height, ratio, label, title, background = INK_900, dot }) {
  const unit = Math.min(width, height)
  const pad = Math.round(unit * 0.06)
  const big = Math.round(unit * 0.22)
  const small = Math.max(14, Math.round(unit * 0.028))
  const ratioText = ratio.toLowerCase()
  const ratioWidth = textWidth(ratioText, big, 500, -0.04)
  const baseline = height / 2 + big * 0.35
  const parts = [
    `<rect width="100%" height="100%" fill="${background}"/>`,
    `<rect x="${pad / 2}" y="${pad / 2}" width="${width - pad}" height="${height - pad}" fill="none" stroke="${INK_600}" stroke-width="2"/>`,
    textPath(label.toUpperCase(), { x: pad, y: pad + small * 1.6, size: small, weight: 500, fill: INK_400, tracking: 0.16 }),
    textPath(ratioText, { x: pad, y: baseline, size: big, weight: 500, fill: PAPER, tracking: -0.04 }),
    `<circle cx="${pad + ratioWidth + big * 0.12}" cy="${baseline - big * 0.06}" r="${big * 0.07}" fill="${FLASH_500}"/>`,
    textPath(`${width} × ${height}`, { x: pad, y: baseline + small * 3, size: small * 1.4, weight: 400, fill: INK_300 }),
  ]
  if (title) {
    parts.push(textPath(title.toLowerCase(), { x: pad, y: height - pad, size: small * 1.6, weight: 500, fill: PAPER, tracking: -0.02 }))
  }
  if (dot) {
    parts.push(`<circle cx="${dot.x}" cy="${dot.y}" r="${unit * 0.03}" fill="${FLASH_500}"/>`)
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">${parts.join('')}</svg>`
}

async function writeImage(name, options) {
  const file = path.join(OUT_DIR, `${name}.jpg`)
  await sharp(Buffer.from(placeholderSvg(options))).jpeg({ quality: 82, mozjpeg: true }).toFile(file)
  return file
}

/** GIF animado (para testar que GIFs continuam animados no site). */
async function writeGif(name, { width, height, frames = 16 }) {
  const images = []
  for (let i = 0; i < frames; i += 1) {
    const angle = (i / frames) * Math.PI * 2
    const dot = { x: width * (0.62 + 0.18 * Math.cos(angle)), y: height * (0.5 + 0.22 * Math.sin(angle)) }
    const svg = placeholderSvg({ width, height, ratio: '4:3', label: 'animated gif', title: 'gif loop', dot })
    images.push(await sharp(Buffer.from(svg)).png().toBuffer())
  }
  const file = path.join(OUT_DIR, `${name}.gif`)
  await sharp(images, { join: { animated: true } }).gif({ delay: Array(frames).fill(80), loop: 0 }).toFile(file)
  return file
}

/** Camada de texto transparente para os vídeos. */
async function overlayPng(name, { width, height, ratio, label, note }) {
  const unit = Math.min(width, height)
  const pad = Math.round(unit * 0.07)
  const big = Math.round(unit * 0.2)
  const small = Math.max(16, Math.round(unit * 0.03))
  const baseline = height / 2 + big * 0.35
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    ${textPath(label.toUpperCase(), { x: pad, y: pad + small * 1.6, size: small, fill: INK_400, tracking: 0.16 })}
    ${textPath(ratio, { x: pad, y: baseline, size: big, fill: PAPER, tracking: -0.04 })}
    ${textPath(note, { x: pad, y: baseline + small * 3, size: small * 1.3, weight: 400, fill: INK_300 })}
  </svg>`
  const file = path.join(OUT_DIR, `${name}-overlay.png`)
  await sharp(Buffer.from(svg)).png().toFile(file)
  return file
}

/** MP4 em loop perfeito: um ponto vermelho-rosado em órbita sobre preto, com o formato escrito. */
async function writeVideo(name, { width, height, seconds, period, ratio, label, note, sound = false }) {
  const overlay = await overlayPng(name, { width, height, ratio, label, note })
  const dotSize = Math.round(Math.min(width, height) * 0.06)
  const dot = path.join(OUT_DIR, `${name}-dot.png`)
  await sharp(
    Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${dotSize}" height="${dotSize}"><circle cx="${dotSize / 2}" cy="${dotSize / 2}" r="${dotSize / 2}" fill="${FLASH_500}"/></svg>`,
    ),
  )
    .png()
    .toFile(dot)

  const file = path.join(OUT_DIR, `${name}.mp4`)
  const orbitX = `(W*0.68-w/2)+W*0.18*cos(2*PI*t/${period})`
  const orbitY = `(H/2-h/2)+H*0.22*sin(2*PI*t/${period})`
  const args = [
    '-y',
    '-f', 'lavfi', '-i', `color=c=${INK_1000}:s=${width}x${height}:r=30:d=${seconds}`,
    '-i', overlay,
    '-loop', '1', '-i', dot,
  ]
  if (sound) {
    args.push('-f', 'lavfi', '-i', `sine=frequency=220:sample_rate=48000:duration=${seconds}`)
  }
  const audioFilter = sound ? `;[3:a]volume=0.15,afade=t=in:d=0.08,afade=t=out:st=${seconds - 0.08}:d=0.08[a]` : ''
  args.push(
    '-filter_complex',
    `[0:v][1:v]overlay=0:0[bg];[bg][2:v]overlay=x='${orbitX}':y='${orbitY}':shortest=1,format=yuv420p[v]${audioFilter}`,
    '-map', '[v]',
  )
  if (sound) args.push('-map', '[a]', '-c:a', 'aac', '-b:a', '96k')
  else args.push('-an')
  args.push('-t', String(seconds), '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '30', '-movflags', '+faststart', file)
  execFileSync(ffmpegPath, args, { stdio: 'ignore' })
  fs.rmSync(overlay)
  fs.rmSync(dot)
  // Poster: um quadro do próprio vídeo. É ele que diz ao site o formato do vídeo antes de tocar.
  execFileSync(
    ffmpegPath,
    ['-y', '-ss', '0.5', '-i', file, '-frames:v', '1', '-q:v', '3', path.join(OUT_DIR, `${name}-poster.jpg`)],
    { stdio: 'ignore' },
  )
  return file
}

/** Lista de todas as mídias provisórias. Os nomes são usados pelo seed. Os textos desenhados nelas são em inglês, como o site. */
export const IMAGES = {
  'reel-poster': { width: 2400, height: 1350, ratio: '16:9', label: 'reel poster', title: 'demo reel' },
  'img-16x9': { width: 2400, height: 1350, ratio: '16:9', label: 'full-bleed image' },
  'img-21x9': { width: 2520, height: 1080, ratio: '21:9', label: 'cinema image' },
  'img-3x2': { width: 1800, height: 1200, ratio: '3:2', label: 'image' },
  'img-4x3': { width: 1600, height: 1200, ratio: '4:3', label: 'image', background: INK_800 },
  'img-1x1-a': { width: 1200, height: 1200, ratio: '1:1', label: 'mosaic', title: '01' },
  'img-1x1-b': { width: 1200, height: 1200, ratio: '1:1', label: 'mosaic', title: '02', background: INK_800 },
  'img-1x1-c': { width: 1200, height: 1200, ratio: '1:1', label: 'mosaic', title: '03', background: INK_700 },
  'img-4x5-a': { width: 1200, height: 1500, ratio: '4:5', label: 'vertical', title: '01' },
  'img-4x5-b': { width: 1200, height: 1500, ratio: '4:5', label: 'vertical', title: '02', background: INK_800 },
  'img-4x5-c': { width: 1200, height: 1500, ratio: '4:5', label: 'vertical', title: '03', background: INK_700 },
  'img-9x16': { width: 1080, height: 1920, ratio: '9:16', label: 'stories' },
  'img-before': { width: 1600, height: 1000, ratio: 'before', label: 'before and after', background: INK_800 },
  'img-after': { width: 1600, height: 1000, ratio: 'after', label: 'before and after', background: INK_700 },
  'about-portrait': { width: 1200, height: 1500, ratio: '4:5', label: 'about photo', title: 'portrait' },
  'share-default': { width: 1200, height: 630, ratio: '1200×630', label: 'share image', title: 'blanzo creative studio' },
}

export const VIDEOS = {
  'reel-loop': { width: 1280, height: 720, seconds: 10, period: 5, ratio: '16:9', label: 'reel loop', note: '1280 × 720 · with sound, to test the button', sound: true },
  'video-16x9': { width: 1280, height: 720, seconds: 6, period: 3, ratio: '16:9', label: 'video', note: '1280 × 720 · with sound', sound: true },
  'video-1x1': { width: 1080, height: 1080, seconds: 6, period: 3, ratio: '1:1', label: 'video loop', note: '1080 × 1080 · no sound' },
  'video-9x16': { width: 720, height: 1280, seconds: 6, period: 3, ratio: '9:16', label: 'vertical video', note: '720 × 1280 · no sound' },
  'preview-3x2': { width: 1200, height: 800, seconds: 6, period: 3, ratio: '3:2', label: 'card preview', note: 'short loop, no sound' },
}

/** Thumb 3:2 de um projeto, com o título escrito. */
export function projectThumb(slug, title) {
  return [`thumb-${slug}`, { width: 1800, height: 1200, ratio: '3:2', label: 'card thumbnail', title }]
}

export async function generateAll(projects = []) {
  fs.mkdirSync(OUT_DIR, { recursive: true })
  const files = {}
  const images = { ...IMAGES, ...Object.fromEntries(projects.map(({ slug, title }) => projectThumb(slug, title))) }
  for (const [name, options] of Object.entries(images)) {
    files[name] = await writeImage(name, options)
  }
  files['gif-4x3'] = await writeGif('gif-4x3', { width: 1200, height: 900 })
  for (const [name, options] of Object.entries(VIDEOS)) {
    files[name] = await writeVideo(name, options)
  }
  return files
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const files = await generateAll()
  console.log(`${Object.keys(files).length} arquivos em ${OUT_DIR}`)
}
