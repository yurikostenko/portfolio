// Підключення функціоналу "Чертоги Фрілансера"
import { FLS } from "@js/common/functions.js";
// Підключення доповнення
import Isotope from 'isotope-layout/js/isotope.js';
// Підключення стилів
import './masonry.scss'
// Застосування
// function masonryRun() {
// 	document.addEventListener('click', documentActions);
// 	const isotope = document.querySelector('[data-fls-masonry]')
// 	const isotopeItems = new Isotope(isotope, {
// 		itemSelector: '[data-fls-masonry-item]',
// 		masonry: {
// 			fitWidth: true,
// 			gutter: 20
// 		}
// 	})
// Функціонал фільтру
// 	function documentActions(e) {
// 		const targetElement = e.target
// 		if (targetElement.closest('[data-fls-masonry-filter-link]')) {
// 			const filterItem = targetElement.closest('[data-fls-masonry-filter-link]')
// 			const filterValue = filterItem.dataset.flsMasonryFilterLink
// 			const filterActiveItem = document.querySelector('[data-fls-masonry-filter-link].--active')

// 			filterValue === "*" ? isotopeItems.arrange({ filter: `` }) :
// 				isotopeItems.arrange({ filter: `[data-fls-masonry-filter="${filterValue}"]` })

// 			filterActiveItem.classList.remove('--active')
// 			filterItem.classList.add('--active')

// 			e.preventDefault()
// 		}
// 	}
// }
// document.querySelector('[data-fls-masonry]') ?
// 	window.addEventListener('load', masonryRun) : null

function masonryRun() {
	document.querySelectorAll('[data-fls-masonry]').forEach((grid) => {
		const isotope = new Isotope(grid, {
			itemSelector: '[data-fls-masonry-item]',
			initLayout: false,
			transitionDuration: 0,
			masonry: {
				fitWidth: false,
				gutter: 20,
			},
		});

		let layoutFrame;

		function updateLayout() {
			cancelAnimationFrame(layoutFrame);

			layoutFrame = requestAnimationFrame(() => {
				if (grid.getClientRects().length && grid.clientWidth > 0) {
					isotope.layout();
				}
			});
		}

		// Перерахунок після завантаження фотографій
		grid.addEventListener('load', updateLayout, true);
		grid.addEventListener('error', updateLayout, true);

		// Перерахунок після відкриття вкладки
		const panel = grid.closest('[data-fls-tabs-body] > *');

		if (panel) {
			const observer = new MutationObserver(updateLayout);

			observer.observe(panel, {
				attributes: true,
				attributeFilter: ['hidden'],
			});
		}

		updateLayout();
	});
}

if (document.readyState === 'complete') {
	masonryRun();
} else {
	window.addEventListener('load', masonryRun, { once: true });
}