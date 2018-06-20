var WINDOW_WIDTH = 1025
var WINDOW_HEIGHT = 768
var REDIUS = 8
var MARGIN_TOP = 60
var MARGIN_LEFT = 30
var currentTime = new Date()
var balls = []
var colors = ['#ffd600', '#e46763', '#f6976b', '#ae72b0', '#8f95c9', '#d7c2a3', '#99c0a1']
window.onload = function () {
  WINDOW_HEIGHT = document.body.clientHeight
  WINDOW_WIDTH = this.document.body.clientWidth
  
  MARGIN_LEFT = Math.round(WINDOW_WIDTH / 10)
  MARGIN_TOP = Math.round(WINDOW_HEIGHT / 5)

  REDIUS = Math.round(WINDOW_WIDTH * (4 / 5) /108) - 1

  var canvas = document.getElementById('canvas')
  var context = canvas.getContext('2d')
  
  canvas.width = WINDOW_WIDTH
  canvas.height = WINDOW_HEIGHT
  setInterval(function () {
    render(context)
    update ()
  }, 50)
}

function update() {
  var nextTime = new Date()
  
  var nextHours = nextTime.getHours()
  var nextMinutes = nextTime.getMinutes()
  var nextSecondes = nextTime.getSeconds()

  var currentHours = currentTime.getHours()
  var currentMinutes = currentTime.getMinutes()
  var currentSecondes = currentTime.getSeconds()

  if(nextTime !== currentTime) {
    currentTime = nextTime
    if (parseInt(nextHours / 10) !== parseInt(currentHours / 10)) {
      addBall(MARGIN_LEFT, MARGIN_TOP, parseInt(nextHours / 10))
    }
    if (parseInt(nextHours % 10) !== parseInt(currentHours % 10)) {
      addBall(MARGIN_LEFT + 15 * (REDIUS + 1), MARGIN_TOP, parseInt(nextHours % 10))
    }
    if (parseInt(nextMinutes / 10) !== parseInt(currentMinutes / 10)) {
      addBall(MARGIN_LEFT + 39 * (REDIUS + 1), MARGIN_TOP, parseInt(nextMinutes / 10))
    }
    if (parseInt(nextMinutes % 10) !== parseInt(currentMinutes % 10)) {
      addBall(MARGIN_LEFT + 54 * (REDIUS + 1), MARGIN_TOP, parseInt(nextMinutes % 10))
    }
    if (parseInt(nextSecondes / 10) !== parseInt(currentSecondes / 10)) {
      addBall(MARGIN_LEFT + 78 * (REDIUS + 1), MARGIN_TOP, parseInt(nextSecondes / 10))
    }
    if (parseInt(nextSecondes % 10) !== parseInt(currentSecondes % 10)) {
      addBall(MARGIN_LEFT + 93 * (REDIUS + 1), MARGIN_TOP, parseInt(nextSecondes % 10))
    }
  }
  updateBalls()
}

function updateBalls() {
  var cnt = 0
  for(var i = 0 ; i < balls.length ; i++) {
    if( balls[i].x + REDIUS > 0 && balls[i].x - REDIUS < WINDOW_WIDTH) {
      balls[i].x += balls[i].vx
      balls[i].y += balls[i].vy
      balls[i].vy += balls[i].g
      if(balls[i].y >= WINDOW_HEIGHT - REDIUS) {
        balls[i].y = WINDOW_HEIGHT - REDIUS
        balls[i].vy = -balls[i].vy * 0.75
      }
      balls[cnt++]=balls[i]
    }
  }
  balls.splice(cnt, balls.length - cnt)
}

function addBall(x, y, num) {
  var numArray = digit[num]
  for (var i = 0; i < numArray.length; i++ ) {
    for(var j = 0; j < numArray[i].length; j++) {
      if(numArray[i][j] === 1) {
        var ball = {
          x: x + 2 * j * (REDIUS + 1)  +(REDIUS + 1),
          y: y + 2 * i * (REDIUS + 1) + (REDIUS + 1),
          vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
          vy: -5,
          g: 1.5 + Math.random(),
          color: colors[Math.floor(Math.random() * colors.length)]
        }
        balls.push(ball)
      }
    }
  }
}

function render(cxt) {
  cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT)
  var hours = currentTime.getHours()
  var minutes = currentTime.getMinutes()
  var secondes = currentTime.getSeconds()
  renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours/10), cxt)
  renderDigit(MARGIN_LEFT + 15 * (REDIUS+1), MARGIN_TOP, parseInt(hours%10), cxt)
  renderDigit(MARGIN_LEFT + 30 * (REDIUS+1), MARGIN_TOP, 10, cxt)
  renderDigit(MARGIN_LEFT + 39 * (REDIUS+1), MARGIN_TOP, parseInt(minutes/10), cxt)
  renderDigit(MARGIN_LEFT + 54 * (REDIUS+1), MARGIN_TOP, parseInt(minutes%10), cxt)
  renderDigit(MARGIN_LEFT + 69 * (REDIUS+1), MARGIN_TOP, 10, cxt)
  renderDigit(MARGIN_LEFT + 78 * (REDIUS+1), MARGIN_TOP, parseInt(secondes/10), cxt)
  renderDigit(MARGIN_LEFT + 93 * (REDIUS+1), MARGIN_TOP, parseInt(secondes%10), cxt)

  for(var i = 0; i< balls.length; i++) {
    cxt.beginPath()
    cxt.arc(balls[i].x, balls[i].y, REDIUS, 0, 2*Math.PI)
    cxt.closePath()
    cxt.fillStyle = balls[i].color
    cxt.fill()
  }
}

function renderDigit(x, y, num , cxt) {
  cxt.fillStyle = 'pink'
  var numArray = digit[num]
  for (var i = 0; i < numArray.length; i++ ) {
    for(var j = 0; j < numArray[i].length; j++) {
      if(numArray[i][j] === 1) {
        cxt.beginPath()
        cxt.arc(x + j * 2 * (REDIUS+1) + (REDIUS+1) , y + i * 2 * (REDIUS+1) + (REDIUS+1) , REDIUS , 0, 2*Math.PI)
        cxt.closePath()

        cxt.fill()
      }
    }
  }
}