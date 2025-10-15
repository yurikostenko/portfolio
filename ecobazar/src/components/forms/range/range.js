
import * as noUiSlider from 'nouislider'
import './range.scss'

export function rangeInit() {
	const priceSlider = document.querySelector('[data-fls-range]')
	if (priceSlider) {
		noUiSlider.create(priceSlider, {
			start: [20, 80],
			connect: true,
			range: {
				'min': [0],
				'max': [100]
			}
		})

		const rangeValue = document.querySelector('.range__value')
		const inputFrom = document.querySelector('[data-fls-range-from]')
		const inputTo = document.querySelector('[data-fls-range-to]')

		priceSlider.noUiSlider.on('update', (values) => {
			const [from, to] = values.map(v => Math.round(v))

			if (rangeValue) rangeValue.textContent = `${from} — ${to}`
			if (inputFrom) inputFrom.value = from
			if (inputTo) inputTo.value = to
		})
	}
}

document.querySelector('[data-fls-range]') ?
	window.addEventListener('load', rangeInit) : null
