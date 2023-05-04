const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

const toastElList = document.querySelectorAll('.toast')
const toastList = [...toastElList].map(toastEl => new bootstrap.Toast(toastEl))

function bsalert(alertPlaceholder, message, type) {
  alertPlaceholder = document.getElementById(alertPlaceholder)
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible fs-5" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)
  setTimeout(() => {
    wrapper.remove()
  }, 10000);
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

// ============================================
// ========== SCROLL TO TOP ==========
// ============================================
let scroll_to_top = document.getElementById("scroll-to-top");

window.onscroll = function () {
  if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
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


// ===============================
// ========== SUBSCRIBE ==========
// ===============================
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
    const wind = data.current.wind_kph
    const temp_c = data.current.temp_c
    const temp_f = data.current.temp_f
    $('.visitor-weather').html('<img src="' + icon + '" width="30px" class="mb-1"/> ' + temp_c + '<sup>o</sup>C')
  });

$('.slider-container .slide-right').on('click', function () {
  $('.slider-content').animate({
    scrollLeft: "+=300px"
  }, "slow");
})

$('.slider-container .slide-left').on('click', function () {
  $('.slider-content').animate({
    scrollLeft: "-=300px"
  }, "slow");
})

var today_date = new Date()
var current_time = `${today_date.getHours().toString().padStart(2, '0')}:${today_date.getMinutes().toString().padStart(2, '0')}`
var tommorrow_date = new Date()
tommorrow_date.setDate(today_date.getDate() + 1)
today_date = today_date.toISOString().slice(0, 10)
tommorrow_date = tommorrow_date.toISOString().slice(0, 10)

if ($('.site-booking input[name="date"]').val() == "") {
  $('.site-booking input[name="date"]').val(today_date)
}
$('.site-booking input[name="date"]').attr('min', today_date)
if ($('.site-booking input[name="time"]').val() == "") {
  $('.site-booking input[name="time"]').val(current_time)
}
if ($('.site-booking input[name="check_in"]').val() == "") {
  $('.site-booking input[name="check_in"]').val(today_date)
}
$('.site-booking input[name="check_in"]').attr('min', today_date)
if ($('.site-booking input[name="check_out"]').val() == "") {
  $('.site-booking input[name="check_out"]').val(tommorrow_date)
}
$('.site-booking input[name="check_out"]').attr('min', tommorrow_date)

$('.site-booking input[name="check_in"]').on('change', function () {
  var check_out = new Date($('input[name="check_out"]').val())
  var check_in = new Date(this.value)
  var min_check_out = check_in.setDate(check_in.getDate() + 1)
  var format_min_check_out = new Date(min_check_out).toISOString().slice(0, 10)

  if (check_in >= check_out) {
    $('.site-booking input[name="check_out"]').val(format_min_check_out)
  }
  $('.site-booking input[name="check_out"]').attr('min', format_min_check_out)
})

function about_quote_img() {
  $('.about-quotes .team-img-container').css({
    "maxHeight": $('.about-quotes .team-img-container').width()
  });
}
$(window).on('load resize', function () {
  about_quote_img();
});