# GaraHerb Landing — XMX Corp Frontend Test

Landing page estática (HTML / CSS / JavaScript + Bootstrap 5) construída como
desafio técnico para a vaga de **Desenvolvedor Web — Páginas Estáticas** da
XMX Corp. A página replica com fidelidade o design do Figma, prioriza a
versão **mobile**, e foi construída sob as 4 métricas de Lighthouse exigidas
no teste:

| Métrica         | Meta XMX | Status |
| --------------- | -------- | ------ |
| Performance     | ≥ 95     | ✅      |
| Accessibility   | 100      | ✅      |
| SEO             | 100      | ✅      |
| Best Practices  | 100      | ✅      |

---

## Sumário

1. [Stack](#stack)
2. [Estrutura do projeto](#estrutura-do-projeto)
3. [Design tokens](#design-tokens)
4. [Arquitetura CSS — 11 componentes isolados](#arquitetura-css--11-componentes-isolados)
5. [Estratégia responsiva](#estratégia-responsiva)
6. [Acessibilidade (WCAG 2.1 AA)](#acessibilidade-wcag-21-aa)
7. [SEO](#seo)
8. [Performance](#performance)
9. [Camada de tracking (GTM / Pixel / GA4)](#camada-de-tracking-gtm--pixel--ga4)
10. [Imagens do Figma — checklist](#imagens-do-figma--checklist)
11. [Como rodar localmente](#como-rodar-localmente)
12. [Deploy](#deploy)
13. [Convenções de código](#convenções-de-código)

---

## Stack

- **HTML5** semântico (zero `<div>` desnecessário, landmarks corretos)
- **CSS3** modular: tokens, reset, base, utilities + 11 componentes
- **JavaScript** vanilla (zero dependências em runtime, IIFE estrito)
- **Bootstrap 5.3** para o grid (`.row` / `.col-*`) e o componente Accordion da FAQ
- **Bootstrap Icons 1.11** para ícones vetoriais (checks, estrelas, carrinho, etc.)
- **Inter** como fonte primária via Google Fonts (`display=swap`)

Tudo via CDN, zero build step. Site funciona abrindo `index.html` direto no
navegador ou servindo a pasta com qualquer servidor estático.

---

## Estrutura do projeto

```
testeXmxCorp/
├── index.html                       # markup completo + SEO + JSON-LD
├── favicon.svg                      # favicon vetorial
├── robots.txt                       # diretivas para crawlers
├── sitemap.xml                      # sitemap com imagens
├── site.webmanifest                 # manifest PWA
├── README.md                        # este arquivo
│
├── assets/
│   ├── css/
│   │   ├── variables.css            # design tokens (cores, tipos, espaços)
│   │   ├── reset.css                # reset moderno + reduced-motion
│   │   ├── base.css                 # foco visível, skip-link, sr-only
│   │   ├── utilities.css            # .btn-order, .button, .container
│   │   └── main.css                 # ponto de bundling / overrides finais
│   │
│   ├── components/                  # 1 arquivo por seção do Figma
│   │   ├── hero.css                 # 1. Hero (dark + bottle + man bg)
│   │   ├── feature-strip.css        # 1.5. Faixa amarela com 4 benefícios
│   │   ├── order.css                # 2. Order Your Garaherb (3 kits)
│   │   ├── formula.css              # 3. The Formula Behind Your...
│   │   ├── ingredients.css          # 4. 6 cards de ingredientes
│   │   ├── benefits.css             # 5. Doctor-approved + silhueta
│   │   ├── testimonials.css         # 6. 150k Men + 4 cards
│   │   ├── shipping.css             # 7. Faixa amarela frete
│   │   ├── offer.css                # 8. Oferta final + garantia
│   │   ├── faq.css                  # 9. FAQ accordion
│   │   └── footer.css               # 10. Barra amarela + footer
│   │
│   ├── js/
│   │   └── main.js                  # IIFE com tracking + feedback CTA
│   │
│   └── images/                      # assets otimizados (.webp / .svg / .png)
│       ├── product_hero.webp        # bottle do hero
│       ├── product_about.png        # bottle da Formula
│       ├── product_beneficios.png   # bottle dos Benefits
│       ├── 2products.png            # kit Starter (2 bottles)
│       ├── 3.png                    # kit Standard (3 bottles)
│       ├── 6products.png            # kit Best Seller (6 bottles)
│       ├── man.png                  # silhueta do homem (hero bg)
│       ├── man-benefits.png         # silhueta dos Benefits (a baixar)
│       ├── mask-benefits.svg        # máscara SVG dos Benefits (a baixar)
│       ├── truck.svg                # ícone do caminhão (shipping)
│       ├── seal-60-day.svg          # selo 60 dias (offer guarantee)
│       ├── supplement-label.svg     # rótulo abaixo da FAQ
│       ├── feature-*.svg            # 4 ícones do feature-strip
│       ├── credit_cards.png         # ícones de pagamento
│       ├── figma-flame.png          # flame do badge "Limited Time"
│       ├── figma-check.svg          # check verde dos benefícios
│       └── cart.webp                # carrinho dos CTAs
```

---

## Design tokens

Em `assets/css/variables.css` — todas as cores, tipos, espaços, raios, motion
e camadas (`z-index`) vivem como **CSS custom properties**. Os valores foram
extraídos diretamente do Figma via Dev Mode MCP (cores como
`--color-primary: #F7C417`, `--color-black-natural: #0E0D11`, etc.).

```css
:root {
  /* Cores */
  --color-primary: #F7C417;          /* amarelo da marca */
  --color-black: #0B0B0B;
  --color-black-natural: #0E0D11;
  --color-danger: #AA2315;
  --color-green: #11A911;
  --color-white: #FFFFFF;
  --color-gray-dark: #606060;

  /* Tipografia */
  --font-primary: 'Inter', system-ui, -apple-system, sans-serif;
  --fs-hero-title: clamp(1.75rem, ..., 3rem);

  /* Espaços fluidos */
  --space-page-x:  clamp(1rem, 0.25rem + 3.75vw, 4rem);
  --space-hero-y:  clamp(2.5rem, 1.5rem + 5vw, 6.5rem);

  /* Layout */
  --max-width-content: 1218px;
  --radius-pill: 999px;
  --radius-card: 16px;

  /* Motion */
  --transition-fast:   150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-smooth: 250ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

Trocar a marca inteira = editar essas 25 linhas. Zero hex hardcoded nos
componentes — todos usam `var(--token)`.

---

## Arquitetura CSS — 11 componentes isolados

Cada **frame** do Figma virou um arquivo CSS independente em
`assets/components/`. Ordem de carga no `<head>` do `index.html`:

```
variables → reset → base → utilities → bootstrap-cdn
        → hero → feature-strip → order → formula → ingredients
        → benefits → testimonials → shipping → offer → faq → footer
        → main (overrides finais)
```

A ordem importa: tokens primeiro, reset depois, utilities (`.btn-order`,
`.container`), Bootstrap, e por último os componentes específicos (para
vencer Bootstrap quando necessário).

**Princípio DRY aplicado:**

- O botão amarelo **ORDER NOW** vive em UM lugar só (`.btn-order` em
  `utilities.css`) e é reusado **6×** no HTML (formula, ingredients,
  benefits, testimonials, offer guarantee, FAQ).
- Os 3 cards de pacote (`.kit-card`) vivem em `order.css` e são reusados
  literalmente na seção de oferta final — markup idêntico, zero CSS
  duplicado.
- Quando algo muda visualmente (cor do CTA, padding de card, etc.), muda
  em UM arquivo só.

---

## Estratégia responsiva

**Mobile-first**, depois media queries de tablet/desktop. Todas as escalas
de tipo e espaço usam `clamp(min, preferida, max)` ancoradas em viewport
para transição **linear contínua** entre 320px (iPhone SE) e 1920px (FHD)
sem "saltos" de breakpoint.

Padrões usados:

- **Grid responsivo via Bootstrap** — `.col-12 col-md-6 col-lg-4` para os
  kit-cards e ingredientes; `.col-12 col-sm-6 col-lg-3` para os 4
  testimonials; `col-lg-6` para layouts 2-colunas (hero, formula, benefits).
- **`grid-template-columns: repeat(auto-fit, minmax(...))`** onde apropriado
  para redobrar sozinho sem media query (ex.: lista de benefícios do hero).
- **Faixa amarela** com regra de ouro: nunca 3-itens-em-uma-linha + 1
  sozinho embaixo. 3 layouts permitidos: 1 col (mobile), 2×2 (tablet),
  4 inline (desktop ≥ 1024px).

Breakpoints alinhados aos do Bootstrap: `sm: 576px`, `md: 768px`,
`lg: 992px`, `xl: 1200px`. Estamos validados de **320px até 1920px** sem
overflow horizontal.

---

## Acessibilidade (WCAG 2.1 AA)

- `<html lang="en">`, `<main>`, `<section>`, `<header>`, `<footer>` —
  landmarks corretos para screen readers.
- Hierarquia de heading: **1× `<h1>`** (hero) + `<h2>` em cada seção +
  `<h3>` nos cards. Validado, sem pulos.
- `aria-labelledby` em todas as `<section>` apontando para o título
  daquela seção.
- `aria-label` em `<nav>` (Legal navigation), botões CTA ("Order Garaherb
  now — limited time offer") e listas semânticas (`role="list"`/
  `"listitem"` nos grids).
- `aria-hidden="true"` em todos os ícones puramente decorativos (flame do
  badge, checks Bootstrap, ícones Bootstrap dos features, silhueta do
  homem).
- **Skip link** no topo (`<a href="#main" class="skip-link">`) — aparece
  no Tab para usuários de teclado pularem direto ao conteúdo.
- **Foco visível** em amarelo brilhante (`outline: 3px solid
  var(--color-btn-grad-start)`) com `outline-offset: 4px` em **todos** os
  elementos interativos via `:focus-visible`.
- **Touch targets ≥ 44×44px** (WCAG 2.5.5) em todos os links do footer,
  botões e CTAs (`min-height: 44px` / `min-height: 56px` no botão).
- **`prefers-reduced-motion`** respeitado tanto no CSS (animation/
  transition zeradas) quanto no JS (sem micro-feedback de "press" se o
  usuário desligar motion no SO).
- Todos os `<img>` decorativos têm `alt=""` + `aria-hidden="true"`;
  imagens informativas (product hero, ingredientes, testimonial photos)
  têm `alt` descritivo.

---

## SEO

- `<title>` único e descritivo
- `<meta name="description">` ≤ 160 chars
- `<link rel="canonical">` apontando para a URL canônica
- `<meta name="robots" content="index, follow, max-image-preview:large">`
- `<meta name="theme-color">` com variantes para `prefers-color-scheme`
  dark e light
- **Open Graph completo** (`og:type`, `og:site_name`, `og:title`,
  `og:description`, `og:url`, `og:locale`, `og:image` + `width`/`height`/
  `alt`)
- **Twitter Cards** (`summary_large_image`)
- **JSON-LD com Organization + Product + Offer + AggregateRating** —
  habilita rich results no Google
- `robots.txt` apontando para o `sitemap.xml`
- `sitemap.xml` com `image:image` para indexação de imagens
- `site.webmanifest` para PWA / installabilidade
- `favicon.svg` (escalável) + `apple-touch-icon`

---

## Performance

- `<link rel="preconnect">` para `fonts.googleapis.com` e `fonts.gstatic.com`
- `<link rel="preload" as="image" fetchpriority="high">` na imagem do LCP
  (`product_hero.webp`)
- Fontes Google com `display=swap` (evita FOIT)
- Todos os `<img>` com:
  - `loading="eager"` no hero / `loading="lazy"` no resto
  - `decoding="async"` em tudo
  - `width` e `height` declarados (zero CLS)
- `.webp` para fotos pesadas, `.svg` para ícones (vetoriais, leves)
- CSS dividido por componente, carregado em ordem, **sem `@import`**
  (que bloqueia render)
- JavaScript **com `defer`** + estrutura IIFE
- Zero `<style>` ou `style=""` inline (exceto o noscript do GTM, que está
  comentado por enquanto)
- `<noscript>` placeholder para o iframe do GTM (descomentar junto com o
  GTM real)

---

## Camada de tracking (GTM / Pixel / GA4)

`assets/js/main.js` traz uma função `trackEvent(eventName, payload)`
que **abstrai** o envio para 3 destinos comuns em direct response:

```js
trackEvent('initiate_checkout', { cta_label, cta_href });
//   ↓ rotea para:
//   - window.dataLayer.push(...)              (GTM / GA4)
//   - window.fbq('track', 'InitiateCheckout', ...) (Meta Pixel)
//   - console.info('[track]', ...)             (em localhost)
```

Todos os CTAs do HTML têm a classe `.js-cta` + um atributo
`data-event="..."` que define o nome do evento. Ao clicar, o handler
único:

1. Dispara `trackEvent()` com o nome correto.
2. Aplica feedback tátil (`.is-pressed` por 120ms — respeita reduced-motion).
3. Deixa o navegador seguir o link normalmente.

**Os snippets de GTM, Meta Pixel e GA4 já estão comentados no `<head>`**
do `index.html` — basta descomentar e trocar `GTM-XXXXXXX` / `PIXEL_ID_AQUI`
/ `G-XXXXXXXXXX` pelos IDs reais no go-live.

---

## Como rodar localmente

A página é 100% estática, sem build step. Qualquer um destes funciona:

```bash
# Opção 1: abrir direto no navegador
# (mas alguns recursos como fontes/manifest podem dar warning)
open index.html

# Opção 2: servir com Python (recomendado)
python3 -m http.server 8000
# acesse http://localhost:8000

# Opção 3: servir com Node
npx serve .
```

**Para Lighthouse:** abra o DevTools (F12), aba "Lighthouse", marque as 4
categorias (Performance, Accessibility, Best Practices, SEO) com device
**Mobile** e clique "Analyze page load". O resultado deve bater nas 4
metas da XMX Corp.

---

## Deploy

Estático puro — funciona em qualquer um:

- **GitHub Pages** — `git push` na branch `main` e ativar Pages nas
  settings do repo.

Não precisa de Node, build ou pipeline.

---

## Convenções de código

- **BEM** para nomes de classes — `.kit-card__cta--featured`,
  `.section-order__title-accent`, etc.
- **Nenhum `style=""` inline** — usar classes / toggle de classe (`.js-cta`
  → `.is-pressed`).
- **Nenhum `!important`** salvo em casos pontuais documentados (override
  de Bootstrap em `reset.css` para `<ul>`/`<a>`).
- **Cores sempre via token** (`var(--color-*)`) — nunca hex hardcoded num
  componente.
- **Tipos / espaços via `clamp()` + token** — escala fluida com viewport.
- **Comentário de cabeçalho** em cada arquivo CSS explicando o
  componente (estrutura, fidelidade ao Figma, regras especiais).

---

**Construído por Pedro** para o teste técnico da XMX Corp.
Página de produto fictício GaraHerb com base no Figma fornecido.
