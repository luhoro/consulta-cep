// Elementos HTML
const cep = document.querySelector('#cep')
const ddd = document.querySelector('#ddd')
const rua = document.querySelector('#rua')
const bairro = document.querySelector('#bairro')
const cidade = document.querySelector('#cidade')
const estado = document.querySelector('#uf')
const complemento = document.querySelector('#complemento')

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
cep.addEventListener('keyup', (event) =>
  event.key === 'Enter' ? findAdress(cep.value) : null
)

clean.addEventListener('click', () => {
  cep.value = ''
  ddd.value = ''
  rua.value = ''
  bairro.value = ''
  cidade.value = ''
  estado.value = ''
})
