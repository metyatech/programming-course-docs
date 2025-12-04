$('.kv').slick({
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
});

$('.album').slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
});

// jQueryで全てのアルバムにクリックイベントを設定
$(".albums.Wonder-World img").on("click", function() {
    $(".detail > div").not(".ww-detail").slideUp();
    $(".ww-detail").slideToggle();
});

$(".albums.Round-Robin img").on("click", function() {
    $(".detail > div").not(".rr-detail").slideUp();
    $(".rr-detail").slideToggle();
});

$(".albums.OFFICIAL-NUMBER img").on("click", function() {
    $(".detail > div").not(".on-detail").slideUp();
    $(".on-detail").slideToggle();
});

$(".albums.bunka img").on("click", function() {
    $(".detail > div").not(".bunka-detail").slideUp();
    $(".bunka-detail").slideToggle();
});

$(".albums.otogi img").on("click", function() {
    $(".detail > div").not(".otogi-detail").slideUp();
    $(".otogi-detail").slideToggle();
});

$(".albums.Smile img").on("click", function() {
    $(".detail > div").not(".smile-detail").slideUp();
    $(".smile-detail").slideToggle();
});

$(".albums.kaizin img").on("click", function() {
    $(".detail > div").not(".kaizin-detail").slideUp();
    $(".kaizin-detail").slideToggle();
});

$(".albums.Under-Blue img").on("click", function() {
    $(".detail > div").not(".ub-detail").slideUp();
    $(".ub-detail").slideToggle();
});