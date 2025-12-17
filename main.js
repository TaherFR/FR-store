// Starfield animation
function createStars() {
    const starCount = window.innerWidth < 600 ? 80 : 160;
    const starsBg = document.getElementById('stars-bg');
    starsBg.innerHTML = '';
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 1.5 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.opacity = Math.random() * 0.5 + 0.5;
        const duration = Math.random() * 8 + 6;
        star.style.animationDuration = `${duration}s`;
        star.style.animationDelay = `${-Math.random() * duration}s`;
        starsBg.appendChild(star);
    }
}
window.addEventListener('resize', createStars);
window.addEventListener('DOMContentLoaded', createStars);

// Modal logic
let scrollY = 0;
function showSocialModal(product, price) {
    document.getElementById('modal-product-title').textContent = 'Buy ' + product;
    document.getElementById('modal-product-price').textContent = price;
    const modal = document.getElementById('social-modal');
    modal.classList.add('active');
    scrollY = window.scrollY;
    document.body.style.top = `-${scrollY}px`;
    document.body.style.position = 'fixed';
    const focusTarget = modal.querySelector('button, [tabindex]:not([tabindex="-1"])');
    if (focusTarget) focusTarget.focus();
    trapFocus(modal);
}
function closeSocialModal() {
    const modal = document.getElementById('social-modal');
    modal.classList.remove('active');
    document.body.style.position = '';
    document.body.style.top = '';
    window.scrollTo(0, scrollY);
}
function trapFocus(modal) {
    const focusable = modal.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    modal.addEventListener('keydown', function (e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            } else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        }
    });
}
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeSocialModal();
});
document.getElementById('social-modal').addEventListener('click', function (e) {
    if (e.target === this) closeSocialModal();
});
document.querySelectorAll('a[href="#top"]').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const btn = card.querySelector('.buy-btn');
            if (btn) {
                btn.focus();
                btn.click();
            }
        }
    });
});