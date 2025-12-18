// ハンバーガーメニュー
const hamBtn = document.querySelector(".ham-btn");

if (hamBtn) {
  hamBtn.addEventListener("click", () => {
    hamBtn.classList.toggle("is-open");
    const isOpen = hamBtn.classList.contains("is-open");
    hamBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}

// スライドヒーロー
const heroImg = document.querySelector(".hero-image");
const heroDots = document.querySelectorAll(".hero-dot");

heroDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const index = dot.dataset.hero; Ï
    heroImg.src = `image/hero${index}.png`;
    heroDots.forEach((d) => d.classList.remove("is-active"));
    dot.classList.add("is-active");
  });
});