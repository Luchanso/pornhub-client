$('#enter-btn').on('click', enter)

function enter() {
  const rowPass = $('#password').val()
  const currentPass = localStorage['password']
  const enteredPassword = createHash(rowPass)

  if (currentPass === enteredPassword) {
    window.location = './index.html'
  } else {
    $('.alert-err').removeClass('hide')
  }
}
