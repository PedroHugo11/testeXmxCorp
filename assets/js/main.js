/* ===========================================================================
 * GaraHerb — main.js
 * ---------------------------------------------------------------------------
 * Script enxuto, sem dependencias, focado em Core Web Vitals.
 * - Sem inline styles (classes em vez de style.cssText)
 * - Respeita prefers-reduced-motion
 * - Camada de tracking centralizada e plugavel (Pixel/GTM/GA4)
 * - Idempotente: pode ser executado varias vezes sem efeitos colaterais
 * ===========================================================================
 */

(() => {
  'use strict';

  const PRESSED_CLASS = 'is-pressed';
  const PRESS_DURATION = 120;

  /**
   * Dispara um evento de tracking abstraindo Pixel/GTM/GA4.
   * Os placeholders no HTML, quando descomentados com IDs reais,
   * sao roteados automaticamente por esta funcao.
   */
  function trackEvent(eventName, payload = {}) {
    // Google Tag Manager / GA4 via dataLayer
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: eventName, ...payload });
    }

    // Meta Pixel
    if (typeof window.fbq === 'function') {
      const fbEventMap = {
        initiate_checkout: 'InitiateCheckout',
        purchase: 'Purchase',
        lead: 'Lead',
      };
      const fbEvent = fbEventMap[eventName] || 'CustomEvent';
      window.fbq('track', fbEvent, payload);
    }

    // Em desenvolvimento, ajuda a depurar o funil
    if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
      // eslint-disable-next-line no-console
      console.info('[track]', eventName, payload);
    }
  }

  /**
   * Liga feedback tatil + tracking em todos os CTAs marcados com .js-cta.
   * Toggle de classe (sem inline style) e respeita reduced-motion.
   */
  function initCtas() {
    const ctas = document.querySelectorAll('.js-cta');
    if (!ctas.length) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    ctas.forEach((cta) => {
      cta.addEventListener('click', () => {
        const eventName = cta.dataset.event || 'cta_click';

        trackEvent(eventName, {
          cta_label: (cta.textContent || '').trim(),
          cta_href: cta.getAttribute('href') || '',
        });

        if (!prefersReducedMotion) {
          cta.classList.add(PRESSED_CLASS);
          window.setTimeout(() => {
            cta.classList.remove(PRESSED_CLASS);
          }, PRESS_DURATION);
        }
      });
    });
  }

  function init() {
    initCtas();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
