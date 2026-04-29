// Khởi tạo các chức năng
document.addEventListener("DOMContentLoaded", () => {
  initCarouselDrag();
  initHorizontalScroll();
  initCardObserver();
});

// Kéo thả Banner Carousel
function initCarouselDrag() {
  const carouselElement = document.getElementById("carousel-banner");
  if (!carouselElement) return;

  const carousel = new bootstrap.Carousel(carouselElement);
  const dragThreshold = 50;

  let isDragging = false;
  let startX = 0;

  const stopDragging = () => {
    isDragging = false;
  };

  carouselElement.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
  });

  carouselElement.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const diff = startX - e.clientX;

    if (Math.abs(diff) > dragThreshold) {
      diff > 0 ? carousel.next() : carousel.prev();
      stopDragging();
    }
  });

  carouselElement.addEventListener("mouseup", stopDragging);
  carouselElement.addEventListener("mouseleave", stopDragging);

  carouselElement.querySelectorAll("img").forEach((img) => {
    img.addEventListener("dragstart", (e) => e.preventDefault());
  });
}

// Cuộn ngang mượt mà cho sản phẩm
function initHorizontalScroll() {
  const slider = document.querySelector(".drag-scroll");
  if (!slider) return;

  const scrollAmount = 300;

  slider.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      slider.scrollBy({
        left: e.deltaY > 0 ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    },
    { passive: false },
  );
}

// Hiệu ứng Animation khi cuộn
function initCardObserver() {
  const dragScrollContainer = document.querySelector(".drag-scroll");
  const cards = document.querySelectorAll(".drag-scroll .card");

  if (!dragScrollContainer || cards.length === 0) return;

  const observerOptions = {
    root: dragScrollContainer,
    rootMargin: "0px",
    threshold: 0.6,
  };

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("in-view", entry.isIntersecting);
    });
  }, observerOptions);

  cards.forEach((card) => cardObserver.observe(card));
}
