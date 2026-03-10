/* nav-shared.js — MOVIRTE shared nav behaviour (mobile drawer, subnav panels,
   sidebar toggle, search panel, cart drawer, chat widget).
   Place <script src="assets/js/nav-shared.js"></script> at end of <body>.
*/
(function () {
    function init() {
        function enforceMobileTabletNavMode() {
            var isMobileTablet = window.matchMedia('(max-width: 1024px)').matches;
            var idsToHide = ['nav-overlay', 'men-subnav-panel', 'women-subnav-panel', 'nav-list-toggle', 'nav-title-bg'];

            idsToHide.forEach(function (id) {
                var el = document.getElementById(id);
                if (!el) return;
                if (isMobileTablet) {
                    el.style.setProperty('display', 'none', 'important');
                    el.style.setProperty('pointer-events', 'none', 'important');
                } else {
                    el.style.removeProperty('display');
                    el.style.removeProperty('pointer-events');
                }
            });
        }

        enforceMobileTabletNavMode();

        // Normalize all homepage-logo anchors so they always route to root index.
        function normalizeHomeLogoLinks() {
            var selectors = [
                'a.mobile-logo',
                'a.drawer-logo',
                'a.men-nav-title',
                'a#nav-center-logo',
                '.nav-title a',
                'a.checkout-logo',
                'a.cart-header-logo'
            ];
            document.querySelectorAll(selectors.join(',')).forEach(function (el) {
                if (el && el.tagName && el.tagName.toLowerCase() === 'a') {
                    el.setAttribute('href', '/index.html');
                }
            });
        }

        normalizeHomeLogoLinks();

        // Normalize level-1 sidebar nav links so they always point to root-level
        // pages, regardless of <base> tag or current directory context.
        function normalizeNavLinks() {
            var linkMap = {
                'Men': 'javascript:void(0)',
                'Women': 'javascript:void(0)',
                'Gifting': 'javascript:void(0)',
                'New In': '/new-in.html',
                'Best Sellers': '/best-sellers.html',
                'Sale': '/sale.html',
                'Collections & Capsules': '/collections.html',
                'Collections &amp; Capsules': '/collections.html'
            };

            // Target both the mobile drawer nav and the desktop sidebar
            var containers = document.querySelectorAll('.drawer-nav, .nav-col-left');
            containers.forEach(function (container) {
                var anchors = container.querySelectorAll('a');
                anchors.forEach(function (a) {
                    var label = a.textContent.trim();
                    if (linkMap[label]) {
                        a.setAttribute('href', linkMap[label]);
                    }
                });
            });
        }

        normalizeNavLinks();

        // ── Sign-in entry point (profile icon in nav-title-bg) ───────────────
        function ensureSignInEntryPoint() {
            var icons = document.querySelector('#nav-title-bg .nav-title-icons');
            if (!icons) return;

            // Already wired up
            if (icons.querySelector('.nav-profile-link')) return;

            // Expect the profile icon to be the first plain <svg> in the icons row
            var kids = Array.prototype.slice.call(icons.children);
            var profileSvg = null;
            for (var i = 0; i < kids.length; i++) {
                var el = kids[i];
                if (!el || !el.tagName) continue;
                if (el.tagName.toLowerCase() !== 'svg') continue;
                if (el.id === 'cartBtn') continue;
                profileSvg = el;
                break;
            }
            if (!profileSvg) return;

            var a = document.createElement('a');
            a.href = 'sign-in.html';
            a.className = 'nav-icon-btn nav-profile-link';
            a.setAttribute('aria-label', 'Sign in');
            a.appendChild(profileSvg);
            icons.insertBefore(a, icons.firstChild);
        }

        ensureSignInEntryPoint();

        // ── Mobile drawer ────────────────────────────────────────────────────
        var burgerBtn = document.getElementById('burgerBtn');
        var drawerCloseBtn = document.getElementById('drawerClose');
        var mobileDrawer = document.getElementById('mobileDrawer');
        var drawerOverlay = document.getElementById('drawerOverlay');

        function openDrawer() { if (!mobileDrawer) return; mobileDrawer.classList.add('open'); if (drawerOverlay) drawerOverlay.classList.add('open'); document.body.style.overflow = 'hidden'; }
        function closeDrawer() { if (!mobileDrawer) return; mobileDrawer.classList.remove('open'); if (drawerOverlay) drawerOverlay.classList.remove('open'); document.body.style.overflow = ''; }

        if (burgerBtn) burgerBtn.addEventListener('click', openDrawer);
        if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
        if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

        // ── Level-2 Men sub-nav panel ────────────────────────────────────────
        var menChevron = document.getElementById('menChevron');
        var menNavBtn = document.getElementById('menNavBtn');
        var menSubnavPanel = document.getElementById('men-subnav-panel');
        var menSubnavLinks = document.getElementById('menSubnavLinks');

        var MEN_ITEMS = [
            { label: 'New In', href: '/new-in.html' },
            { label: 'Sweatshirts', href: '/men/sweatshirts.html' },
            { label: 'T-shirts', href: '/men/t-shirts.html' },
            { label: 'Shirts', href: '/men/shirts.html' },
            { label: 'Outerwear', href: '/men/outerwear.html' },
            { label: 'Denim', href: '/men/denim.html' },
            { label: 'Trousers & Bottoms', href: '/men/trousers.html' },
            { label: 'Shorts', href: '/men/shorts.html' },
            { label: 'Hats & Caps', href: '/men/hats-caps.html' },
            { label: 'Accessories', href: '/men/accessories.html' },
        ];

        function buildMenSubnav() {
            if (!menSubnavLinks) return;
            menSubnavLinks.innerHTML = '';
            MEN_ITEMS.forEach(function (item) {
                var a = document.createElement('a');
                a.href = item.href; a.textContent = item.label; a.className = 'men-subnav-link';
                a.addEventListener('click', closeMenPanel);
                menSubnavLinks.appendChild(a);
            });
        }

        function alignMenPanel() {
            var lbl = menNavBtn || document.querySelector('#menNavRow a');
            var cat = menSubnavPanel && menSubnavPanel.querySelector('.men-subnav-category');
            if (!lbl || !menSubnavPanel || !cat) return;
            // subtract a small extra value so the list starts higher in the panel
            var topOffset = lbl.getBoundingClientRect().top - 50 - cat.offsetHeight - 14 - 145;
            menSubnavPanel.style.paddingTop = Math.max(0, topOffset) + 'px';
        }

        function openMenPanel() { if (!menSubnavPanel) return; closeWomenPanel(); closeGiftingPanel(); menSubnavPanel.classList.add('open'); alignMenPanel(); if (menChevron) { menChevron.classList.add('open'); menChevron.setAttribute('aria-expanded', 'true'); } }
        function closeMenPanel() { if (!menSubnavPanel) return; menSubnavPanel.classList.remove('open'); if (menChevron) { menChevron.classList.remove('open'); menChevron.setAttribute('aria-expanded', 'false'); } }

        function toggleMenPanel(e) { e.preventDefault(); e.stopPropagation(); menSubnavPanel.classList.contains('open') ? closeMenPanel() : openMenPanel(); }

        if (menNavBtn) menNavBtn.addEventListener('click', toggleMenPanel);
        if (menChevron) menChevron.addEventListener('click', toggleMenPanel);

        // ── Level-2 Women sub-nav panel ──────────────────────────────────────
        var womenChevron = document.getElementById('womenChevron');
        var womenNavBtn = document.getElementById('womenNavBtn');
        var womenSubnavPanel = document.getElementById('women-subnav-panel');
        var womenSubnavLinks = document.getElementById('womenSubnavLinks');

        var WOMEN_ITEMS = [
            { label: 'New In', href: '/women/new-in-w.html' },
            { label: 'Sweatshirts', href: '/women/sweats.html' },
            { label: 'T-shirts', href: '/women/t-shirts.html' },
            { label: 'Shirts', href: '/women/shirts.html' },
            { label: 'Outerwear', href: '/women/outerwear.html' },
            { label: 'Denim', href: '/women/denim.html' },
            { label: 'Trousers & Bottoms', href: '/women/trousers.html' },
            { label: 'Shorts', href: '/women/shorts.html' },
            { label: 'Hats & Caps', href: '/women/hats-caps.html' },
            { label: 'Accessories', href: '/women/accessories.html' },
        ];

        function buildWomenSubnav() {
            if (!womenSubnavLinks) return;
            womenSubnavLinks.innerHTML = '';
            WOMEN_ITEMS.forEach(function (item) {
                var a = document.createElement('a');
                a.href = item.href; a.textContent = item.label; a.className = 'men-subnav-link';
                a.addEventListener('click', closeWomenPanel);
                womenSubnavLinks.appendChild(a);
            });
        }

        function alignWomenPanel() {
            var lbl = womenNavBtn || document.querySelector('#womenNavRow a');
            var cat = womenSubnavPanel && womenSubnavPanel.querySelector('.men-subnav-category');
            if (!lbl || !womenSubnavPanel || !cat) return;
            var topOffset = lbl.getBoundingClientRect().top - 50 - cat.offsetHeight - 14 - 145;
            womenSubnavPanel.style.paddingTop = Math.max(0, topOffset) + 'px';
        }

        function openWomenPanel() { if (!womenSubnavPanel) return; closeMenPanel(); closeGiftingPanel(); womenSubnavPanel.classList.add('open'); alignWomenPanel(); if (womenChevron) { womenChevron.classList.add('open'); womenChevron.setAttribute('aria-expanded', 'true'); } }
        function closeWomenPanel() { if (!womenSubnavPanel) return; womenSubnavPanel.classList.remove('open'); if (womenChevron) { womenChevron.classList.remove('open'); womenChevron.setAttribute('aria-expanded', 'false'); } }

        function toggleWomenPanel(e) { e.preventDefault(); e.stopPropagation(); womenSubnavPanel.classList.contains('open') ? closeWomenPanel() : openWomenPanel(); }

        if (womenNavBtn) womenNavBtn.addEventListener('click', toggleWomenPanel);
        if (womenChevron) womenChevron.addEventListener('click', toggleWomenPanel);

        // ── Level-2 Gifting sub-nav panel ──────────────────────────────────
        var giftingChevron = document.getElementById('giftingChevron');
        var giftingNavBtn = document.getElementById('giftingNavBtn');
        var giftingSubnavPanel = document.getElementById('gifting-subnav-panel');
        var giftingSubnavLinks = document.getElementById('giftingSubnavLinks');

        var GIFTING_ITEMS = [
            { label: 'Gift for Him', href: '/gifting.html#him' },
            { label: 'Gift for Her', href: '/gifting.html#her' },
            { label: 'Life Style', href: '/gifting.html#lifestyle' },
            { label: 'Gift Cards', href: '/gifting.html#gift-cards' },
        ];

        function buildGiftingSubnav() {
            if (!giftingSubnavLinks) return;
            giftingSubnavLinks.innerHTML = '';
            GIFTING_ITEMS.forEach(function (item) {
                var a = document.createElement('a');
                a.href = item.href; a.textContent = item.label; a.className = 'men-subnav-link';
                a.addEventListener('click', closeGiftingPanel);
                giftingSubnavLinks.appendChild(a);
            });
        }

        function alignGiftingPanel() {
            var lbl = giftingNavBtn || document.querySelector('#giftingNavRow a');
            var cat = giftingSubnavPanel && giftingSubnavPanel.querySelector('.men-subnav-category');
            if (!lbl || !giftingSubnavPanel || !cat) return;
            var topOffset = lbl.getBoundingClientRect().top - 50 - cat.offsetHeight - 14 - 145;
            giftingSubnavPanel.style.paddingTop = Math.max(0, topOffset) + 'px';
        }

        function openGiftingPanel() { if (!giftingSubnavPanel) return; closeMenPanel(); closeWomenPanel(); giftingSubnavPanel.classList.add('open'); alignGiftingPanel(); if (giftingChevron) { giftingChevron.classList.add('open'); giftingChevron.setAttribute('aria-expanded', 'true'); } }
        function closeGiftingPanel() { if (!giftingSubnavPanel) return; giftingSubnavPanel.classList.remove('open'); if (giftingChevron) { giftingChevron.classList.remove('open'); giftingChevron.setAttribute('aria-expanded', 'false'); } }

        function toggleGiftingPanel(e) { e.preventDefault(); e.stopPropagation(); giftingSubnavPanel.classList.contains('open') ? closeGiftingPanel() : openGiftingPanel(); }

        if (giftingNavBtn) giftingNavBtn.addEventListener('click', toggleGiftingPanel);
        if (giftingChevron) giftingChevron.addEventListener('click', toggleGiftingPanel);

        window.addEventListener('resize', function () {
            enforceMobileTabletNavMode();
            if (menSubnavPanel && menSubnavPanel.classList.contains('open')) alignMenPanel();
            if (womenSubnavPanel && womenSubnavPanel.classList.contains('open')) alignWomenPanel();
            if (giftingSubnavPanel && giftingSubnavPanel.classList.contains('open')) alignGiftingPanel();
        });

        document.addEventListener('click', function (e) {
            if (menSubnavPanel && menSubnavPanel.classList.contains('open')) {
                var inside = menSubnavPanel.contains(e.target)
                    || (menNavBtn && menNavBtn.contains(e.target))
                    || (menChevron && menChevron.contains(e.target));
                if (!inside) closeMenPanel();
            }
            if (womenSubnavPanel && womenSubnavPanel.classList.contains('open')) {
                var insideW = womenSubnavPanel.contains(e.target)
                    || (womenNavBtn && womenNavBtn.contains(e.target))
                    || (womenChevron && womenChevron.contains(e.target));
                if (!insideW) closeWomenPanel();
            }
            if (giftingSubnavPanel && giftingSubnavPanel.classList.contains('open')) {
                var insideG = giftingSubnavPanel.contains(e.target)
                    || (giftingNavBtn && giftingNavBtn.contains(e.target))
                    || (giftingChevron && giftingChevron.contains(e.target));
                if (!insideG) closeGiftingPanel();
            }
        });

        buildMenSubnav();
        buildWomenSubnav();
        buildGiftingSubnav();

        // ── Nav-list toggle (collapse sidebar) ───────────────────────────────
        var navToggle = document.getElementById('nav-list-toggle');
        // keep track of current collapsed state; start by reflecting whatever
        // class the body already has (most template pages begin life collapsed).
        var navCollapsed = document.body.classList.contains('nav-collapsed');
        // special-case pages need to show burger icon initially rather than X
        // even though the nav is collapsed.  Originally this was only new-in,
        // but the same behaviour now applies to all of the men/* category pages
        // (listed in the sidebar screenshot).
        var path = window.location.pathname;
        var isSpecialPage = path.endsWith('/new-in.html') || path.endsWith('/new-in-w.html') || path.endsWith('/women/new-in-w.html') || path.includes('/men/');
        if (navToggle) {
            // decide whether to apply hidden-state class on load
            var showX = isSpecialPage ? !navCollapsed : navCollapsed;
            navToggle.classList.toggle('hidden-state', showX);

            navToggle.addEventListener('click', function () {
                navCollapsed = !navCollapsed;
                document.body.classList.toggle('nav-collapsed', navCollapsed);
                if (isSpecialPage) {
                    // invert for the first click, then stop special-casing
                    navToggle.classList.toggle('hidden-state', !navCollapsed);
                    isSpecialPage = false;
                } else {
                    navToggle.classList.toggle('hidden-state', navCollapsed);
                }
                closeMenPanel();
                closeWomenPanel();
            });
        }

        // ── Search float panel ────────────────────────────────────────────────
        var searchBtn = document.getElementById('searchBtn');
        var searchPanel = document.getElementById('searchFloatPanel');
        var searchInput = document.getElementById('searchFloatInput');
        var searchClose = document.getElementById('searchFloatClose');

        function openSearch() { if (searchPanel) { searchPanel.classList.add('is-open'); searchPanel.setAttribute('aria-hidden', 'false'); } if (searchInput) { searchInput.focus(); searchInput.value = ''; } }
        function closeSearch() { if (searchPanel) { searchPanel.classList.remove('is-open'); searchPanel.setAttribute('aria-hidden', 'true'); } if (searchInput) searchInput.blur(); }

        if (searchBtn) searchBtn.addEventListener('click', openSearch);
        if (searchClose) searchClose.addEventListener('click', closeSearch);
        if (searchInput) searchInput.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeSearch(); });

        // ── Cart drawer ───────────────────────────────────────────────────────
        var cartBtnEl = document.getElementById('cartBtn');
        var cartDrawer = document.getElementById('cartDrawer');
        var cartOverlay = document.getElementById('cartOverlay');
        var cartCloseBtn = document.getElementById('cartClose');
        var cartContinue = document.querySelector('.cart-continue');

        function openCart() { if (cartDrawer && cartOverlay) { cartDrawer.classList.add('open'); cartOverlay.classList.add('open'); } }
        function closeCart() { if (cartDrawer && cartOverlay) { cartDrawer.classList.remove('open'); cartOverlay.classList.remove('open'); } }

        if (cartBtnEl) cartBtnEl.addEventListener('click', openCart);
        if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCart);
        if (cartOverlay) cartOverlay.addEventListener('click', closeCart);
        if (cartContinue) cartContinue.addEventListener('click', function (e) { e.preventDefault(); closeCart(); });

        // ── Chat widget ───────────────────────────────────────────────────────
        var chatFab = document.getElementById('chatFab');
        var chatPanel = document.getElementById('chatPanel');
        var chatClose = document.getElementById('chatClose');
        var chatInput = document.getElementById('chatInput');
        var chatSend = document.getElementById('chatSend');
        var chatBody = document.querySelector('.chat-panel-body');

        function sendMsg() {
            if (!chatInput || !chatBody) return;
            var text = chatInput.value.trim(); if (!text) return;
            var msg = document.createElement('div'); msg.className = 'chat-bubble user'; msg.textContent = text;
            chatBody.appendChild(msg); chatInput.value = ''; chatBody.scrollTop = chatBody.scrollHeight;
            setTimeout(function () {
                var reply = document.createElement('div'); reply.className = 'chat-bubble bot';
                reply.textContent = 'Thanks for your message! A member of our team will be with you shortly.';
                chatBody.appendChild(reply); chatBody.scrollTop = chatBody.scrollHeight;
            }, 800);
        }

        if (chatFab) chatFab.addEventListener('click', function () { if (!chatPanel || !chatInput) return; chatPanel.classList.toggle('open'); if (chatPanel.classList.contains('open')) chatInput.focus(); });
        if (chatClose && chatPanel) chatClose.addEventListener('click', function () { chatPanel.classList.remove('open'); });
        if (chatSend) chatSend.addEventListener('click', sendMsg);
        if (chatInput) chatInput.addEventListener('keydown', function (e) { if (e.key === 'Enter') sendMsg(); });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
