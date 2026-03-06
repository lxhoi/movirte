/**
 * FAQ accordion: toggle show/hide answer on question click.
 * Uses .faq-item and .faq-question / .faq-answer-wrap; toggles .is-open on .faq-item.
 */
(function () {
    document.querySelectorAll('.faq-item').forEach(function (item) {
        var btn = item.querySelector('.faq-question');
        if (!btn) return;
        btn.addEventListener('click', function () {
            var isOpen = item.classList.contains('is-open');
            item.classList.toggle('is-open', !isOpen);
            btn.setAttribute('aria-expanded', !isOpen);
        });
    });
})();
