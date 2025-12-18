// ハンバーガーメニューの動作
document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.querySelector('.menu-icon');
    const sideMenu = document.getElementById('sideMenu');
    const overlay = document.getElementById('overlay');

    // メニューアイコンをクリックしたとき
    menuIcon.addEventListener('click', function() {
        sideMenu.classList.toggle('active');
        overlay.classList.toggle('active');
    });

    // オーバーレイをクリックしたとき
    overlay.addEventListener('click', function() {
        sideMenu.classList.remove('active');
        overlay.classList.remove('active');
    });

    // --- カルーセル機能の追加 ---
    const carousel = document.getElementById('carousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
});
