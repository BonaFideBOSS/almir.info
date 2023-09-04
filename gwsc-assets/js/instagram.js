$(document).ready(function () {
  get_insta_photos()
})

function get_insta_photos() {
  url = `/instagram-photos`
  $.get(url).done(function (photos) {
    if (photos.length > 0) {
      render_instagram_photos(photos)
    }
  })
}

function render_instagram_photos(photos) {
  var insta_photos = ""
  photos.forEach(photo => {
    insta_photos += `<img src="${photo}" width="100%" height="100%">`
  });

  var container = `
  <div class="container my-5 py-5">
    <div class="d-flex flex-md-row flex-column align-items-center mb-4">
      <h3 class="display-6 mb-0"><i class="text-pink fa-brands fa-instagram"></i> @gwsc</h3>
      <a class="ms-md-auto mt-md-0 mt-3 btn fs-5 btn-primary" href="https://www.instagram.com/gwsc.almir/"
        target="_blank">Follow us on Instagram</a>
    </div>
    <div class="slider-container">
      <div class="slider-content d-flex flex-row gap-2">${insta_photos}</div>
      <div class="slide-left py-3 px-3 bg-light-subtle rounded shadow" onclick="slide_left()">
        <i class="fa-solid fa-chevron-left"></i>
      </div>
      <div class="slide-right py-3 px-3 bg-light-subtle rounded shadow" onclick="slide_right()">
        <i class="fa-solid fa-chevron-right"></i>
      </div>
    </div>
  </div>`

  $('#instagram-photos-container').html(container)
}

function slide_right() {
  $('.slider-content').animate({ scrollLeft: "+=300px" }, "slow");
}

function slide_left() {
  $('.slider-content').animate({ scrollLeft: "-=300px" }, "slow");
}