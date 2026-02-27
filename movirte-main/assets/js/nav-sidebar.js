/**
 * nav-sidebar.js — MOVIRTE shared left nav sidebar component.
 * Drop <script src="assets/js/nav-sidebar.js"></script> anywhere in <body>
 * and the sidebar will inject itself in place, with the current page's link
 * automatically marked as active.
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

    // Detect current page filename (works for both file:// and http://)
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Build nav element
    const nav = document.createElement('nav');
    nav.id = 'nav-sidebar';

    // Logo
    const logo = document.createElement('a');
    logo.href = 'index.html';
    logo.className = 'sidebar-logo';
    logo.textContent = 'MOVIRTE';
    nav.appendChild(logo);

    // Nav links
    const navDiv = document.createElement('div');
    navDiv.className = 'sidebar-nav';

    navLinks.forEach(({ href, label }) => {
        const a = document.createElement('a');
        a.href = href;
        a.innerHTML = label; // innerHTML so &amp; renders correctly
        if (href === currentPage) a.classList.add('active');
        navDiv.appendChild(a);
    });

    nav.appendChild(navDiv);

    // Inject immediately before this <script> tag
    const script = document.currentScript;
    script.parentNode.insertBefore(nav, script);
})();
