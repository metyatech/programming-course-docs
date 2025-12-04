const swiper = new Swiper(".swiper",{
    slidesPerView:4,
    loop:true,
    autoplay:{
        delay:1,
    },
    pagination:{
        el:".swiper-pagination"
    },
    navigation:{
        nextEl:".swiper-button-next",
        prevEl:".swiper-button-prev"
    },
});