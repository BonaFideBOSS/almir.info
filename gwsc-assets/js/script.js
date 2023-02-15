const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

const toastElList = document.querySelectorAll('.toast')
const toastList = [...toastElList].map(toastEl => new bootstrap.Toast(toastEl))

function bsalert(alertPlaceholder, message, type) {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)
  setTimeout(() => {
    wrapper.remove()
  }, 5000);
}

function bstoast(toast_container, message, delay = 5000) {
  toast_container = document.getElementById(toast_container)
  const wrapper = document.createElement('div')
  wrapper.classList.add('toast')
  wrapper.setAttribute("data-bs-delay", delay)
  wrapper.innerHTML = '<div class="toast-header">' +
    '<img src="../assets/img/gwsc_logo.png" width="20" class="me-2">' +
    '<strong class="me-auto">GWSC</strong>' +
    '<small>Just Now</small>' +
    '<button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>' +
    '</div>' +
    '<div class="toast-body fs-6">' + message + '</div>'
  toast_container.append(wrapper)
  const toast = new bootstrap.Toast(wrapper)
  toast.show()
}

if (window.history.replaceState) {
  window.history.replaceState(null, null, window.location.href);
}

$('#footer-year').html(new Date().getFullYear().toString())

$(function () {
  $('.nav-dropdown').hover(function () {
      $(this).find('.dropdown-menu').addClass('show')
    },
    function () {
      $(this).find('.dropdown-menu').removeClass('show')
    });
});

let scroll_to_top = document.getElementById("scroll-to-top");

window.onscroll = function () {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    scroll_to_top.style.display = "block";
  } else {
    scroll_to_top.style.display = "none";
  }
}

$(scroll_to_top).on('click', function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
})

$('#subscribe').on('submit', function (e) {
  e.preventDefault()
  const email = $(this).find('input[name="email"]').val()

  $.post("/subscribe", {
    "email": email
  }, function (response) {
    bstoast("gwsc-toast", response, 10000)
  });
  $(this).find('input[name="email"]').val('')
})

function side_menu(mediaQuery) {
  if (mediaQuery.matches) {
    $('.side-menu-btn').removeClass('visually-hidden')
    $('.side-menu-options').addClass('visually-hidden')
  } else {
    $('.side-menu-btn').addClass('visually-hidden')
    $('.side-menu-options').removeClass('visually-hidden')
  }
}
const mediaQuery = window.matchMedia('(max-width: 991.98px)')
mediaQuery.addEventListener("change",side_menu)
side_menu(mediaQuery)