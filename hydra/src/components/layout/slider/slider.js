
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import "./slider.scss";
import 'swiper/css/bundle';

function initSliders() {

	document.querySelectorAll('[data-fls-slider]').forEach(slider => {
		const wrapper = slider.closest('.outer') || slider

		const options = {
			modules: [Navigation],
			observer: true,
			observeParents: true,
			speed: 800,
			loop: true,

			navigation: {
				prevEl: wrapper.querySelector('.swiper-button-prev'),
				nextEl: wrapper.querySelector('.swiper-button-next')
			},
		}
		// Брейкпоінти
		if (slider.dataset.flsSlider === 'hero') {
			options.slidesPerView = 3
			options.spaceBetween = 20
			options.breakpoints = {
				320: { slidesPerView: 1, spaceBetween: 15 },
				768: { slidesPerView: 2, spaceBetween: 20 },
				992: { slidesPerView: 3, spaceBetween: 20 },
			}
		}

		if (slider.dataset.flsSlider === 'services') {
			options.slidesPerView = 4
			options.spaceBetween = 30
			options.breakpoints = {
				320: { slidesPerView: 1, spaceBetween: 10 },
				600: { slidesPerView: 2, spaceBetween: 15 },
				992: { slidesPerView: 3, spaceBetween: 20 },
				1200: { slidesPerView: 4, spaceBetween: 30 },
			}
		}

		if (slider.dataset.flsSlider === 'partner') {
			options.slidesPerView = 4
			options.spaceBetween = 30
			options.breakpoints = {
				320: { slidesPerView: 1, spaceBetween: 10 },
				600: { slidesPerView: 2, spaceBetween: 15 },
				992: { slidesPerView: 3, spaceBetween: 20 },
				1200: { slidesPerView: 4, spaceBetween: 30 },
			}
		}

		if (slider.dataset.flsSlider === 'process') {
			options.slidesPerView = 4
			options.spaceBetween = 30
			options.breakpoints = {
				320: { slidesPerView: 1, spaceBetween: 10 },
				600: { slidesPerView: 2, spaceBetween: 15 },
				992: { slidesPerView: 3, spaceBetween: 20 },
				1200: { slidesPerView: 4, spaceBetween: 30 },
			}
		}

		new Swiper(slider, options)

	})
}

document.querySelector('[data-fls-slider]') ?
	window.addEventListener("load", initSliders) : null