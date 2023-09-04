const default_theme = "dark"
const secondary_theme = "light"

function get_theme() {
  const theme = localStorage.getItem('theme')
  return theme ? theme : default_theme
}

function set_theme(theme) {
  localStorage.setItem('theme', theme)
}

function apply_theme(theme = null) {
  theme = theme ? theme : get_theme()

  const icon_dark = `<i class="fa-duotone fa-moon text-white"></i>`
  const icon_light = `<i class="fa-duotone fa-sun-bright text-warning"></i>`
  const theme_icon = (theme == "dark") ? icon_dark : icon_light

  $("html").attr("data-bs-theme", theme)
  $('#theme').html(theme_icon)
}

apply_theme()

$("#theme").on("click", function () {
  var theme = get_theme()
  theme = (theme == default_theme) ? secondary_theme : default_theme
  set_theme(theme)
  apply_theme(theme)

});