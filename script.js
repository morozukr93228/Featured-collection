const container = document.getElementById("productContainer");
const indicator = document.getElementById("scrollIndicator");

function updateScrollIndicator() {
  const maxScroll = container.scrollWidth - container.clientWidth;

  if (maxScroll <= 0) return;

  const scrollRatio = container.scrollLeft / maxScroll;

  // Since thumb is fixed 28%, it can only move 72%
  const maxTranslate = 72;

  indicator.style.transform = `translateX(${scrollRatio * maxTranslate}%)`;
}

container.addEventListener("scroll", updateScrollIndicator);
window.addEventListener("resize", updateScrollIndicator);

updateScrollIndicator();

const showMoreBtn = document.getElementById('showMoreBtn');
const extraProducts = document.querySelectorAll('.extra-product');

let isExpanded = false;

showMoreBtn.addEventListener('click', () => {
  isExpanded = !isExpanded;

  extraProducts.forEach(product => {
    product.classList.toggle('hidden');
  });

  showMoreBtn.textContent = isExpanded ? "Show Less" : "Show More";
});