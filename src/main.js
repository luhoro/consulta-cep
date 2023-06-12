// Elementos HTML
const campoCEP = document.querySelector('#cep')
const ddd = document.querySelector('#ddd')
const rua = document.querySelector('#rua')
const bairro = document.querySelector('#bairro')
const cidade = document.querySelector('#cidade')
const estado = document.querySelector('#uf')

const errorMessage = document.querySelector('.error-message')
const clean = document.querySelector('.clean')

// Conexão com API de CEP
async function findAdress(cep) {
  errorMessage.innerText = ''

  try {
    const findCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    const findCEPjson = await findCEP.json()

    if (findCEPjson.error) {
      throw Error('CEP não existente')
    }

    campoCEP.value = findCEPjson.cep
    ddd.value = findCEPjson.ddd
    rua.value = findCEPjson.logradouro
    bairro.value = findCEPjson.bairro
    cidade.value = findCEPjson.localidade
    estado.value = findCEPjson.uf

    return findCEPjson
  } catch (error) {
    errorMessage.innerText = 'CEP inválido. Tente novamente!'
    console.log(error)
  }
}

// Evento de disparo para a função executar
campoCEP.addEventListener('keypress', (event) => 
  event.key === 'Enter' ? findAdress(campoCEP.value) : null
)
campoCEP.addEventListener('blur', () => findAdress(campoCEP.value))

clean.addEventListener('click', () => {
  cep.value = ''
  ddd.value = ''
  rua.value = ''
  bairro.value = ''
  cidade.value = ''
  estado.value = ''
})
