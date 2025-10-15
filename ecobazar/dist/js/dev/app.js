(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) return;
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) processPreload(link);
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") continue;
      for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
    }
  }).observe(document, {
    childList: true,
    subtree: true
  });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep) return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const isMobile = { Android: function() {
  return navigator.userAgent.match(/Android/i);
}, BlackBerry: function() {
  return navigator.userAgent.match(/BlackBerry/i);
}, iOS: function() {
  return navigator.userAgent.match(/iPhone|iPad|iPod/i);
}, Opera: function() {
  return navigator.userAgent.match(/Opera Mini/i);
}, Windows: function() {
  return navigator.userAgent.match(/IEMobile/i);
}, any: function() {
  return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
} };
function addTouchAttr() {
  if (isMobile.any()) document.documentElement.setAttribute("data-fls-touch", "");
}
function addLoadedAttr() {
  if (!document.documentElement.hasAttribute("data-fls-preloader-loading")) {
    window.addEventListener("load", function() {
      setTimeout(function() {
        document.documentElement.setAttribute("data-fls-loaded", "");
      }, 0);
    });
  }
}
let slideUp = (target, duration = 500, showmore = 0) => {
  if (!target.classList.contains("--slide")) {
    target.classList.add("--slide");
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = `${target.offsetHeight}px`;
    target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = showmore ? `${showmore}px` : `0px`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(() => {
      target.hidden = !showmore ? true : false;
      !showmore ? target.style.removeProperty("height") : null;
      target.style.removeProperty("padding-top");
      target.style.removeProperty("padding-bottom");
      target.style.removeProperty("margin-top");
      target.style.removeProperty("margin-bottom");
      !showmore ? target.style.removeProperty("overflow") : null;
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("--slide");
      document.dispatchEvent(new CustomEvent("slideUpDone", {
        detail: {
          target
        }
      }));
    }, duration);
  }
};
let slideDown = (target, duration = 500, showmore = 0) => {
  if (!target.classList.contains("--slide")) {
    target.classList.add("--slide");
    target.hidden = target.hidden ? false : null;
    showmore ? target.style.removeProperty("height") : null;
    let height = target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = showmore ? `${showmore}px` : `0px`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = height + "px";
    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-top");
    target.style.removeProperty("margin-bottom");
    window.setTimeout(() => {
      target.style.removeProperty("height");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("--slide");
      document.dispatchEvent(new CustomEvent("slideDownDone", {
        detail: {
          target
        }
      }));
    }, duration);
  }
};
let slideToggle = (target, duration = 500) => {
  if (target.hidden) {
    return slideDown(target, duration);
  } else {
    return slideUp(target, duration);
  }
};
let bodyLockStatus = true;
let bodyLockToggle = (delay = 500) => {
  if (document.documentElement.hasAttribute("data-fls-scrolllock")) {
    bodyUnlock(delay);
  } else {
    bodyLock(delay);
  }
};
let bodyUnlock = (delay = 500) => {
  if (bodyLockStatus) {
    const lockPaddingElements = document.querySelectorAll("[data-fls-lp]");
    setTimeout(() => {
      lockPaddingElements.forEach((lockPaddingElement) => {
        lockPaddingElement.style.paddingRight = "";
      });
      document.body.style.paddingRight = "";
      document.documentElement.removeAttribute("data-fls-scrolllock");
    }, delay);
    bodyLockStatus = false;
    setTimeout(function() {
      bodyLockStatus = true;
    }, delay);
  }
};
let bodyLock = (delay = 500) => {
  if (bodyLockStatus) {
    const lockPaddingElements = document.querySelectorAll("[data-fls-lp]");
    const lockPaddingValue = window.innerWidth - document.body.offsetWidth + "px";
    lockPaddingElements.forEach((lockPaddingElement) => {
      lockPaddingElement.style.paddingRight = lockPaddingValue;
    });
    document.body.style.paddingRight = lockPaddingValue;
    document.documentElement.setAttribute("data-fls-scrolllock", "");
    bodyLockStatus = false;
    setTimeout(function() {
      bodyLockStatus = true;
    }, delay);
  }
};
function dataMediaQueries(array, dataSetValue) {
  const media = Array.from(array).filter((item) => item.dataset[dataSetValue]).map((item) => {
    const [value, type = "max"] = item.dataset[dataSetValue].split(",");
    return { value, type, item };
  });
  if (media.length === 0) return [];
  const breakpointsArray = media.map(({ value, type }) => `(${type}-width: ${value}px),${value},${type}`);
  const uniqueQueries = [...new Set(breakpointsArray)];
  return uniqueQueries.map((query) => {
    const [mediaQuery, mediaBreakpoint, mediaType] = query.split(",");
    const matchMedia = window.matchMedia(mediaQuery);
    const itemsArray = media.filter((item) => item.value === mediaBreakpoint && item.type === mediaType);
    return { itemsArray, matchMedia };
  });
}
function menuInit() {
  document.addEventListener("click", function(e) {
    const t = e.target;
    if (bodyLockStatus && t.closest("[data-fls-menu]")) {
      bodyLockToggle();
      document.documentElement.toggleAttribute("data-fls-menu-open");
      return;
    }
    const trigger = t.closest(".menu__button, .menu__arrow");
    if (trigger) {
      const item = trigger.closest(".menu__item");
      if (!item) return;
      const root = item.closest(".menu") || document;
      root.querySelectorAll(".menu__item.--active").forEach((i) => {
        if (i !== item) i.classList.remove("--active");
      });
      item.classList.toggle("--active");
      e.preventDefault();
      e.stopImmediatePropagation();
      return;
    }
    if (!t.closest(".menu")) {
      document.querySelectorAll(".menu__item.--active").forEach((i) => i.classList.remove("--active"));
    }
  });
  const current = window.location.pathname.split("/").pop() || "index.html";
  const links = document.querySelectorAll(".menu__link");
  links.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === current) link.classList.add("is-active");
  });
}
document.querySelector("[data-fls-menu]") ? window.addEventListener("load", menuInit) : null;
class DynamicAdapt {
  constructor() {
    this.type = "max";
    this.init();
  }
  init() {
    this.objects = [];
    this.daClassname = "--dynamic";
    this.nodes = [...document.querySelectorAll("[data-fls-dynamic]")];
    this.nodes.forEach((node) => {
      const data = node.dataset.flsDynamic.trim();
      const dataArray = data.split(`,`);
      const object = {};
      object.element = node;
      object.parent = node.parentNode;
      object.destinationParent = dataArray[3] ? node.closest(dataArray[3].trim()) || document : document;
      dataArray[3] ? dataArray[3].trim() : null;
      const objectSelector = dataArray[0] ? dataArray[0].trim() : null;
      if (objectSelector) {
        const foundDestination = object.destinationParent.querySelector(objectSelector);
        if (foundDestination) {
          object.destination = foundDestination;
        }
      }
      object.breakpoint = dataArray[1] ? dataArray[1].trim() : `767.98`;
      object.place = dataArray[2] ? dataArray[2].trim() : `last`;
      object.index = this.indexInParent(object.parent, object.element);
      this.objects.push(object);
    });
    this.arraySort(this.objects);
    this.mediaQueries = this.objects.map(({ breakpoint }) => `(${this.type}-width: ${breakpoint / 16}em),${breakpoint}`).filter((item, index, self) => self.indexOf(item) === index);
    this.mediaQueries.forEach((media) => {
      const mediaSplit = media.split(",");
      const matchMedia = window.matchMedia(mediaSplit[0]);
      const mediaBreakpoint = mediaSplit[1];
      const objectsFilter = this.objects.filter(({ breakpoint }) => breakpoint === mediaBreakpoint);
      matchMedia.addEventListener("change", () => {
        this.mediaHandler(matchMedia, objectsFilter);
      });
      this.mediaHandler(matchMedia, objectsFilter);
    });
  }
  mediaHandler(matchMedia, objects) {
    if (matchMedia.matches) {
      objects.forEach((object) => {
        if (object.destination) {
          this.moveTo(object.place, object.element, object.destination);
        }
      });
    } else {
      objects.forEach(({ parent, element, index }) => {
        if (element.classList.contains(this.daClassname)) {
          this.moveBack(parent, element, index);
        }
      });
    }
  }
  moveTo(place, element, destination) {
    element.classList.add(this.daClassname);
    const index = place === "last" || place === "first" ? place : parseInt(place, 10);
    if (index === "last" || index >= destination.children.length) {
      destination.append(element);
    } else if (index === "first") {
      destination.prepend(element);
    } else {
      destination.children[index].before(element);
    }
  }
  moveBack(parent, element, index) {
    element.classList.remove(this.daClassname);
    if (parent.children[index] !== void 0) {
      parent.children[index].before(element);
    } else {
      parent.append(element);
    }
  }
  indexInParent(parent, element) {
    return [...parent.children].indexOf(element);
  }
  arraySort(arr) {
    if (this.type === "min") {
      arr.sort((a, b) => {
        if (a.breakpoint === b.breakpoint) {
          if (a.place === b.place) {
            return 0;
          }
          if (a.place === "first" || b.place === "last") {
            return -1;
          }
          if (a.place === "last" || b.place === "first") {
            return 1;
          }
          return 0;
        }
        return a.breakpoint - b.breakpoint;
      });
    } else {
      arr.sort((a, b) => {
        if (a.breakpoint === b.breakpoint) {
          if (a.place === b.place) {
            return 0;
          }
          if (a.place === "first" || b.place === "last") {
            return 1;
          }
          if (a.place === "last" || b.place === "first") {
            return -1;
          }
          return 0;
        }
        return b.breakpoint - a.breakpoint;
      });
      return;
    }
  }
}
if (document.querySelector("[data-fls-dynamic]")) {
  window.addEventListener("load", () => new DynamicAdapt());
}
function formRating() {
  const ratings = document.querySelectorAll("[data-fls-rating]");
  if (ratings) {
    ratings.forEach((rating) => {
      const ratingValue = +rating.dataset.flsRatingValue;
      const ratingSize = +rating.dataset.flsRatingSize ? +rating.dataset.flsRatingSize : 5;
      formRatingInit(rating, ratingSize);
      ratingValue ? formRatingSet(rating, ratingValue) : null;
      document.addEventListener("click", formRatingAction);
    });
  }
  function formRatingAction(e) {
    const targetElement = e.target;
    if (targetElement.closest(".rating__input")) {
      const currentElement = targetElement.closest(".rating__input");
      const ratingValue = +currentElement.value;
      const rating = currentElement.closest(".rating");
      const ratingSet = rating.dataset.flsRating === "set";
      ratingSet ? formRatingGet(rating, ratingValue) : null;
    }
  }
  function formRatingInit(rating, ratingSize) {
    let ratingItems = ``;
    for (let index = 0; index < ratingSize; index++) {
      index === 0 ? ratingItems += `<div class="rating__items">` : null;
      ratingItems += `
				<label class="rating__item">
					<input class="rating__input" type="radio" name="rating" value="${index + 1}">
				</label>`;
      index === ratingSize ? ratingItems += `</div">` : null;
    }
    rating.insertAdjacentHTML("beforeend", ratingItems);
  }
  function formRatingGet(rating, ratingValue) {
    const resultRating = ratingValue;
    formRatingSet(rating, resultRating);
  }
  function formRatingSet(rating, value) {
    const ratingItems = rating.querySelectorAll(".rating__item");
    const resultFullItems = parseInt(value);
    const resultPartItem = value - resultFullItems;
    rating.hasAttribute("data-rating-title") ? rating.title = value : null;
    ratingItems.forEach((ratingItem, index) => {
      ratingItem.classList.remove("rating__item--active");
      ratingItem.querySelector("span") ? ratingItems[index].querySelector("span").remove() : null;
      if (index <= resultFullItems - 1) {
        ratingItem.classList.add("rating__item--active");
      }
      if (index === resultFullItems && resultPartItem) {
        ratingItem.insertAdjacentHTML("beforeend", `<span style="width:${resultPartItem * 100}%"></span>`);
      }
    });
  }
}
document.querySelector("[data-fls-rating]") ? window.addEventListener("load", formRating) : null;
function addToCart() {
  document.addEventListener("click", addToCartAction);
  function addToCartAction(e) {
    const targetElement = e.target;
    if (targetElement.closest("[data-fls-addtocart-button]")) {
      let addToCart2 = document.querySelector("[data-fls-addtocart]");
      const addToCartButton = targetElement.closest("[data-fls-addtocart-button]");
      const addToCartProduct = addToCartButton.closest("[data-fls-addtocart-product]");
      if (addToCartProduct) {
        let addToCartQuantity = addToCartProduct.querySelector("[data-fls-addtocart-quantity]");
        addToCartQuantity = addToCartQuantity ? +addToCartQuantity.value : 1;
        const addToCartImage = addToCartProduct.querySelector("[data-fls-addtocart-image]");
        const flyImgSpeed = +addToCartImage.dataset.flsAddtocartImage || 1e3;
        addToCartImage ? addToCartImageFly(addToCartImage, addToCart2, flyImgSpeed) : null;
        setTimeout(() => {
          addToCart2.innerHTML = +addToCart2.innerHTML + addToCartQuantity;
        }, addToCartImage ? flyImgSpeed : 0);
        addToCartButton.classList.add("added");
        setTimeout(() => {
          addToCartButton.classList.remove("added");
        }, 2e3);
      } else {
        addToCart2.innerHTML = +addToCart2.innerHTML + 1;
      }
    }
  }
  function addToCartImageFly(addToCartImage, addToCart2, flyImgSpeed) {
    const flyImg = document.createElement("img");
    flyImg.src = addToCartImage.src;
    flyImg.style.cssText = `
			position: absolute;
			z-index:60;
			left: ${addToCartImage.getBoundingClientRect().left + scrollX}px;
			top: ${addToCartImage.getBoundingClientRect().top + scrollY}px;
			width: ${addToCartImage.offsetWidth}px;
			transition: all ${flyImgSpeed}ms;
		`;
    document.body.insertAdjacentElement("beforeend", flyImg);
    flyImg.style.left = `${addToCart2.getBoundingClientRect().left + scrollX}px`;
    flyImg.style.top = `${addToCart2.getBoundingClientRect().top + scrollY}px`;
    flyImg.style.width = 0;
    flyImg.style.opacity = `0.8`;
    setTimeout(() => {
      flyImg.remove();
    }, flyImgSpeed);
  }
}
document.querySelector("[data-fls-addtocart]") ? window.addEventListener("load", addToCart) : null;
addTouchAttr();
addLoadedAttr();
document.addEventListener("DOMContentLoaded", () => {
  const filterButton = document.querySelector(".header-catalog__button");
  const filterAside = document.querySelector(".catalog__filter");
  if (filterButton && filterAside) {
    filterButton.addEventListener("click", () => {
      filterAside.classList.toggle("filter--active");
      filterButton.classList.toggle("active");
      document.body.classList.toggle("lock");
    });
  }
});
export {
  slideUp as a,
  dataMediaQueries as d,
  slideToggle as s
};
