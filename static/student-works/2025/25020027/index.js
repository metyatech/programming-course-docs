// ========================================
// ハンバーガーメニュー
// ========================================
const burger = document.querySelector('.header__burger');
const nav = document.querySelector('.header__nav');

if (burger) {
  burger.addEventListener('click', () => {
    nav.classList.toggle('header__nav--active');
    burger.classList.toggle('header__burger--active');
  });
}

// ========================================
// ヒーロースライダー（ドット切り替え）
// ========================================
const dots = document.querySelectorAll('.hero__dot');

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    // 全てのドットから active クラスを削除
    dots.forEach(d => d.classList.remove('hero__dot--active'));
    // クリックされたドットに active クラスを追加
    dot.classList.add('hero__dot--active');
    
    // 実際のスライド切り替え処理（画像切り替えなど）は省略
    console.log(`スライド ${index} に切り替え`);
  });
});

// ========================================
// スムーススクロール
// ========================================
const navLinks = document.querySelectorAll('a[href^="#"]');

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ========================================
// 音楽再生ボタン（モーダル等は省略）
// ========================================
const playButtons = document.querySelectorAll('.music__play-btn');

playButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    console.log('音楽再生ボタンがクリックされました');
    // モーダル表示や実際の再生処理はここに追加
  });
});