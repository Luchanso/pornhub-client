$('#save-btn').on('click', savePassword)

function savePassword() {
  const password = $('#password').val()
  const rePassword = $('#re-password').val()
  const fs = require('fs')

  if (password !== rePassword) {
    showError('Password mismatch')
  } else if (password.length < 3) {
    showError('Password length must be more than two symbols')
  } else {
    DataManager.password = password
    window.location = './password-page.html'
  }
}

function showError(text) {
  $('.alert-err').removeClass('hide')
  $('.alert-err').text(text)
}
