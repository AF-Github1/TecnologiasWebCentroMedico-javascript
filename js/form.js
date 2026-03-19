// Funções responsáveis pela validação de inputs no formulários

const validateEmail = (email) => {
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9-]+\.[a-z]{2,}$/
  return emailRegex.test(email)
}

function hasNumbers (t) {
  var regex = /\d/g
  return regex.test(t)
}

const MENSAGENS_PREDEFINIDAS = {
  'Informações sobre oportunidades': 'Olá,\n\nGostaria de obter mais informações sobre as oportunidades disponíveis no Centro Académico Clínico dos Açores.\n\nCom cumprimentos,\n',
  'Candidatura a bolsa de investigação': 'Olá,\n\nVenho por este meio manifestar o meu interesse em candidatar-me a uma bolsa de investigação no âmbito do CACA.\nFico a aguardar mais informações sobre o processo de candidatura.\n\nCom cumprimentos,',
  'Parceria institucional': 'Olá,\n\nRepresento a instituição _______ com interesse em estabelecer uma parceria com o Centro Académico Clínico dos Açores.\nGostaria de agendar uma reunião para discutir as possibilidades de colaboração!\n\nCom cumprimentos,',
  'Pedido de informação geral': 'Olá,\n\nGostaria de obter informações gerais sobre o Centro Académico Clínico dos Açores, nomeadamente sobre as suas áreas de atuação e projetos em curso.\n\nCom cumprimentos,'
}
 
function preencherMensagem () {
  /*
  Preenche a mensagem e o assunto com texto pré-definido consoante a opção selecionada.
  Se o utilizador escolher "Outro assunto...", mostra o campo de texto livre para o assunto.
  A mensagem continua editável após ser preenchida automaticamente.
  */
  const select = document.getElementById('subject')
  const customInput = document.getElementById('subject-custom')
  const messageArea = document.getElementById('message')
  const valor = select.value
 
  if (valor === 'outro') {                // Se o utilizador escolher "Outro Assunto"
    customInput.style.display = 'block'   // Mostra o campo de texto que estava "escondido"
    customInput.value = ''
    messageArea.value = ''
    messageArea.placeholder = 'Mensagem*'
  } 
  else {
    customInput.style.display = 'none'    // esconde o campo de texto mencionado acima
    customInput.value = ''
    if (MENSAGENS_PREDEFINIDAS[valor]) {
      messageArea.value = MENSAGENS_PREDEFINIDAS[valor]
    }
    else {
      messageArea.value = ''
      messageArea.placeholder = 'Mensagem*'
    }
  }
}
 
function checkForm () {
  const name = document.getElementById('name').value
  const email = document.getElementById('email').value
  const selectSubject = document.getElementById('subject').value     // Opções de assunto
  const customSubject = document.getElementById('subject-custom').value   // Assunto customisável
  const message = document.getElementById('message').value
  const phoneNumber = document.getElementById('phone-number').value
  const phoneEmpty = phoneNumber === ''

  // Se o utilizador escolheu "Outro Assunto", usa o campo de texto livre; caso contrário usa o select
  const subject = selectSubject === 'outro' ? customSubject : selectSubject

  // /^\d{6,15}$/ -> verifica se o telefone contém apenas dígitos e se contém entre 6 a 15 caracteres
  const phoneValid = phoneEmpty || /^\d{6,15}$/.test(phoneNumber.replace(/[\s\-().]/g, ''))

  if (validateEmail(email) && !hasNumbers(name) && subject !== '' && message !== '' && (phoneEmpty || phoneValid)) {
    alert(name + ', o seu formulário foi enviado com sucesso')
  } else if (!phoneValid) {
    alert('Número de telefone inválido. Insira apenas dígitos (6 a 15 números).')
  } else {
    alert('Formulário não enviado, confirme as informações submetidas! \nTodos os campos são obrigatórios')
  }
}
