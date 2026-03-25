

class Formulario {
  /*
   Esta classe representa o formulário de contacto e contém métodos para a validação dos dados inseridos no formulário

   * @param {string} name - Nome do utilizador
   * @param {string} email - Endereço de email a validar
   * @param {string} selectSubject - Assunto selecionado das opções pré definidas
   * @param {string} customSubject - Assunto escrito manualmente por utilizador
   * @param {string} message - Texto da mensagem
   * @param {string} phoneNumber - Número de telefone (opcional)
   */
  constructor(name, email, selectSubject, customSubject, message, phoneNumber) {
    this.name = name
    this.email = email
    this.selectSubject = selectSubject
    this.customSubject = customSubject
    this.message = message
    this.phoneNumber = phoneNumber
  }

  get isPhoneEmpty() {
    /*
    Verifica se o campo de telefone está vazio.
    */
    return this.phoneNumber === ''
  }

  get finalSubject() {
    /*
    Obtem o assunto final, sendo esta a opção pré definida ou texto inserido por um utilizador
    */
    return this.selectSubject === 'outro' ? this.customSubject : this.selectSubject
  }



  validateEmail() {
  /*
  
  Função que verifica se uma determinada string está no formato de xxx@yyy.zzz, em que x poderá assumir qualquer value, y poderá assumir 
  valuees de letras e números, e z poderá assumir apenas valuees de letras, devendo a sequência de z ter 2 ou mais caracteres.
  xxx e yyy deverão ser separados com o simbolo de arroba { @ } | yyy e zzz deverão ser separados por um ponto { . }
  Caso a string do email não esteja num formato válido, a função devolve False

  */
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9-]+\.[a-z]{2,}$/
  return emailRegex.test(this.email)
  }

  hasNumbers() {
  /*
  Verifica através de regex se uma determinada string contém caracteres que não sejam números inteiros, devolvendo False se a string não os conter
  */
  var regex = /\d/g
  return regex.test(this.name)
  }

  isPhoneValid() {
    /*
    Utiliza-se regex para verificar se o telefone contém apenas dígitos e entre 6 a 15 caracteres
    Sendo o numero de telefone opcional, a falta complete de um número de telefone é considerada válida  
    */
    if (this.phoneNumber !== '') {
    const cleanNumber = this.phoneNumber.replace(/[\s\-().]/g, '')
    return /^\d{6,15}$/.test(cleanNumber)
    }

    return true
  }

  isValid() {
    /*
    Verifica se todas as condições para o formulário ser válido estão preenchidas (email válido, nome sem numeros, mensagem ou assunto não vazios, numero de telefone válido)    
    */
    return (
      this.validateEmail() &&
     !this.hasNumbers() &&
      this.finalSubject !== '' && 
      this.message !== '' &&
      this.isPhoneValid()
    )
  }
}

function fillMessage () {
 
 /*
 Preenche a mensagem e o assunto com texto pré-definido consoante a opção selecionada.
 Se o utilizador escolher "Outro assunto...", mostra o campo de texto livre para o assunto.
 A mensagem continua editável após ser preenchida automaticamente.
 */
 const predefinedMessages = {
 'Informações sobre oportunidades': 'Olá,\n\nGostaria de obter mais informações sobre as oportunidades disponíveis no Centro Académico Clínico dos Açores.\n\nCom cumprimentos,\n',
 'Candidatura a bolsa de investigação': 'Olá,\n\nVenho por este meio manifestar o meu interesse em candidatar-me a uma bolsa de investigação no âmbito do CACA.\nFico a aguardar mais informações sobre o processo de candidatura.\n\nCom cumprimentos,',
 'Parceria institucional': 'Olá,\n\nRepresento a instituição _______ com interesse em estabelecer uma parceria com o Centro Académico Clínico dos Açores.\nGostaria de agendar uma reunião para discutir as possibilidades de colaboração!\n\nCom cumprimentos,',
 'Pedido de informação geral': 'Olá,\n\nGostaria de obter informações gerais sobre o Centro Académico Clínico dos Açores, nomeadamente sobre as suas áreas de atuação e projetos em curso.\n\nCom cumprimentos,'
 }

 const select = document.getElementById('subject')
 const customInput = document.getElementById('subject-custom')
 const messageArea = document.getElementById('message')
 const value = select.value

 if (value === 'outro') {                // Se o utilizador escolher "Outro Assunto"
   customInput.style.display = 'block'   // Mostra o campo de texto que estava "escondido"
   customInput.value = ''
   messageArea.value = ''
   messageArea.placeholder = 'Mensagem*'
 } 
 else {
   customInput.style.display = 'none'    // esconde o campo de texto mencionado acima
   customInput.value = ''
   if (predefinedMessages[value]) {
     messageArea.value = predefinedMessages[value]
   }
   else {
     messageArea.value = ''
     messageArea.placeholder = 'Mensagem*'
   }
 }
}



function checkForm () {
  /*

  Esta função informa o utilizador sobre o sucesso ou a falha na submissão do formulário, usando a classe Formulario e os métodos associados para validar a validade da informação
  inserida pelo utilizador.

  */
  const formInformation = new Formulario(document.getElementById('name').value, document.getElementById('email').value,
                                        document.getElementById('subject').value, document.getElementById('subject-custom').value,
                                        document.getElementById('message').value, document.getElementById('phone-number').value)

  if (formInformation.isValid()) {
    alert(`${formInformation.name}, o seu formulário foi enviado com sucesso`)
  } else if (!formInformation.isPhoneValid()) {
    alert('Número de telefone inválido. Insira apenas dígitos (6 a 15 números).')
  } else {
    alert('Formulário não enviado, confirme as informações submetidas! \nTodos os campos são obrigatórios')
  }
}
