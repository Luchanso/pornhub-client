$('#enter-btn').on('click', enter)

function enter() {
  const rowPass = $('#password').val()
  const enteredPassword = DataManager.getHash(rowPass)

  if (DataManager.password === enteredPassword) {
    window.location = './index.html'
  } else {
    $('.alert-err').removeClass('hide')
  }
}
