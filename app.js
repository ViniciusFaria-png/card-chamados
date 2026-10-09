'use strict'

const botaoFrontend = document.getElementById('btn-frontend')
const botaoBackend = document.getElementById('btn-backend')
const botaoUXUI = document.getElementById('btn-uxui')

const inputCargo = document.getElementById('input-cargo')
const inputNome = document.getElementById('input-nome')

const botaoFiltrar = document.getElementById('btn-filtrar')
const botaoLimpar = document.getElementById('btn-limpar')

function criarCardFuncionario(funcionario) {
    const card = document.createElement('div')
    card.className = 'card'

    card.onclick = () => alert (`Nome: ${funcionario.nome}\nCargo: ${funcionario.cargo}`)

    const nome = document.createElement('h3')
    nome.textContent = funcionario.nome

    const cargo = document.createElement('span')
    cargo.textContent = funcionario.cargo

    const imagem = document.createElement('img')
    imagem.src = funcionario.imagem

    // card.appendChild(nome)
    // card.appendChild(cargo)
    // card.appendChild(imagem)

    card.append(nome, imagem, cargo)

    return card
}

function normalizarFiltro(texto) {
    texto = texto.toLowerCase()
    texto = texto.replaceAll(/á/g, 'a')
    texto = texto.replaceAll(/ã/g, 'a')
    texto = texto.replaceAll(/é/g, 'e')
    texto = texto.replaceAll(/ê/g, 'e')
    texto = texto.replaceAll(/í/g, 'i')
    texto = texto.replaceAll(/ó/g, 'o')
    texto = texto.replaceAll(/ô/g, 'o')
    texto = texto.replaceAll(/ú/g, 'u')
    texto = texto.replaceAll(/ç/g, 'c')
    texto = texto.replaceAll(/[^a-z0-9]/g, '')
    return texto
}

function carregarFuncionarios(funcionarios) {
    const cards = funcionarios.map(criarCardFuncionario)
    const container = document.getElementById('funcionarios-container')
    container.replaceChildren(...cards)
}

function carregarFuncionariosFiltrado(cargo) {

    const cargoNormalizado = normalizarFiltro(cargo)

    const funcionariosFiltrados = bdFuncionarios.filter(funcionario => normalizarFiltro(funcionario.cargo) === cargoNormalizado || normalizarFiltro(funcionario.nome) === cargoNormalizado)
    carregarFuncionarios(funcionariosFiltrados)
}

botaoFrontend.onclick = () => carregarFuncionariosFiltrado('Desenvolvedor Frontend')
botaoBackend.onclick = () => carregarFuncionariosFiltrado('Desenvolvedor Backend')
botaoUXUI.onclick = () => carregarFuncionariosFiltrado('Designer UX/UI')

botaoFiltrar.onclick = () => carregarFuncionariosFiltrado(inputCargo.value || inputNome.value)

botaoLimpar.onclick = () => {
    inputCargo.value = ''
    inputNome.value = ''
    carregarFuncionarios(bdFuncionarios)
}

carregarFuncionarios(bdFuncionarios)