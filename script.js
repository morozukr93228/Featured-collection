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
    if (isExpanded) {
      product.classList.remove('hidden');
      product.style.maxHeight = "0px";
      product.style.opacity = "0";
      product.style.transform = "translateY(16px)";

      requestAnimationFrame(() => {
        product.style.maxHeight = product.scrollHeight + "px";
        product.style.opacity = "1";
        product.style.transform = "translateY(0)";
      });

    } else {
      product.style.maxHeight = product.scrollHeight + "px";

      requestAnimationFrame(() => {
        product.style.maxHeight = "0px";
        product.style.opacity = "0";
        product.style.transform = "translateY(16px)";
      });

      setTimeout(() => {
        product.classList.add('hidden');
      }, 500);
    }
  });

  showMoreBtn.textContent = isExpanded ? "Show Less" : "Show More";
});