// Підключення функціоналу "Чертоги Фрілансера"
import { FLS } from "@js/common/functions.js";

import './scroll.scss'

export function headerScroll() {
	const header = document.querySelector('[data-fls-header-scroll]');
	const breadcrumbs = document.querySelector('[data-fls-breadcrumbs-scroll]');

	const headerShow = header.hasAttribute('data-fls-header-scroll-show');
	const headerShowTimer = header.dataset.flsHeaderScrollShow ? header.dataset.flsHeaderScrollShow : 500;
	const startPoint = header.dataset.flsHeaderScroll ? header.dataset.flsHeaderScroll : 1;
	let scrollDirection = 0;
	let timer;
	document.addEventListener("scroll", function (e) {
		const scrollTop = window.scrollY;
		clearTimeout(timer);
		if (scrollTop >= startPoint) {
			!header.classList.contains('--header-scroll') ? header.classList.add('--header-scroll') : null;
			!breadcrumbs?.classList.contains('--breadcrumbs-scroll') ? breadcrumbs?.classList.add('--breadcrumbs-scroll') : null;


			if (headerShow) {
				if (scrollTop > scrollDirection) {
					// downscroll code
					header.classList.contains('--header-show') ? header.classList.remove('--header-show') : null;
					breadcrumbs?.classList.contains('--breadcrumbs-show') ? breadcrumbs?.classList.remove('--breadcrumbs-show') : null;


				} else {
					// upscroll code
					!header.classList.contains('--header-show') ? header.classList.add('--header-show') : null;
					!breadcrumbs?.classList.contains('--breadcrumbs-show') ? breadcrumbs?.classList.add('--breadcrumbs-show') : null;


				}
				timer = setTimeout(() => {
					!header.classList.contains('--header-show') ? header.classList.add('--header-show') : null;
					!breadcrumbs?.classList.contains('--breadcrumbs-show') ? breadcrumbs?.classList.add('--breadcrumbs-show') : null;


				}, headerShowTimer);
			}
		} else {
			header.classList.contains('--header-scroll') ? header.classList.remove('--header-scroll') : null;
			breadcrumbs?.classList.contains('--breadcrumbs-scroll') ? breadcrumbs?.classList.remove('--breadcrumbs-scroll') : null;


			if (headerShow) {
				header.classList.contains('--header-show') ? header.classList.remove('--header-show') : null;
				breadcrumbs?.classList.contains('--breadcrumbs-show') ? breadcrumbs?.classList.remove('--breadcrumbs-show') : null;


			}
		}
		scrollDirection = scrollTop <= 0 ? 0 : scrollTop;
	});
}
document.querySelector('[data-fls-header-scroll]') ?
	window.addEventListener('load', headerScroll) : null