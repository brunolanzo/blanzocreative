# blanzo.studio — UI kit

A click-through recreation of the studio's own site: the primary (and currently only) Blanzo surface. Open `index.html`.

## Screens
| Route | File | Contents |
| --- | --- | --- |
| `home` | `HomeScreen.jsx` | Full-bleed video hero + protection gradient, capability marquee, work grid, expandable services, stats |
| `work` | `WorkScreens.jsx` | Filterable work index (filter pills switch to accent when active) |
| `case` | `WorkScreens.jsx` | Case study: film hero, credits list, prose, paired loops, prev/next |
| `services` | `AboutContact.jsx` | Numbered accordion of the four capabilities |
| `about` | `AboutContact.jsx` | First-person bio, discipline tags, 4-step process |
| `contact` | `AboutContact.jsx` | Underline form with a real submitted state |

`Chrome.jsx` holds the sticky nav (transparent → blurred black after 24px of scroll) and the footer CTA.

## Notes
- Every visual primitive comes from the design system bundle (`Button`, `Display`, `Eyebrow`, `Tag`, `Field`, `Marquee`, `ProjectTile`, `VideoFrame`, `ServiceRow`, `StatBlock`, `Logo`); nothing is re-implemented locally.
- **Placeholder media:** no photography or client film was supplied, so the four "projects" are the brand's own logo animations from `assets/motion/`, with invented titles and credits. Replace with real work.
- Routing is React state, not URLs. Scroll resets on navigation.
