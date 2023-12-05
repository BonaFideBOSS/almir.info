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


// ====================================
// ========== GET CART ITEMS ==========
// ====================================
$(window).on('load', async function () {
  var cart_items_count = 0
  var url = $('.cart-items-count:eq(0)').data('url')
  if (url) {
    await $.get(url, function (data) {
      cart_items_count = data.length
    })
    $('.cart-items-count').html(cart_items_count)
  }
})

$("#cart").on('shown.bs.offcanvas', function () {
  update_cart()
})

function delete_cart_item(cart_id) {
  $.get(`/account/delete-cart-item?cart_id=${cart_id}`, function (response) {
    if (response.action) {
      bstoast("gwsc-toast", response.msg, 3000)
      update_cart()
    }
  })
}

function update_cart() {
  var cart_body = $('#cart .cart-body')
  var cart_count = $('#cart .cart-count')
  var cart_total = $('#cart .cart-total')
  var cart_footer = $('#cart .cart-footer')
  $(cart_footer).hide()
  var loader = '<div class="d-flex h-100"><div class="spinner-border m-auto" role="status"><span class="visually-hidden">Loading...</span></div></div>'
  $(cart_body).html(loader)

  $.get($('#cart').data('url'), function (data) {
    $(cart_count).html(data.length)
    $('.cart-items-count').html(data.length)
    if (data.length > 0) {
      var cart_items = ""
      var total_price = 0
      for (let i = 0; i < data.length; i++) {
        total_price += data[i].total_price
        var summary = ""
        const date_options = { month: "short", day: "numeric", year: "numeric", timeZone: 'UTC' }
        if (data[i].activity == 'swimming') {
          var date = new Date(data[i].date)
          var time = new Date(data[i].time)
          date = date.toLocaleDateString("en-US", date_options)
          time = time.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", timeZone: 'UTC' });
          summary = `${date} - ${time}`
        }
        if (data[i].activity == 'camping') {
          var check_in = new Date(data[i].check_in)
          var check_out = new Date(data[i].check_out)
          check_in = check_in.toLocaleDateString("en-US", date_options)
          check_out = check_out.toLocaleDateString("en-US", date_options)
          summary = `${check_in} - ${check_out}`
        }
        cart_items += `<div class="cart-item row g-3" data-id="${data[i]._id}">
        <div class="col-3">
          <div class="img-container rounded-2">
            <img src="https://almir.info/gwsc-assets/img/database/${data[i].item_img}">
          </div>
        </div>
        <div class="col-9">
          <div class="d-flex gap-3 h-100">
            <div class="d-flex flex-column">
              <h4 class="mb-0">${data[i].item_name}</h4>
              <p class="mb-0 text-muted">${data[i].summary}</p>
              <p class="mb-0 text-muted">${summary}</p>
            </div>
            <div class="ms-auto d-flex flex-column align-items-end gap-3">
            <a onclick="delete_cart_item('${data[i]._id}')" role="button">
            <i class="fa-solid fa-trash-can fa-lg text-danger"></i></a>
            <p class="mt-auto mb-0 text-muted fs-5">$${data[i].total_price.toLocaleString('en-US')}</p>
            </div>
          </div>
        </div>
        <hr class="my-4"></div>`
      }
      $(cart_body).html(cart_items)
      $(cart_total).html(total_price.toLocaleString('en-US'))
      $(cart_footer).show()
    } else {
      $(cart_body).html('<div class="d-flex h-100"><p class="fs-5 m-auto">Your cart is empty.</p></div>')
      $(cart_total).html('0')
    }
  });
}


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
var current_time = `${(today_date.getUTCHours() + 1).toString().padStart(2, '0')}:${today_date.getUTCMinutes().toString().padStart(2, '0')}`
var tommorrow_date = new Date()
tommorrow_date.setDate(today_date.getUTCDate() + 1)
today_date = today_date.toISOString().slice(0, 10)
tommorrow_date = tommorrow_date.toISOString().slice(0, 10)

$('.site-booking input[name="date"]').attr('min', today_date)
if ($('.site-booking input[name="date"]').val() == "") {
  $('.site-booking input[name="date"]').val(today_date)
}

if ($('.site-booking input[name="time"]').val() == "") {
  $('.site-booking input[name="time"]').val(current_time)
}

$('.site-booking input[name="check_in"]').attr('min', today_date)
if ($('.site-booking input[name="check_in"]').val() == "") {
  $('.site-booking input[name="check_in"]').val(today_date)
}

if ($('.site-booking input[name="check_out"]').val() == "") {
  $('.site-booking input[name="check_out"]').attr('min', tommorrow_date)
  $('.site-booking input[name="check_out"]').val(tommorrow_date)
} else if ($('.site-booking input[name="check_out"]').length > 0) {
  var check_in = new Date($('.site-booking input[name="check_in"]').val())
  var check_out = new Date()
  check_out.setDate(check_in.getUTCDate() + 1)
  check_out = check_out.toISOString().slice(0, 10)
  $('.site-booking input[name="check_out"]').attr('min', check_out)
}

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