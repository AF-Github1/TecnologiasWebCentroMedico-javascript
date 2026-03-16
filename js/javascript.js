/* global d3, IntersectionObserver, sessionStorage, gsap */

function animationBarChart () {
  const DATA = [ // Dados para serem usados em gráfico de barras (ano = eixo x, numero = eixo y)
    { ano: '2016', numero: 32 },
    { ano: '2017', numero: 50 },
    { ano: '2018', numero: 70 },
    { ano: '2019', numero: 74 },
    { ano: '2020', numero: 87 },
    { ano: '2021', numero: 93 },
    { ano: '2022', numero: 100 }
  ]

  // Caracteristicas do gráfico
  const WIDTH = 800
  const HEIGHT = 250
  const MARGIN = { top: 20, bottom: 50, left: 90, right: 30 }
  const BACKGROUND_COLOR = '#f2f6fc'
  const BAR_COLOR = 'steelblue'

  const svg = d3.select('#grafico .grid-box')
    .append('svg')
    .attr('viewBox', `0 0 ${WIDTH} ${HEIGHT}`)
    .attr('preserveAspectRatio', 'xMidYMid meet')
    .style('width', '100%')
    .style('height', 'auto')

  const x = d3.scaleBand() // Eixo x
    .domain(d3.range(DATA.length))
    .range([MARGIN.left, WIDTH - MARGIN.right])
    .padding(0.2)

  const y = d3.scaleLinear() // Eixo y
    .domain([0, 100])
    .range([HEIGHT - MARGIN.bottom, MARGIN.top])

  const bars = svg.append('g') // Objecto gráfico
    .selectAll('rect')
    .data(DATA.sort((a, b) => d3.ascending(a.ano, b.ano)))
    .join('rect')
    .attr('x', (d, i) => x(i))
    .attr('width', x.bandwidth())
    .attr('y', y(0))
    .attr('height', 0)
    .attr('fill', BACKGROUND_COLOR)

  svg.append('text') // Legenda eixo y
    .attr('text-anchor', 'middle')
    .attr('transform', `translate(${MARGIN.left / 6}, ${HEIGHT / 2}) rotate(-90)`)
    .style('font-family', 'Poppins, sans-serif')
    .style('font-size', '20px')
    .style('fill', '#020000')
    .text('Projetos Completos')

  const xAxis = (g) => {
    g.attr('transform', `translate(0,${HEIGHT - MARGIN.bottom})`)
      .call(d3.axisBottom(x).tickFormat(i => DATA[i].ano))
      .attr('font-size', '20px')
  }

  const yAxis = (g) => {
    g.attr('transform', `translate(${MARGIN.left}, 0)`)
      .call(d3.axisLeft(y))
      .attr('font-size', '20px')
  }

  svg.append('g').call(xAxis)
  svg.append('g').call(yAxis)

  /* Lógica de trigger (Observer) + transição (transition())
  O utilizador quando chega dentro de uma determinada secção da página ativa (threshold)
  a animação do gráfico de barras a encher */

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        bars.transition()
          .duration(1500)
          .attr('y', d => y(d.numero))
          .attr('height', d => y(0) - y(d.numero))
          .attr('fill', BAR_COLOR)

        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.6 })

  observer.observe(document.querySelector('#grafico'))
}

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

  const observer = new IntersectionObserver((entries) => { //##!! Necessário simplificar
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        timeout = setTimeout(() => {
          openNav()
        }, 3000)
      } else {
        clearTimeout(timeout)
        closeNav()
      }
    })
  }, { threshold: 0.6 }
  )

  const TARGET = document.querySelector('#oportunidades')
  if (TARGET) {
    observer.observe(TARGET)
  }
}

/* Animação para secção de investigação usando GSAP. Permite tocar nas caixas de texto de forma a mostrar alguns dados sobre a área estudada e
tocar neste caixa de dados para voltar para a caixa de texto */

function textSwap (element) {
  const conteudo = element.querySelector('.conteudo-box')
  const stats = element.querySelector('.stat-box')
  const titulo = element.querySelector('.text-title')

  // Troca o texto principal para as estatisticas
  if (conteudo.style.display !== 'none') { //##!! Necessário subdividir
    const textToStat = gsap.timeline()
    textToStat.to(conteudo, { duration: 0.3, opacity: 0, y: -20, display: 'none', ease: 'power2.in' })
      .to(titulo, { duration: 0.3, color: '#1a73e8', scale: 1.05 }, '-=0.2')
      .fromTo(stats, { opacity: 0, y: 20, display: 'none' }, { opacity: 1, y: 0, display: 'block', duration: 0.4, ease: 'power2.out' })
  } else {
  // Troca as estatisticas de volta para o texto
    const StatToText = gsap.timeline()
    StatToText.to(stats, { duration: 0.3, opacity: 0, y: 20, display: 'none', ease: 'power2.in' })
      .to(titulo, { duration: 0.3, color: '#0f9d58', scale: 1 }, '-=0.2')
      .fromTo(conteudo, { opacity: 0, y: -20, display: 'none' }, { opacity: 1, y: 0, display: 'block', duration: 0.4, ease: 'power2.out' }
      )
  }
}

// Funções responsáveis pela validação de inputs no formulários

const validateEmail = (email) => {
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
  return emailRegex.test(email)
}

function hasNumbers (t) {
  var regex = /\d/g
  return regex.test(t)
}

function checkForm () {
  const name = document.getElementById('name').value
  const email = document.getElementById('email').value
  const subject = document.getElementById('subject').value
  const message = document.getElementById('message').value

  if (validateEmail(email) && !hasNumbers(name) && subject !== '' && message !== '') {
    alert(name + ', o seu formulário foi enviado com sucesso')
  } else {
    alert('Formulário não enviado, confirme as informações submetidas! \nTodos os campos são obrigatórios')
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
  animationBarChart()
}
)
