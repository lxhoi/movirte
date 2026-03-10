/**
 * page-transition.js
 * Vanilla JS port of the GSAP grid page-transition component.
 *
 * Usage: include this script (and GSAP) in every page's <head> or before </body>.
 * The script is self-contained — no other configuration needed.
 *
 * Animation:
 *  LEAVE  → 10 vertical blocks sweep in  (left → right, staggered, 0.5 s)
 *  ENTER  → blocks sweep out             (right → left, staggered, 0.5 s delay)
 */

(function () {
    'use strict';

    const BLOCK_COUNT = 10;
    const BLOCK_COLOR = '#d1cfc2';   // matches site background
    const LEAVE_DURATION = 0.5;
    const ENTER_DURATION = 0.5;
    const ENTER_DELAY = 0.15;   // small pause while new page loads
    const STAGGER_AMOUNT = 0.3;

    /* ─── 1. Inject CSS (once) ──────────────────────────────────── */
    if (!document.getElementById('page-transition-style')) {
        const style = document.createElement('style');
        style.id = 'page-transition-style';
        style.textContent = `
            #page-transition-grid {
                position: fixed;
                inset: 0;
                pointer-events: none;
                overflow: hidden;
                z-index: 99999;
            }
            .pt-block {
                position: absolute;
                top: 0;
                height: 100%;
                background: ${BLOCK_COLOR};
                transform-origin: left;
                will-change: transform;
            }
        `;
        document.head.appendChild(style);
    }

    /* ─── 2. Build the grid ─────────────────────────────────────── */
    let gridEl = document.getElementById('page-transition-grid');
    if (!gridEl) {
        gridEl = document.createElement('div');
        gridEl.id = 'page-transition-grid';
        document.body.appendChild(gridEl);
    }

    let blocks = [];

    function buildGrid() {
        gridEl.innerHTML = '';
        blocks = [];
        const bw = window.innerWidth / BLOCK_COUNT;
        for (let i = 0; i < BLOCK_COUNT; i++) {
            const el = document.createElement('div');
            el.className = 'pt-block';
            el.style.width = (bw + 5) + 'px';
            el.style.left = (i * bw - 2.5) + 'px';
            gridEl.appendChild(el);
            blocks.push(el);
        }
        if (window.gsap) gsap.set(blocks, { scaleX: 0 });
    }

    buildGrid();
    window.addEventListener('resize', buildGrid);

    /* ─── 3. Enter animation (runs on every page load) ──────────── */
    function playEnter() {
        if (!window.gsap || blocks.length === 0) return;
        gsap.set(blocks, { scaleX: 1, transformOrigin: 'right' });
        gsap.to(blocks, {
            scaleX: 0,
            duration: ENTER_DURATION,
            delay: ENTER_DELAY,
            ease: 'power3.out',
            stagger: { amount: STAGGER_AMOUNT, from: 'start' },
        });
    }

    /* ─── 4. Leave animation → navigate ────────────────────────── */
    function playLeave(href) {
        if (!window.gsap || blocks.length === 0) {
            window.location.href = href;
            return;
        }
        gsap.set(blocks, { scaleX: 0, transformOrigin: 'left' });
        gsap.to(blocks, {
            scaleX: 1,
            duration: LEAVE_DURATION,
            ease: 'power3.out',
            stagger: { amount: STAGGER_AMOUNT, from: 'start' },
            onComplete: () => { window.location.href = href; },
        });
    }

    /* ─── 5. Helpers ─────────────────────────────────────────────── */
    function isSameOrigin(href) {
        try {
            const url = new URL(href, window.location.href);
            return url.origin === window.location.origin;
        } catch { return false; }
    }

    function isHomeLogoClick(target) {
        if (!target || !target.closest) return false;
        return !!target.closest(
            'a.mobile-logo, a.drawer-logo, a.men-nav-title, a#nav-center-logo, a.checkout-logo, a.cart-header-logo, .nav-title a'
        );
    }

    // Returns true when the current page is index.html (or the site root)
    function isIndexPage() {
        const p = window.location.pathname;
        return p === '/' || p === '/index.html' || p.endsWith('/index.html');
    }

    document.addEventListener('click', function (e) {
        // Ignore clicks coming from wishlist heart button so it doesn't trigger navigation
        if (e.target.closest('.product-wishlist')) return;

        // Always route homepage logo clicks to the root index page.
        if (isHomeLogoClick(e.target)) {
            e.preventDefault();
            window.location.href = '/index.html';
            return;
        }

        const anchor = e.target.closest('a[href]');
        if (!anchor) return;

        const href = anchor.getAttribute('href');
        if (!href) return;

        // Skip: external, hash-only, new-tab, download, javascript:
        if (
            anchor.target === '_blank' ||
            anchor.hasAttribute('download') ||
            href.startsWith('#') ||
            href.startsWith('javascript:') ||
            href.startsWith('mailto:') ||
            href.startsWith('tel:') ||
            !isSameOrigin(href)
        ) return;

        // Skip modifier-key combos (open-in-new-tab etc.)
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

        e.preventDefault();
        // Skip leave animation when navigating away from the index page
        if (isIndexPage()) {
            window.location.href = new URL(href, document.baseURI || window.location.href).href;
            return;
        }
        playLeave(new URL(href, document.baseURI || window.location.href).href);
    }, true);

    /* ─── 6. Fire enter animation when DOM is ready ─────────────── */
    // Skip enter animation on the index page (it has its own scroll animation)
    if (!isIndexPage()) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', playEnter);
        } else {
            playEnter();
        }
    }

})();
