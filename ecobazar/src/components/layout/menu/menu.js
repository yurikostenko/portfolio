// Підключення функціоналу "Чортоги Фрілансера"
import { addTouchAttr, bodyLockStatus, bodyLockToggle, FLS } from "@js/common/functions.js"

import './menu.scss'

export function menuInit() {
	document.addEventListener("click", function (e) {
		const t = e.target

		if (bodyLockStatus && t.closest('[data-fls-menu]')) {
			bodyLockToggle()
			document.documentElement.toggleAttribute('data-fls-menu-open')
			return
		}

		const trigger = t.closest('.menu__button, .menu__arrow')
		if (trigger) {
			const item = trigger.closest('.menu__item')
			if (!item) return
			const root = item.closest('.menu') || document

			root.querySelectorAll('.menu__item.--active').forEach(i => {
				if (i !== item) i.classList.remove('--active')
			})

			item.classList.toggle('--active')

			e.preventDefault()
			e.stopImmediatePropagation()
			return
		}

		if (!t.closest('.menu')) {
			document.querySelectorAll('.menu__item.--active').forEach(i => i.classList.remove('--active'))
		}
	})

	const current = window.location.pathname.split('/').pop() || 'index.html'
	const links = document.querySelectorAll('.menu__link')
	links.forEach(link => {
		const href = link.getAttribute('href')
		if (href === current) link.classList.add('is-active')
	})

}

document.querySelector('[data-fls-menu]') ?
	window.addEventListener('load', menuInit) : null

