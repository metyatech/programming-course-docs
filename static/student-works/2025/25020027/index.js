// 作品画像がクリックされたときの処理
const workImages = document.querySelectorAll('.work-img');

workImages.forEach(function(img) {
  img.addEventListener('click', function() {
    console.log('作品がクリックされました');
  });
});

// トップ画像がクリックされたときの処理
const topImages = document.querySelectorAll('.top-img, .top-img2');

topImages.forEach(function(img) {
  img.addEventListener('click', function() {
    console.log('トップ画像がクリックされました');
  });
});

// About画像がクリックされたときの処理
const aboutImg = document.querySelector('.about-img');

if (aboutImg) {
  aboutImg.addEventListener('click', function() {
    console.log('About画像がクリックされました');
  });
}

// スクロールしたときに少し動作を入れる
window.addEventListener('scroll', function() {
  const scrollTop = window.pageYOffset;
  
  if (scrollTop > 300) {
    document.body.classList.add('scrolled');
  } else {
    document.body.classList.remove('scrolled');
  }
});