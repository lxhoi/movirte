const canvas = document.getElementById('hero-canvas');
const context = canvas.getContext('2d');

const frameCount = 511;

// Nav list toggle
const navOverlay = document.getElementById('nav-overlay');
const navListToggle = document.getElementById('nav-list-toggle');
const navTitleBg = document.getElementById('nav-title-bg');
let navItemsAreHidden = false;

if (navListToggle) {
    navListToggle.addEventListener('click', () => {
        navItemsAreHidden = !navItemsAreHidden;
        if (navOverlay) navOverlay.classList.toggle('nav-items-hidden', navItemsAreHidden);
        document.body.classList.toggle('nav-collapsed', navItemsAreHidden);
        navListToggle.classList.toggle('hidden-state', navItemsAreHidden);
    });
}

// Helper to draw image with "object-fit: cover"
const drawImageCover = (ctx, img) => {
    const canvas = ctx.canvas;
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio); // Max for cover, Min for contain

    const centerShift_x = (canvas.width - img.width * ratio) / 2;
    const centerShift_y = (canvas.height - img.height * ratio) / 2;

    ctx.drawImage(img, 0, 0, img.width, img.height,
        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
};

// Helper function to pad numbers with leading zeros and encode URI components
const currentFrame = index => {
    const dir = 'scrolling fx';
    const filename = `Screen Recording 2026-02-18 at 6.28.17 PM_${(index + 1).toString().padStart(5, '0')}.jpg`;
    return `${encodeURIComponent(dir)}/${encodeURIComponent(filename)}`;
};

const images = [];
const imageObj = { frame: 0 };

const preloadImages = () => {
    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        images.push(img);

        if (i === 0) {
            img.onload = () => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                drawImageCover(context, images[0]);
            };
        }
    }
};

// State for smooth animation
let targetFrame = 0;
let currentFrameIndex = 0;
const ease = 0.1; // Adjust for smoother (lower) or snappier (higher) response

const updateImage = index => {
    // Round the index to get the nearest integer frame
    const frameNumber = Math.round(index);
    if (images[frameNumber] && images[frameNumber].complete) {
        // Clear canvas to prevent artifacts if ratio changes
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawImageCover(context, images[frameNumber]);
    }
};

// Animation loop
const animate = () => {
    // Linear interpolation (Lerp)
    currentFrameIndex += (targetFrame - currentFrameIndex) * ease;

    // Optimize: Only draw if the frame has changed significantly
    if (Math.abs(targetFrame - currentFrameIndex) > 0.01) {
        updateImage(currentFrameIndex);
    }

    requestAnimationFrame(animate);
};

// ── Lenis smooth scroll + GSAP ScrollTrigger integration ──────────────────────
gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis();

// Keep ScrollTrigger in sync with Lenis
lenis.on('scroll', ScrollTrigger.update);

// Feed Lenis into GSAP's ticker for consistent timing
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

