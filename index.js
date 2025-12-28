/* =======================
   UTILS
======================= */
const debounce = (func, delay = 250) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
    };
};

/* =======================
   IMAGE SLIDER
======================= */
class Slider {
    constructor(sliderSelector, interval = 5000) {
        this.slider = document.querySelector(sliderSelector);
        if (!this.slider) return;

        this.slidesContainer = this.slider.querySelector('.slides');
        this.slides = this.slider.querySelectorAll('.slide');
        this.prevBtn = this.slider.querySelector('.prev');
        this.nextBtn = this.slider.querySelector('.next');
        this.current = 0;
        this.intervalTime = interval;
        this.slideInterval = null;

        this.init();
    }

    init() {
        this.showSlide(this.current);
        this.startAutoSlide();
        this.bindEvents();
    }

    showSlide(index) {
        if (!this.slidesContainer || !this.slides.length) return;
        if (index < 0) index = this.slides.length - 1;
        if (index >= this.slides.length) index = 0;

        this.current = index;
        this.slidesContainer.style.transition = 'transform 0.6s ease-in-out';
        this.slidesContainer.style.transform = `translateX(-${this.current * 100}%)`;
    }

    startAutoSlide() {
        this.slideInterval = setInterval(() => this.showSlide(this.current + 1), this.intervalTime);
    }

    resetInterval() {
        clearInterval(this.slideInterval);
        this.startAutoSlide();
    }

    bindEvents() {
        this.prevBtn?.addEventListener('click', () => { this.showSlide(this.current - 1); this.resetInterval(); });
        this.nextBtn?.addEventListener('click', () => { this.showSlide(this.current + 1); this.resetInterval(); });

        // Pause on hover
        this.slider.addEventListener('mouseenter', () => clearInterval(this.slideInterval));
        this.slider.addEventListener('mouseleave', () => this.startAutoSlide());

        // Swipe support (mobile)
        let startX = 0;
        this.slider.addEventListener('touchstart', e => startX = e.touches[0].clientX);
        this.slider.addEventListener('touchend', e => {
            const diff = e.changedTouches[0].clientX - startX;
            if (diff > 50) this.showSlide(this.current - 1);
            if (diff < -50) this.showSlide(this.current + 1);
            this.resetInterval();
        });
    }
}

/* =======================
   GAME SEARCH
======================= */
class GameSearch {
    constructor(inputSelector, cardSelector) {
        this.input = document.querySelector(inputSelector);
        this.cards = document.querySelectorAll(cardSelector);
        if (!this.input || !this.cards.length) return;

        this.bindEvents();
    }

    bindEvents() {
        this.input.addEventListener('input', debounce(() => this.filterCards()));
    }

    filterCards() {
        const value = this.input.value.toLowerCase().trim();
        let firstMatch = null;

        this.cards.forEach(card => {
            const name = card.dataset.game?.toLowerCase() || "";
            if (value && name.includes(value)) {
                card.classList.add("highlight");
                card.classList.remove("dim");
                if (!firstMatch) firstMatch = card;
            } else {
                card.classList.remove("highlight");
                value ? card.classList.add("dim") : card.classList.remove("dim");
            }
        });

        if (firstMatch) firstMatch.scrollIntoView({ behavior: "smooth", block: "center" });
    }
}

/* =======================
   INIT
======================= */
document.addEventListener('DOMContentLoaded', () => {
    new Slider('.image-slider');
    new GameSearch('#gameSearch', '.game-card');
});
