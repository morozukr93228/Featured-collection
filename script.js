const container = document.getElementById("productContainer");
const indicator = document.getElementById("scrollIndicator");

function updateScrollIndicator() {
  const scrollWidth = container.scrollWidth;
  const clientWidth = container.clientWidth;
  const scrollLeft = container.scrollLeft;

  const maxScroll = scrollWidth - clientWidth;

  if (maxScroll <= 0) {
    indicator.style.width = "0px";
    indicator.style.transform = "translateX(0px)";
    return;
  }

  const visibleRatio = clientWidth / scrollWidth;

  const trackWidth = indicator.parentElement.clientWidth;
  const thumbWidth = trackWidth * visibleRatio;

  indicator.style.width = `${thumbWidth}px`;

  const scrollRatio = scrollLeft / maxScroll;

  const maxTranslate = trackWidth - thumbWidth;

  indicator.style.transform = `translateX(${scrollRatio * maxTranslate}px)`;
}

container.addEventListener("scroll", updateScrollIndicator);
window.addEventListener("resize", updateScrollIndicator);

updateScrollIndicator();
/* -------------------------
  show more button logic
-------------------------- */
const showMoreBtn = document.getElementById('showMoreBtn');
const extraProducts = document.querySelectorAll('.extra-product');

let isExpanded = false;

function isMobile() {
  return window.innerWidth < 768;
}

function expandAnimated() {
  extraProducts.forEach(product => {

    product.classList.remove('hidden');

    product.style.maxHeight = "0px";
    product.style.opacity = "0";
    product.style.transform = "translateY(16px)";

    requestAnimationFrame(() => {
      product.style.maxHeight = product.scrollHeight + "px";
      product.style.opacity = "1";
      product.style.transform = "translateY(0)";
    });

  });

  showMoreBtn.textContent = "Show Less";
  isExpanded = true;
}

function collapseAnimated() {
  extraProducts.forEach(product => {

    product.style.maxHeight = product.scrollHeight + "px";

    requestAnimationFrame(() => {
      product.style.maxHeight = "0px";
      product.style.opacity = "0";
      product.style.transform = "translateY(16px)";
    });

    setTimeout(() => {
      product.classList.add('hidden');
    }, 500); 
  });

  showMoreBtn.textContent = "Show More";
  isExpanded = false;
}

function collapseInstant() {
  extraProducts.forEach(product => {
    product.classList.add('hidden');
    product.style.maxHeight = "";
    product.style.opacity = "";
    product.style.transform = "";
  });

  showMoreBtn.textContent = "Show More";
  isExpanded = false;
}

showMoreBtn.addEventListener('click', () => {

  if (!isMobile()) return;

  if (isExpanded) {
    collapseAnimated();
  } else {
    expandAnimated();
  }

});

/* -------------------------
   RESIZE HANDLING
-------------------------- */
window.addEventListener('resize', () => {

  if (isMobile()) {
    collapseInstant(); 
  } else {
    extraProducts.forEach(product => {
      product.classList.remove('hidden');
      product.style.maxHeight = "";
      product.style.opacity = "";
      product.style.transform = "";
    });
  }

});