// ── Scroll-driven logic (canvas + nav animations) ──────────────────────────────
function onScroll({ scroll }) {
    const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
    const scrollFraction = scroll / maxScrollTop;

    // Update target frame based on scroll
    targetFrame = Math.min(
        frameCount - 1,
        Math.floor(scrollFraction * frameCount)
    );

    // Toggle product section visibility near end of scroll
    const productSection = document.getElementById('product-section');
    const navContent = document.querySelector('.nav-content');
    if (scrollFraction > 0.80) {
        productSection.classList.add('visible');
        if (navContent) navContent.classList.add('dark-text');
        if (navListToggle) navListToggle.classList.add('dark');
        if (navTitleBg) navTitleBg.classList.add('visible');
    } else {
        productSection.classList.remove('visible');
        if (navContent) navContent.classList.remove('dark-text');
        if (navListToggle) navListToggle.classList.remove('dark');
        if (navTitleBg) navTitleBg.classList.remove('visible');
    }

    // Fade out nav frame (white bordered box)
    if (navContent) {
        // Fade out completely by 20% scroll
        const frameOpacity = Math.max(0, 1 - (scrollFraction * 5));
        navContent.style.setProperty('--frame-opacity', frameOpacity);
    }

    // Make title + subtitle fly to top-left at 30% scroll
    const navTitle = document.querySelector('.nav-title');
    const navSubtitle = document.querySelector('.nav-subtitle');
    const headingThreshold = 0.3;

    if (navTitle) {
        if (scrollFraction > headingThreshold) {
            if (!navTitle.classList.contains('fly-to-top')) {
                const rect = navTitle.getBoundingClientRect();
                // Scale is 0.38 (from CSS), so scaled height ≈ rect.height * 0.38
                // Center vertically in the 50px nav-title-bg: top = 25 - scaledHeight/2
                const scaledHeight = rect.height * 0.38;
                const targetX = 68 - rect.left; // leave room for toggle button (~40px) + extra gap
                const targetY = (25 - scaledHeight / 2) - rect.top;
                navTitle.style.setProperty('--fly-x', `${targetX}px`);
                navTitle.style.setProperty('--fly-y', `${targetY}px`);
                navTitle.style.transitionDelay = '0s';
                navTitle.classList.add('fly-to-top');
            }
        } else {
            if (navTitle.classList.contains('fly-to-top')) {
                navTitle.style.transitionDelay = '0.12s';
                navTitle.classList.remove('fly-to-top');
            }
        }
    }

    if (navSubtitle) {
        if (scrollFraction > headingThreshold) {
            if (!navSubtitle.classList.contains('fly-to-top')) {
                const rect = navSubtitle.getBoundingClientRect();
                const targetX = 32 - rect.left;
                const targetY = 24 - rect.top;
                navSubtitle.style.setProperty('--fly-x', `${targetX}px`);
                navSubtitle.style.setProperty('--fly-y', `${targetY}px`);
                navSubtitle.style.transitionDelay = '0.15s';
                navSubtitle.classList.add('fly-to-top');
            }
        } else {
            if (navSubtitle.classList.contains('fly-to-top')) {
                navSubtitle.style.transitionDelay = '0s';
                navSubtitle.classList.remove('fly-to-top');
            }
        }
    }

    // Trigger nav items to fly one-by-one to bottom-left corner at 30% scroll
    const navItems = document.querySelectorAll('.nav-col-left p, .nav-col-left a');
    const listThreshold = 0.3;

    navItems.forEach((item, i) => {
        if (scrollFraction > listThreshold) {
            if (!item.classList.contains('fly-to-corner')) {
                const rects = Array.from(navItems).map(el => el.getBoundingClientRect());
                const gap = 6;
                const totalHeight = rects.reduce((sum, r) => sum + r.height + gap, -gap);
                const stackTop = window.innerHeight - 32 - totalHeight;

                let accY = stackTop;
                navItems.forEach((el, j) => {
                    if (!el.classList.contains('fly-to-corner')) {
                        const r = rects[j];
                        const targetX = 32 - r.left;
                        const targetY = accY - r.top;
                        el.style.setProperty('--fly-x', `${targetX}px`);
                        el.style.setProperty('--fly-y', `${targetY}px`);
                        el.style.transitionDelay = `${j * 0.08}s`;
                        el.classList.add('fly-to-corner');
                    }
                    accY += rects[j].height + gap;
                });
                return;
            }
        } else {
            if (item.classList.contains('fly-to-corner')) {
                item.style.transitionDelay = `${(navItems.length - 1 - i) * 0.06}s`;
                item.classList.remove('fly-to-corner');
            }
        }
    });
    // Show / hide the toggle button only when scroll sequence ends (last frame)
    if (navListToggle) {
        if (scrollFraction > 0.80) {
            navListToggle.classList.add('visible');
        } else {
            navListToggle.classList.remove('visible');
            // If the user scrolls back, reset hidden state so items reappear naturally
            if (navItemsAreHidden) {
                navItemsAreHidden = false;
                if (navOverlay) navOverlay.classList.remove('nav-items-hidden');
                document.body.classList.remove('nav-collapsed');
                navListToggle.classList.remove('hidden-state');
            }
        }
    }
}

lenis.on('scroll', onScroll);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    updateImage(currentFrameIndex);
});

// Start the animation loop
preloadImages();
animate();
