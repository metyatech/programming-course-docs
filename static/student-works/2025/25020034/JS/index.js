// KVとアルバムのスクロール設定

$('.kv').slick({
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
});

$('.album').slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: false,
});


// ---------------------------
// nav 内のリンクだけ active を付ける
// ---------------------------
$(function () {
    const path = location.pathname;

    $("header nav a").each(function () {
        const href = $(this).attr("href");

        // 空リンクは除外（Live や sample の空 href 防止）
        if (!href || href === "#") return;

        // 現在のページとリンク先が一致したら active を付ける
        if (path.includes(href)) {
            $("header nav a").removeClass("active");
            $(this).addClass("active");
        }
    });
});



//アルバム収録曲の表示 / 非表示 

function checkAllClosed() {
    if ($(".detail > div:visible").length === 0) {
        $(".detail").removeClass("show");
    }
}

$(".albums img").on("click", function () {
    const target = $(this).data("target");

    $(".detail > div").not("." + target).slideUp(checkAllClosed);
    $("." + target).slideToggle(checkAllClosed);

    $(".detail").addClass("show");
});


// シングル / アルバム　切り替え

$(".tab-single").on("click", function () {

    // 表示切り替え
    $("#album").removeClass("look").addClass("none");
    $("#single").removeClass("none").addClass("look");

    // active 切り替え
    $(".tab-single").addClass("active").addClass("bc");
    $(".tab-album").removeClass("active").removeClass("bc");

});


$(".tab-album").on("click", function () {

    // 表示切り替え
    $("#single").removeClass("look").addClass("none");
    $("#album").removeClass("none").addClass("look");

    // active 切り替え
    $(".tab-album").addClass("active").addClass("bc");
    $(".tab-single").removeClass("active").removeClass("bc");
});



// Live 系ページならリンク無効化
if (location.pathname.includes("live")) {
    const liveLink = document.querySelector('nav a[href="live.html"]');
    if (liveLink) {
        liveLink.classList.add("no-click");
        liveLink.removeAttribute("href"); // 完全に無効化
    }
}


document.querySelectorAll('h1').forEach(h1 => {

    // 文字を span に包む
    let text = h1.textContent;
    h1.innerHTML = `<span>${text}</span>`;
    let span = h1.querySelector("span");

    // hover でフォント変更
    span.addEventListener("mouseenter", () => {
        span.classList.add("fade");
        setTimeout(() => {
            span.style.fontFamily = '"Zen Old Mincho", serif';
            span.classList.remove("fade");
        }, 300);
    });

    span.addEventListener("mouseleave", () => {
        span.classList.add("fade");
        setTimeout(() => {
            span.style.fontFamily = 'Evefont';
            span.classList.remove("fade");
        }, 300);
    });

});


document.querySelectorAll('h2').forEach(h2 => {

    // 文字を span に包む（自動処理）
    let text = h2.textContent;
    h2.innerHTML = `<span>${text}</span>`;
    let span = h2.querySelector("span");

    span.addEventListener("mouseenter", () => {
        span.classList.add("fade");
        setTimeout(() => {
            span.style.fontFamily = '"Zen Old Mincho", serif';
            span.classList.remove("fade");
        }, 300);
    });

    span.addEventListener("mouseleave", () => {
        span.classList.add("fade");
        setTimeout(() => {
            span.style.fontFamily = 'Evefont';
            span.classList.remove("fade");
        }, 300);
    });

});

document.querySelectorAll('h3').forEach(h3 => {

    // 文字を span に包む
    let text = h3.textContent;
    h3.innerHTML = `<span>${text}</span>`;
    let span = h3.querySelector("span");

    // hover でフォント変更
    span.addEventListener("mouseenter", () => {
        span.classList.add("fade");
        setTimeout(() => {
            span.style.fontFamily = '"Zen Old Mincho", serif';
            span.classList.remove("fade");
        }, 300);
    });

    span.addEventListener("mouseleave", () => {
        span.classList.add("fade");
        setTimeout(() => {
            span.style.fontFamily = 'Evefont';
            span.classList.remove("fade");
        }, 300);
    });

});

$(".tab-single").on("click", function () {

    // 表示切り替え
    $("#album").removeClass("look").addClass("none");
    $("#single").removeClass("none").addClass("look");

    // active 切り替え
    $(".tab-single").addClass("active").addClass("bc");
    $(".tab-album").removeClass("active").removeClass("bc");

});


$(".tab-album").on("click", function () {

    // 表示切り替え
    $("#single").removeClass("look").addClass("none");
    $("#album").removeClass("none").addClass("look");

    // active 切り替え
    $(".tab-album").addClass("active").addClass("bc");
    $(".tab-single").removeClass("active").removeClass("bc");
});