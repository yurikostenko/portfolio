// Підключення функціоналу "Чортоги Фрілансера"
import { addTouchAttr, addLoadedAttr, isMobile, FLS } from "@js/common/functions.js"

// Додає [data-touch] або [data-pc] на <html>
addTouchAttr()

// Додає атрибут [data-loaded] після завантаження сторінки
addLoadedAttr()


document.addEventListener('DOMContentLoaded', () => {
   const filterButton = document.querySelector('.header-catalog__button')
   const filterAside = document.querySelector('.catalog__filter')

   if (filterButton && filterAside) {
      filterButton.addEventListener('click', () => {
         filterAside.classList.toggle('filter--active')
         filterButton.classList.toggle('active')
         document.body.classList.toggle('lock')
      })
   }
})



