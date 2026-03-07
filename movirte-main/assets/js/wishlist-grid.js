(function () {
    'use strict';

    var WISHLIST_STORAGE_KEY = 'movirte:wishlist:v1';

    function hasGridPage() {
        return !!document.querySelector('#productGrid, .product-grid');
    }

    function createHeartButton() {
        var btn = document.createElement('button');
        btn.className = 'product-wishlist';
        btn.type = 'button';
        btn.setAttribute('aria-label', 'Add to wishlist');
        btn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>';
        return btn;
    }

    function ensureHeartButtons() {
        var images = document.querySelectorAll('.product-link .product-image');
        images.forEach(function (image) {
            if (image.querySelector('.product-wishlist')) return;
            image.insertBefore(createHeartButton(), image.firstChild);
        });
    }

    function ensureToast() {
        var toast = document.getElementById('wishlistToast');
        if (toast) return toast;

        var firstImg = document.querySelector('.product-link .product-img.base, .product-link .product-img');
        var initialSrc = firstImg ? (firstImg.getAttribute('src') || '') : '';

        toast = document.createElement('div');
        toast.className = 'wishlist-toast';
        toast.id = 'wishlistToast';
        toast.setAttribute('aria-live', 'polite');
        toast.innerHTML =
            '<div class="wishlist-toast-thumb">' +
                '<img src="' + initialSrc + '" alt="">' +
            '</div>' +
            '<div class="wishlist-toast-body">' +
                '<p class="wishlist-toast-label">Added to wishlist</p>' +
                '<p class="wishlist-toast-title">WISHLIST ITEM</p>' +
            '</div>' +
            '<a href="wishlist.html" class="wishlist-toast-cta">View</a>';

        document.body.appendChild(toast);
        return toast;
    }

    function readWishlist() {
        try {
            var raw = localStorage.getItem(WISHLIST_STORAGE_KEY);
            if (!raw) return [];
            var parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed : [];
        } catch (err) {
            return [];
        }
    }

    function writeWishlist(items) {
        try {
            localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
            window.dispatchEvent(new CustomEvent('wishlist:changed', { detail: { count: items.length } }));
        } catch (err) {
            // No-op if storage is unavailable.
        }
    }

    function setHeartState(btn, isActive) {
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        btn.setAttribute('aria-label', isActive ? 'Remove from wishlist' : 'Add to wishlist');
    }

    function slugify(text) {
        return (text || '')
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]/g, '');
    }

    function getProductFromButton(btn) {
        var item = btn.closest('.product-item');
        var link = btn.closest('.product-link');
        if (!item) return null;

        var nameEl = item.querySelector('.product-name');
        var priceEl = item.querySelector('.product-price');
        var imgEl = item.querySelector('.product-img.base, .product-img');

        var name = nameEl ? nameEl.textContent.trim() : '';
        var productId = item.dataset.productId || slugify(name);
        if (!item.dataset.productId && productId) {
            item.dataset.productId = productId;
        }

        if (!productId) return null;

        return {
            id: productId,
            name: name,
            price: priceEl ? priceEl.textContent.trim() : '',
            image: imgEl ? (imgEl.getAttribute('src') || '') : '',
            url: link ? (link.getAttribute('href') || '') : '',
            addedAt: new Date().toISOString()
        };
    }

    function showWishlistToast(toast, product, mode) {
        if (!toast || !product) return;

        var labelEl = toast.querySelector('.wishlist-toast-label');
        var titleEl = toast.querySelector('.wishlist-toast-title');
        var thumbEl = toast.querySelector('.wishlist-toast-thumb img');
        var ctaEl = toast.querySelector('.wishlist-toast-cta');

        if (labelEl) labelEl.textContent = mode === 'add' ? 'Added to wishlist' : 'Removed from wishlist';
        if (titleEl) titleEl.textContent = (product.name || 'Wishlist item').toUpperCase();
        if (thumbEl && product.image) {
            thumbEl.src = product.image;
            thumbEl.alt = product.name || 'Wishlist item';
        }
        if (ctaEl) ctaEl.href = 'wishlist.html';

        toast.classList.add('visible');

        if (showWishlistToast._timer) {
            clearTimeout(showWishlistToast._timer);
        }
        showWishlistToast._timer = setTimeout(function () {
            toast.classList.remove('visible');
        }, 3000);
    }

    function hydrateWishlistButtons(buttons) {
        var wishlist = readWishlist();
        var wishIds = new Set(wishlist.map(function (item) { return item && item.id; }).filter(Boolean));

        buttons.forEach(function (btn) {
            var product = getProductFromButton(btn);
            setHeartState(btn, !!(product && wishIds.has(product.id)));
        });
    }

    function bindWishlistButtons(buttons, toast) {
        buttons.forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();

                var product = getProductFromButton(btn);
                if (!product) return;

                var wishlist = readWishlist();
                var existingIdx = wishlist.findIndex(function (item) {
                    return item && item.id === product.id;
                });
                var exists = existingIdx !== -1;

                if (exists) {
                    wishlist.splice(existingIdx, 1);
                    setHeartState(btn, false);
                    writeWishlist(wishlist);
                    showWishlistToast(toast, product, 'remove');
                    return;
                }

                wishlist.push(product);
                setHeartState(btn, true);
                writeWishlist(wishlist);
                showWishlistToast(toast, product, 'add');
            });
        });
    }

    function preventHeartNavigation() {
        document.querySelectorAll('.product-link').forEach(function (link) {
            link.addEventListener('click', function (e) {
                if (e.target.closest('.product-wishlist')) {
                    e.preventDefault();
                }
            });
        });
    }

    if (!hasGridPage()) return;

    ensureHeartButtons();
    var buttons = document.querySelectorAll('.product-wishlist');
    if (!buttons.length) return;

    var toast = ensureToast();
    hydrateWishlistButtons(buttons);
    bindWishlistButtons(buttons, toast);
    preventHeartNavigation();
})();
