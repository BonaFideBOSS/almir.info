const default_theme = "dark"
const secondary_theme = "light"
const default_theme_icon = `<i class="fa-duotone fa-moon text-white"></i>`
const secondary_theme_icon = `<i class="fa-duotone fa-sun-bright text-warning"></i>`

function get_theme() {
  const theme = localStorage.getItem('theme')
  return theme ? theme : default_theme
}

function set_theme(theme) {
  localStorage.setItem('theme', theme)
}

function apply_theme(theme = null) {
  theme = theme ? theme : get_theme()
  const theme_icon = (theme == default_theme) ? default_theme_icon : secondary_theme_icon
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