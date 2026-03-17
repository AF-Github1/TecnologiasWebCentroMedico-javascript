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
