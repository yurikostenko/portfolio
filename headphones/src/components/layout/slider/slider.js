/*
Документація по роботі у шаблоні: 
Документація слайдера: https://swiperjs.com/
Сніппет(HTML): swiper
*/

// Підключаємо слайдер Swiper з node_modules
// При необхідності підключаємо додаткові модулі слайдера, вказуючи їх у {} через кому
// Приклад: { Navigation, Autoplay }
import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
// import { Navigation } from 'swiper/modules';
/*
Основні модулі слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Детальніше дивись https://swiperjs.com/
*/

// Стилі Swiper
// Підключення базових стилів
import "./slider.scss";
import 'swiper/css/pagination';
// Повний набір стилів з node_modules
// import 'swiper/css/bundle';

// Базовий конфіг для всіх слайдерів
const baseConfig = {
	observer: true,
	observeParents: true,
	speed: 800,
	grabCursor: true,
	spaceBetween: 16,
};

// Конфіги для різних типів слайдерів
const sliderConfigs = {
	advantages: {
		slidesPerView: 1.11,
		breakpoints: {
			420: { slidesPerView: 1.15 },
		},
	},

	details: {
		slidesPerView: 1.1,
		breakpoints: {
			600: { slidesPerView: 2 },
			992: { slidesPerView: 3 },
		},
	},

	techspecs: {
		slidesPerView: 1,
	}
};

// Ініціалізація 
function initSliders() {

	const sliders = document.querySelectorAll('[data-fls-slider]');

	if (!sliders.length) return;

	sliders.forEach(slider => {
		const type = slider.dataset.slider;
		const paginationEl = slider.querySelector('.swiper-pagination');

		if (!sliderConfigs[type]) return;

		let extraConfig = {};

		if (type === 'techspecs' && paginationEl) {
			const slides = slider.querySelectorAll('.swiper-slide');
			const colors = [...slides].map(slide => slide.dataset.color);

			extraConfig = {
				pagination: {
					el: paginationEl,
					clickable: true,
					renderBullet: function (index, className) {
						return `<span class="${className}" style="background:${colors[index]}"></span>`;
					},
				},
			};
		}

		new Swiper(slider, {
			modules: paginationEl ? [Pagination] : [],
			...baseConfig,
			...sliderConfigs[type],
			...extraConfig,
			...(paginationEl && type !== 'techspecs' && {
				pagination: {
					el: paginationEl,
					clickable: true,
				},
			}),
		});
	});

}

window.addEventListener("load", initSliders) 
