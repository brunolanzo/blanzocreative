export const INTRO_STORAGE_KEY = 'blanzo:intro-seen'

/**
 * Roda no <head>, antes de a página aparecer. A intro só toca quando a visita começa pela
 * home (como na Buff: navegando dentro do site, ela não aparece), uma vez por visita e nunca
 * para quem pediu menos animação. Nos outros casos marca o <html> e o CSS esconde a intro.
 */
export const INTRO_GATE_SCRIPT = `try{if(location.pathname!=='/'||sessionStorage.getItem('${INTRO_STORAGE_KEY}')||matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.dataset.intro='done'}}catch(e){}`
