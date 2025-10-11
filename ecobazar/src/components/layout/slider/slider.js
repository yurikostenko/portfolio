/*
Документація по роботі у шаблоні: 
Документація слайдера: https://swiperjs.com/
Сніппет(HTML): swiper
*/

// Підключаємо слайдер Swiper з node_modules
// При необхідності підключаємо додаткові модулі слайдера, вказуючи їх у {} через кому
// Приклад: { Navigation, Autoplay }
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
/*
Основні модулі слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Детальніше дивись https://swiperjs.com/
*/

// Стилі Swiper
// Підключення базових стилів
import "./slider.scss";
// Повний набір стилів з node_modules
// import 'swiper/css/bundle';

// Ініціалізація слайдерів
function initSliders() {
	// Список слайдерів
	// Перевіряємо, чи є слайдер на сторінці
	if (document.querySelector('.swiper')) { // <- Вказуємо склас потрібного слайдера
		// Створюємо слайдер
		new Swiper('.swiper', { // <- Вказуємо склас потрібного слайдера
			// Підключаємо модулі слайдера
			// для конкретного випадку
			modules: [Navigation],
			observer: true,
			observeParents: true,
			slidesPerView: 3,
			spaceBetween: 24,
			//autoHeight: true,
			speed: 800,

			//touchRatio: 0,
			//simulateTouch: false,
			loop: true,
			//preloadImages: false,
			//lazy: true,

			/*
			// Ефекти
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			*/

			// Пагінація
			/*
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			*/

			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "вліво/вправо"
			navigation: {
				prevEl: '.block-header__slider-arrow--left',
				nextEl: '.block-header__slider-arrow--right',
			},

			// Брейкпоінти
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

			// Події
			on: {

			}
		});
	}
}
document.querySelector('[data-fls-slider]') ?
	window.addEventListener("load", initSliders) : null