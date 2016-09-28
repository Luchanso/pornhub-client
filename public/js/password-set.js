const {ipcRenderer} = window.nodeRequire('electron')

$('#save-btn').on('click', savePassword)

function savePassword() {
  const password = $('#password').val()
  const rePassword = $('#re-password').val()

  if (password !== rePassword) {
    showError('Password mismatch')
  } else if (password.length < 3) {
    showError('Password length must be more than two symbols')
  } else {
    const hash = createHash(password)
    window.localStorage['password'] = hash
    window.location = './password-page.html'
    ipcRenderer.send('password', hash)
  }
}

function showError(text) {
  $('.alert-err').removeClass('hide')
  $('.alert-err').text(text)
}
