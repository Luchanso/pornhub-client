const tor = window.nodeRequire('electron').remote.getGlobal('tor')

if (tor.isReady) {
  ready()
}

tor.events.on('ready', () => {
  ready()
})

tor.events.on('progress', (progress) => {
  $('#progress-bar').css('width', `${progress * 100}%`)
})

tor.events.on('message', (msg) => {
  console.log(msg)
})

function ready() {
  $('#progress-bar').css('width', '100%')

  let btnRun = $('#run')
  btnRun.removeClass('disabled')
  btnRun.addClass('waves-effect waves-light')
  btnRun.on('click', rederict)

  let loadingLabel = $('.loading-label')
  loadingLabel.text('Ready to run')
}

function rederict() {
  window.location = 'http://pornhub.com/'
}
