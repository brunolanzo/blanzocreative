// O hls.js publica os tipos só na entrada principal; a versão "light" tem a mesma API.
declare module 'hls.js/light' {
  export { default } from 'hls.js'
}
