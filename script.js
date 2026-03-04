const container = document.getElementById("productContainer");
const indicator = document.getElementById("scrollIndicator");

let isHovering = false;

indicator.addEventListener("mouseenter", () => { isHovering = true; updateScrollIndicator(); });
indicator.addEventListener("mouseleave", () => { isHovering = false; updateScrollIndicator(); });
indicator.addEventListener("touchstart", () => { isHovering = true; updateScrollIndicator(); });
indicator.addEventListener("touchend", () => { isHovering = false; updateScrollIndicator(); });

function updateScrollIndicator() {
  const scrollWidth = container.scrollWidth;
  const clientWidth = container.clientWidth;
  const scrollLeft = container.scrollLeft;

  const maxScroll = scrollWidth - clientWidth;

  if (maxScroll <= 0) {
    indicator.style.width = "0px";
    indicator.style.transform = "translateX(0px) scaleY(1)";
    return;
  }

  const visibleRatio = clientWidth / scrollWidth;
  const trackWidth = indicator.parentElement.clientWidth;
  const thumbWidth = trackWidth * visibleRatio;
  const scrollRatio = scrollLeft / maxScroll;
  const maxTranslate = trackWidth - thumbWidth;

  const scale = isHovering ? 1.5 : 1;

  indicator.style.width = `${thumbWidth}px`;
  indicator.style.transform = `translateX(${scrollRatio * maxTranslate}px) scaleY(${scale})`;
}

container.addEventListener("scroll", updateScrollIndicator);
window.addEventListener("resize", updateScrollIndicator);

updateScrollIndicator();

const scrollTrack = indicator.parentElement;

scrollTrack.addEventListener("click", (e) => {
  // Get the click position relative to the track
  const trackRect = scrollTrack.getBoundingClientRect();
  const clickX = e.clientX - trackRect.left;

  // Calculate scroll ratio
  const trackWidth = scrollTrack.clientWidth;
  const scrollRatio = clickX / trackWidth;

  // Scroll container to corresponding position
  const maxScroll = container.scrollWidth - container.clientWidth;
  container.scrollTo({
    left: scrollRatio * maxScroll,
    behavior: "smooth" // smooth scrolling
  });
});
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

const slider = document.getElementById("productContainer");
let isDown = false;
let startX = 0;
let scrollLeft = 0;

slider.addEventListener("mousedown", (e) => {
  isDown = true;
  slider.classList.add("cursor-grabbing");
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

window.addEventListener("mouseup", () => {
  isDown = false;
  slider.classList.remove("cursor-grabbing");
});

slider.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 1;
  slider.scrollLeft = scrollLeft - walk;
});

slider.addEventListener("dragstart", (e) => e.preventDefault());