const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

$('.project-card').on('click', function (e) {
  if (!$(e.target).is('.btn')) {
    $('.project-card').not(this).removeClass('details-visible')
    $(this).toggleClass('details-visible')
  }
})

const image_modal = document.getElementById('image-modal')
if (image_modal) {
  image_modal.addEventListener('show.bs.modal', event => {
    var showcase_item = event.relatedTarget
    var showcase_item_index = $('.showcase-item').index($(showcase_item))
    var showcase_item_title = $(showcase_item).find('.card-header').text()
    $(image_modal).find('.modal-title').text(showcase_item_title)
    $(image_modal).find('.carousel-item').removeClass('active')
    $(image_modal).find(`.carousel-item:eq(${showcase_item_index})`).addClass('active')
  })
}

$('#image-modal .carousel-control-prev,#image-modal .carousel-control-next').on('click', function () {
  var image_index = $('.carousel-item.active').index()
  var no_of_images = $('#image-modal .carousel-item').length
  if ($(this).hasClass('carousel-control-prev')) { image_index-- } else { image_index++ }
  if (image_index == -1) { image_index = no_of_images - 1 } else if (image_index == no_of_images) { image_index = 0 }
  var showcase_item_title = $(`.showcase-item:eq(${image_index}) .card-header`).text()
  $('#image-modal .modal-title').text(showcase_item_title)
})