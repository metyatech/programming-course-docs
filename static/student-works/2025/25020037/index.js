let swiper = new Swiper(".swiper", {
    loop: true,
    autoplay: {
        delay: 10000,
    },

    pagination: {
        el: '.swiper-pagination',
    },
});


let hamBtnYouso = document.querySelector(".ham_btn");
let drawerYoso = document.querySelector(".main_nav");

hamBtnYoso.addEventListener('click', () => {
  drawerYoso.classList.toggle('open');
});


//global navi
$(function () {
  $("#js-gnav-button").on("click", function () {
    $("#js-gnav").toggleClass("is-open");
  });
  $("#js-gnav-list").on("click", function () {
    $("#js-gnav").removeClass("is-open");
  });
});