const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

$('.project-card').on('click', function (e) {
  if (!$(e.target).is('.btn')) {
    $(this).toggleClass('details-visible')
  }
})