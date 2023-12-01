
const cnvs = document.querySelector('#bolita')
const ctx = cnvs.getContext('2d')

const ball = {
  raio: 50,
  vetorX: -1,
  vetorY: 0,
  x: 250,
  y: 50,
  helding: false,
  gravidade: 1
}

let { raio, vetorX, vetorY, x, y, helding, gravidade } = ball

let inicialX;
let finalx;

cnvs.addEventListener('mousedown', (e) => {
  cnvs.style.cssText += 'cursor: grabbing'
  const cat1 = x - e.offsetX
  const cat2 = y - e.offsetY
  const hyp = Math.sqrt((cat1**2) + (cat2**2))
  if (hyp < raio) helding = true
  inicialX = e.offsetX
})
cnvs.addEventListener('mousemove', (e) => {
  if (helding === true) {
    x = e.offsetX
    y = e.offsetY
  }
})
cnvs.addEventListener('mouseup', (e) => {
  cnvs.style.cssText += 'cursor: grab'
  finalx = e.offsetX
  const direcao = Math.sign(finalx - inicialX)
  if (direcao === 1 && helding) vetorX = 4, vetorY = 1
  if (direcao === -1 && helding) vetorX = -4, vetorY = 1
  if (direcao === 0 && helding) vetorX = 0
  helding = false
})

function bola() {
  ctx.clearRect(0,0,cnvs.width,cnvs.height)
  ctx.fillStyle = 'black  '
  ctx.beginPath()
  ctx.arc(x, y, raio, 0, Math.PI * 2)
  ctx.closePath()
  ctx.fill()
}

function move() {
  if (!helding) {
    vetorY += gravidade
    y += vetorY
    x += vetorX
  }
  if (y <= 0 + 50) {
    y = 0 + raio
    vetorY *= -1
  }

  if (y > cnvs.height - raio) {
    y = cnvs.height - raio
    vetorY *= -1
    vetorY += y / 300
  }
  if (x > cnvs.width - raio || x < 0 + raio) {
    if (x > cnvs.width - raio) vetorX *= -1, x = cnvs.width - raio, vetorX += 0.5
    if (x < 0 + raio) vetorX *= -1, x = 0 + raio, vetorX -= 0.5
  }
}

function loopB() {
  window.requestAnimationFrame(loopB)
  bola()
  // console.log(`vetorY = ${vetorY} ------ y = ${y}`)
  // console.log(x)
  move()
}

console.log(window.innerHeight)

window.onload = () => {
  loopB()
}