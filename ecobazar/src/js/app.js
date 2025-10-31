// Підключення функціоналу "Чортоги Фрілансера"
import { addTouchAttr, addLoadedAttr, isMobile, FLS } from "@js/common/functions.js"

// Додає [data-touch] або [data-pc] на <html>
addTouchAttr()

// Додає атрибут [data-loaded] після завантаження сторінки
addLoadedAttr()

document.addEventListener('DOMContentLoaded', () => {

   const body = document.body
   if (!body.hasAttribute('data-page') || body.getAttribute('data-page').includes('<%')) {
      const path = window.location.pathname
      let pageName = path.split('/').pop().replace('.html', '').toLowerCase()
      if (pageName === '' || pageName === 'index') pageName = 'home'
      body.setAttribute('data-page', pageName)
   }

   const filterButton = document.querySelector('.header-catalog__button')
   const filterAside = document.querySelector('.filter')
   if (filterButton && filterAside) {
      filterButton.addEventListener('click', () => {
         filterAside.classList.toggle('filter--active')
         filterButton.classList.toggle('active')
         document.body.classList.toggle('lock')
      })
   }
})




