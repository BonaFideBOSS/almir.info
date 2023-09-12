const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

$('.project-card').on('click', function (e) {
  if (!$(e.target).is('.btn')) {
    $('.project-card').not(this).removeClass('details-visible')
    $(this).toggleClass('details-visible')
  }
})