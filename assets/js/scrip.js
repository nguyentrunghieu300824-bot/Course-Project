document.addEventListener("DOMContentLoaded", function () {
  const carouselElement = document.getElementById("carousel-banner");

  // Lấy instance của Bootstrap Carousel để điều khiển
  const carousel = new bootstrap.Carousel(carouselElement);
  if (!carouselElement) return;

  let isDragging = false;
  let startX = 0;

  // Khi nhấn chuột xuống
  carouselElement.addEventListener("mousedown", function (e) {
    isDragging = true;
    startX = e.clientX; // Lưu lại tọa độ X ban đầu
  });

  // Khi di chuyển chuột (đang giữ chuột)
  carouselElement.addEventListener("mousemove", function (e) {
    if (!isDragging) return;

    const currentX = e.clientX;
    const diff = startX - currentX;

    // Kéo sang trái (diff > 50px) -> Chuyển slide tiếp theo
    if (diff > 50) {
      carousel.next();
      isDragging = false; // Kéo xong thì reset để không bị trôi nhiều slide 1 lúc
    }
    // Kéo sang phải (diff < -50px) -> Trở về slide trước
    else if (diff < -50) {
      carousel.prev();
      isDragging = false;
    }
  });

  // Khi nhả chuột ra hoặc chuột rời khỏi khu vực ảnh
  carouselElement.addEventListener("mouseup", function () {
    isDragging = false;
  });

  carouselElement.addEventListener("mouseleave", function () {
    isDragging = false;
  });

  // RẤT QUAN TRỌNG: Ngăn chặn trình duyệt hiển thị "ảnh mờ" (ghost image) khi kéo chuột
  carouselElement.querySelectorAll("img").forEach(function (img) {
    img.addEventListener("dragstart", function (e) {
      e.preventDefault();
    });
  });
});
