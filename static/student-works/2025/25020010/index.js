document.addEventListener('DOMContentLoaded', () => {
    /* =========================================
       1. PC用：ドロップダウンメニューの制御
       ========================================= */
    const navItems = document.querySelectorAll('.menu > li');
    navItems.forEach(li => {
        const link = li.querySelector('a');
        if (li.querySelector('ul')) {
            link.addEventListener('click', (e) => {
                li.classList.toggle('open');
            });
        }
        // メニューの外側をクリックしたら閉じる
        document.addEventListener('click', (e) => {
            if (!li.contains(e.target)) {
                li.classList.remove('open');
            }
        });
    });

    /* =========================================
       2. ハンバーガーメニューの制御（ドロワー）
       ========================================= */
    const hamburger = document.getElementById('js-hamburger');
    const drawer = document.getElementById('js-drawer');
    const overlay = document.getElementById('js-overlay');
    // ハンバーガーボタンをクリックした時の動作
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('is-active');
            drawer.classList.toggle('is-open');
            overlay.classList.toggle('is-open');
        });
    }
    // 暗い背景をクリックした時にメニューを閉じる
    if (overlay) {
        overlay.addEventListener('click', () => {
            hamburger.classList.remove('is-active');
            drawer.classList.remove('is-open');
            overlay.classList.remove('is-open');
        });
    }
}); 