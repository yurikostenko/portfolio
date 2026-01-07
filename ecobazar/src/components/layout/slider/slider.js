
import Swiper from 'swiper'
import { Navigation, Thumbs, Zoom, EffectFade } from 'swiper/modules'
import './slider.scss'
import 'swiper/css/zoom'


// Ініціалізація слайдерів
function initSliders() {

	// ====================== REVIEWS SLIDER ======================
	if (document.querySelector('.slider-reviews')) {
		new Swiper('.slider-reviews', {
			modules: [Navigation],
			loop: true,
			speed: 800,
			navigation: {
				nextEl: '.block-header__slider-arrow--right',
				prevEl: '.block-header__slider-arrow--left',
			},
			breakpoints: {
				320: {
					slidesPerView: 1.1,
					spaceBetween: 10,
				},
				600: {
					slidesPerView: 1.4,
					spaceBetween: 15,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				1050: {
					slidesPerView: 3,
					spaceBetween: 24,
				},
			},
		})
	}
	// ====================== TEAM SLIDER ======================
	if (document.querySelector('.team-about__slider')) {
		new Swiper('.team-about__slider', {
			modules: [Navigation],
			loop: true,
			speed: 700,
			navigation: {
				nextEl: '.team-about__button--right',
				prevEl: '.team-about__button--left',
			},
			breakpoints: {
				320: {
					slidesPerView: 1.1,
					spaceBetween: 10,
				},
				400: {
					slidesPerView: 1.6,
					spaceBetween: 15,
				},
				600: {
					slidesPerView: 2.5,
					spaceBetween: 15,
				},
				768: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1050: {
					slidesPerView: 4,
					spaceBetween: 24,
				},
			},
		})
	}


	// ====================== PRODUCT GALLERY SLIDERS ======================
	// ====================== PRODUCT GALLERY SLIDERS ======================
	// ⚠️ Примітка: effect: 'fade' та zoom у Swiper несумісні (баг з v10+)
	// Якщо потрібен зум — залишайте effect закоментованим або видаляйте його.
	// Якщо fade-ефект важливіший — зум потрібно вимкнути.
	//
	// Тобто:
	//   ✅ loop + zoom → працює
	//   ✅ fade → працює, але без zoom
	//   ❌ fade + zoom → обрізає зображення через overflow:hidden

	if (document.querySelector('.gallery-product')) {

		// Слайдер мініатюр
		const thumbsSlider = new Swiper('.thumbs-gallery-product__slider', {
			modules: [Navigation],
			loop: true,
			spaceBetween: 12,
			navigation: {
				nextEl: '.thumbs-gallery-product__arrow--down',
				prevEl: '.thumbs-gallery-product__arrow--up',
			},
			breakpoints: {
				320: {
					slidesPerView: 3,
					direction: 'horizontal',
				},
				550: {
					slidesPerView: 4,
					direction: 'vertical',
				},
			},
		})

		// Слайдер головного зображення
		const mainSlider = new Swiper('.main-gallery-product', {
			modules: [Thumbs, Zoom, EffectFade],
			loop: true,
			speed: 300,
			slidesPerView: 1,
			// effect: 'fade',
			fadeEffect: {
				crossFade: true,
			},
			zoom: {
				enabled: true,
				maxRatio: 3,
				minRatio: 1,
				toggle: true,
				panOnMouseMove: true,
			},
			thumbs: {
				swiper: thumbsSlider,
			},
		})
	}
}

// Запуск після завантаження сторінки
window.addEventListener('load', initSliders)



