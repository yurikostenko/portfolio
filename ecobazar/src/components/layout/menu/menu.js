// Підключення функціоналу "Чортоги Фрілансера"
import { addTouchAttr, bodyLockStatus, bodyLockToggle, FLS } from "@js/common/functions.js"

import './menu.scss'

export function menuInit() {
	document.addEventListener("click", function (e) {
		const t = e.target

		// 1) Бургер — пріоритетно і повертаємося
		if (bodyLockStatus && t.closest('[data-fls-menu]')) {
			bodyLockToggle()
			document.documentElement.toggleAttribute('data-fls-menu-open')
			return
		}

		// 2) Тригер підменю — підтримуємо кнопку та span всередині
		const trigger = t.closest('.menu__button, .menu__arrow')
		if (trigger) {
			const item = trigger.closest('.menu__item')
			if (!item) return
			const root = item.closest('.menu') || document

			// закриваємо інші лише в межах поточного меню
			root.querySelectorAll('.menu__item.--active').forEach(i => {
				if (i !== item) i.classList.remove('--active')
			})

			// переключаємо поточний
			item.classList.toggle('--active')

			// не даємо спливати/перенаправляти
			e.preventDefault()
			e.stopImmediatePropagation()
			return
		}

		// 3) Клік поза меню — закриваємо всі відкриті
		if (!t.closest('.menu')) {
			document.querySelectorAll('.menu__item.--active').forEach(i => i.classList.remove('--active'))
		}
	})
}

document.querySelector('[data-fls-menu]') ?
	window.addEventListener('load', menuInit) : null

