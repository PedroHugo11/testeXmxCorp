# GaraHerb Landing — XMX Corp Frontend Test

Pagina estatica HTML/CSS/JS de alta performance focada em conversao, construida sob as premissas do desafio da XMX Corp:

- Performance 95+, Acessibilidade 100, SEO 100, Best Practices 100 no Lighthouse.
- Codigo limpo: zero inline styles, zero divitis, CSS organizado, JS minimo.
- Responsividade fluida real (sem "saltos" de breakpoint), do desktop ate o iPhone SE.
- SEO completo (meta, OG, Twitter Cards, JSON-LD), acessibilidade WCAG 2.1 AA, Open Graph, favicon, manifest.

## Estrutura

```
.
├── index.html                # markup semantico + JSON-LD + tracking placeholders
├── favicon.svg               # favicon vetorial (escalavel)
├── robots.txt                # diretivas para crawlers
├── sitemap.xml               # sitemap + imagens
├── site.webmanifest          # PWA / installabilidade
├── assets/
│   ├── css/
│   │   ├── variables.css     # design tokens (cores, tipos, espacos, motion)
│   │   ├── reset.css         # reset minimo + reduced-motion
│   │   ├── base.css          # foco visivel, skip-link, sr-only
│   │   ├── utilities.css     # .button, .container
│   │   └── main.css          # ponto de bundling / overrides
│   ├── components/
│   │   ├── hero.css          # hero section
│   │   └── feature-strip.css # faixa amarela
│   ├── js/main.js            # CTA + camada de tracking abstrata
│   └── images/               # assets otimizados (.webp/.svg)
```

## Estrategia responsiva

Todas as escalas usam `clamp(min, preferida, max)` ancoradas em viewport (`vw`), garantindo
transicao linear continua entre 320px e 1440px+. As listas (beneficios, faixa amarela)
usam `grid-template-columns: repeat(auto-fit, minmax(...))` para redobrar sozinhas sem
media queries explicitas. As poucas media queries restantes existem so para
mudancas de layout, nao de tamanho.

## Tracking

`index.html` traz placeholders comentados de **GTM**, **Meta Pixel** e **GA4**.
`assets/js/main.js` ja contem uma camada `trackEvent()` que roteia para qualquer
um dos tres assim que ativados — basta colar os IDs reais antes do go-live.

## Deploy

Pronto para deploy estatico no GitHub Pages, Vercel, Netlify ou Cloudflare Pages.
