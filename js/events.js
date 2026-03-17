/* global d3, IntersectionObserver, sessionStorage, gsap */

/* Este ficheiro está dedicado às funções dos eventos javascript de galeria, seta de voltar ao topo e popup */


// Funções para o popup na secção de Oportunidades

// Expande o popup para tornar-se visível
function openNav () {
  const USER_CHECK = sessionStorage.getItem('check')
  if (USER_CHECK !== '1') {
    document.getElementById('sidepopup').style.width = '250px'
  }
}
// Reduz o tamanho do popup de forma a esconder-lo
function closeNav () {
  document.getElementById('sidepopup').style.width = '0'
}

// Depois de um utilizador fechar o popup por si próprio, o popup nunca volta a aparecer até uma nova página ser aberta
function userDismiss () {
  sessionStorage.setItem('check', '1')
}

// Lógica para permitar um popup aparecer depois do utilizador passar 3 segundos na secção de Oportunidades da página
function popupStart () {
  let timeout
  const TIME_INTERVAL = 3000


  const observer = new IntersectionObserver((entries) => { //##!! Necessário simplificar
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        timeout = setTimeout(() => {
          openNav()
        }, TIME_INTERVAL)
      } else {
        clearTimeout(timeout)
        closeNav()
      }
    })
  }, { threshold: THRESHOLD }
  )

  const TARGET = document.querySelector('#oportunidades')
  if (TARGET) {
    observer.observe(TARGET)
  }
}

window.addEventListener('scroll', () => {
  const btn = document.getElementById('backToTop')
  btn.style.display = window.scrollY > 800 ? 'block' : 'none'
})

let atual = 0
const total = 3
let autoplay = setInterval(() => mudar(1), 5000)

function irPara (index) {
  document.querySelectorAll('.bolinha')[atual].classList.remove('active')

  atual = (index + total) % total

  document.querySelector('.slides').style.transform = `translateX(-${atual * 100}%)`

  document.querySelectorAll('.bolinha')[atual].classList.add('active')

  clearInterval(autoplay)
  autoplay = setInterval(() => mudar(1), 5000)
}

function mudar (direcao) {
  irPara(atual + direcao)
}

// Carrega a lógica de popup e do gráfica de barras depois do arranque do site
window.addEventListener('DOMContentLoaded', () => {
  popupStart()
}
)
