/* Animação para secção de investigação usando GSAP. Permite tocar nas caixas de texto de forma a mostrar alguns dados sobre a área estudada e
tocar neste caixa de dados para voltar para a caixa de texto */

function textSwap (element) {
  /*
  Permite substituição entre 2 caixas de texto com conteúdo diferentes quando o utilizar clica nelas

  * @param {HTMLElement} element - Contém a referência ao element html que se está a manipular, de forma a fazer referência às secções no css que serão mudadas
    de forma a criar o efeito animado

  */
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
