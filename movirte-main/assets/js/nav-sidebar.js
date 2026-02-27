/**
 * nav-sidebar.js — MOVIRTE shared left nav sidebar component.
 * Drop <script src="assets/js/nav-sidebar.js"></script> anywhere in <body>
 * and the sidebar will inject itself in place, with the current page's link
 * automatically marked as active. Supports full panel hide/show toggle.
 *
 * Architecture:
 *   #sidebar-topbar  — position:fixed, z-index:60, ALWAYS visible (toggle + logo)
 *   #nav-sidebar     — position:fixed, z-index:50, slides off-screen when collapsed
 *                       (beige background + nav links only)
 */
(function () {
    const navLinks = [
        { href: 'men.html', label: 'Men' },
        { href: 'women.html', label: 'Women' },
        { href: 'new-in.html', label: 'New In' },
        { href: 'best-sellers.html', label: 'Best Sellers' },
        { href: 'sale.html', label: 'Sale' },
        { href: 'collections.html', label: 'Collections &amp; Capsules' },
        { href: 'gifting.html', label: 'Gifting' },
    ];

    // Detect current page filename
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    const script = document.currentScript;

    // ── 1. Top bar — injected as SIBLING (not child of nav panel) ────────────
    // This means transform on the panel does NOT affect this element.
    const topBar = document.createElement('div');
    topBar.id = 'sidebar-topbar';

    // Hamburger toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'sidebar-toggle';
    toggleBtn.setAttribute('aria-label', 'Toggle navigation');
    toggleBtn.innerHTML =
        '<span class="sidebar-toggle-bar"></span>' +
        '<span class="sidebar-toggle-bar"></span>' +
        '<span class="sidebar-toggle-bar"></span>';
    topBar.appendChild(toggleBtn);

    // Logo — always stays visible
    const logo = document.createElement('a');
    logo.href = 'index.html';
    logo.className = 'sidebar-logo';
    logo.textContent = 'MOVIRTE';
    topBar.appendChild(logo);

    // ── 2. Panel — the beige background + nav links that slide off-screen ────
    const nav = document.createElement('nav');
    nav.id = 'nav-sidebar';

    // Spacer so the first link clears the fixed topbar height
    const spacer = document.createElement('div');
    spacer.className = 'sidebar-topbar-spacer';
    nav.appendChild(spacer);

    // Nav links wrapper
    const navDiv = document.createElement('div');
    navDiv.className = 'sidebar-nav';

    navLinks.forEach(({ href, label }) => {
        const a = document.createElement('a');
        a.href = href;
        a.innerHTML = label;
        if (href === currentPage) a.classList.add('active');
        navDiv.appendChild(a);
    });

    nav.appendChild(navDiv);

    // ── Inject both elements as siblings before the <script> tag ─────────────
    script.parentNode.insertBefore(topBar, script);
    script.parentNode.insertBefore(nav, script);

    // ── Toggle logic ─────────────────────────────────────────────────────────
    function initToggle() {
        const shells = document.querySelectorAll(
            '.listing-shell, .bag-shell, .account-shell'
        );

        toggleBtn.addEventListener('click', () => {
            const isCollapsed = nav.classList.toggle('sidebar-collapsed');
            shells.forEach(s => s.classList.toggle('sidebar-collapsed', isCollapsed));
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initToggle);
    } else {
        initToggle();
    }
})();
