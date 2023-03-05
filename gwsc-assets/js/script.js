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
    '<img src="https://almir.info/gwsc-assets/img/company/gwsc_logo.png" width="20" class="me-2">' +
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
  $('.dropdown-hover').hover(function () {
      $(this).find('.dropdown-menu:eq(0)').addClass('show')
    },
    function () {
      $(this).find('.dropdown-menu').removeClass('show')
    });
});

$('#navbar-mobile .dropdown').on('click', function () {
  $(this).find('.fa-caret-up').addClass('fa-caret-down')
  $(this).find('.fa-caret-down').addClass('fa-caret-up')
})

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
mediaQuery.addEventListener("change", side_menu)
side_menu(mediaQuery)

$('#enlarge-img').on('show.bs.modal', function (event) {
  const button = event.relatedTarget
  const recipient = button.getAttribute('src')
  const img = this.querySelector('.modal-body img')
  img.src = recipient
})


const weatherApiKey = "f5b94f04261b4c0e824174523232402"
var weatherApiQuery = $('.visitor-weather').data('ip')
$.get('https://api.weatherapi.com/v1/current.json?key=' + weatherApiKey + '&q=' + weatherApiQuery + '&aqi=no',
  function (data) {
    const name = data.location.name
    const icon = data.current.condition.icon
    const condition = data.current.condition.text
    const humidity = data.current.humidity
    const wind = data.current.wind_mph
    const temp_c = data.current.temp_c
    const temp_f = data.current.temp_f
    $('.visitor-weather').html('<img src="' + icon + '" width="30px" class="mb-1"/> ' + temp_c + '<sup>o</sup>C')
  });