// ハンバーガーメニュー
const hamBtn = document.querySelector(".ham-btn");

if (hamBtn) {
  hamBtn.addEventListener("click", () => {
    hamBtn.classList.toggle("is-open");
    const isOpen = hamBtn.classList.contains("is-open");
    hamBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}
