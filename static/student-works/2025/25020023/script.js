document.addEventListener("DOMContentLoaded", () => {

  /* ============================
      ドロワーメニュー
  ============================ */
  const drawer = document.getElementById("drawer");
  const menuBtn = document.getElementById("menu-btn");
  const closeBtn = document.getElementById("close");

  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      drawer.classList.add("open");
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      drawer.classList.remove("open");
    });
  }

  // メニュー内リンクを押したら閉じる
  document.querySelectorAll("#drawer a").forEach(link => {
    link.addEventListener("click", () => {
      drawer.classList.remove("open");
    });
  });

  /* ============================
      スライダー（全共通）
  ============================ */

  const sliders = document.querySelectorAll(".slider");

  sliders.forEach(slider => {
    const slides = slider.querySelector(".slides");
    const images = slides.querySelectorAll("img");
    const prev = slider.querySelector(".prev");
    const next = slider.querySelector(".next");

    let index = 0;

    // 初期セット
    slides.style.display = "flex";
    slides.style.transition = "transform 0.5s ease";
    images.forEach(img => {
      img.style.width = "100%";
      img.style.flexShrink = "0";
    });

    function updateSlide() {
      slides.style.transform = `translateX(${-index * 100}%)`;
    }

    // → 次へ
    next.addEventListener("click", () => {
      index = (index + 1) % images.length;
      updateSlide();
    });

    // ← 前へ
    prev.addEventListener("click", () => {
      index = (index - 1 + images.length) % images.length;
      updateSlide();
    });

  });

});

// フェードスライダー
const fadeSliders = document.querySelectorAll(".fade-slider");

fadeSliders.forEach(slider => {
  const slides = slider.querySelectorAll(".fade-slide");
  const prevButton = slider.querySelector(".prev");
  const nextButton = slider.querySelector(".next");

  let index = 0;
  let interval;

  function showSlide(i) {
    slides.forEach(s => s.classList.remove("active"));
    slides[i].classList.add("active");
  }

  // 次へ
  function nextSlide() {
    index = (index + 1) % slides.length;
    showSlide(index);
  }

  // 前へ
  function prevSlide() {
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
  }

  // 自動再生スタート
  function startAuto() {
    interval = setInterval(nextSlide, 3000);
  }

  // 一時停止
  function stopAuto() {
    clearInterval(interval);
  }

  // ボタン操作
  nextButton.addEventListener("click", () => {
    stopAuto();
    nextSlide();
    startAuto();
  });

  prevButton.addEventListener("click", () => {
    stopAuto();
    prevSlide();
    startAuto();
  });

  // ホバーしたら止まる（PC用）
  slider.addEventListener("mouseenter", stopAuto);
  slider.addEventListener("mouseleave", startAuto);

  // 最初のスライド表示 & オートスタート
  showSlide(index);
  startAuto();
});