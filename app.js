'use strict'

const inputChamado = document.getElementById('input-chamado')
const inputUsuario = document.getElementById('input-usuario')
const selectPrioridade = document.getElementById('select-prioridade')
const selectStatus = document.getElementById('select-status')

const botaoFiltrar = document.getElementById('btn-filtrar')
const botaoLimpar = document.getElementById('btn-limpar')

function criarCardChamado(chamado) {
    const card = document.createElement('div')
    card.className = 'card'

    card.onclick = () => alert(`Chamado #${chamado.id}\nTítulo: ${chamado.titulo}\nUsuário: ${chamado.usuario}\nPrioridade: ${chamado.prioridade}\nStatus: ${chamado.status}`)

    const id = document.createElement('span')
    id.className = 'card-id'
    id.textContent = `#${chamado.id}`

    const titulo = document.createElement('h3')
    titulo.textContent = chamado.titulo

    const usuario = document.createElement('p')
    usuario.className = 'card-usuario'
    usuario.textContent = `Usuário: ${chamado.usuario}`

    const prioridade = document.createElement('span')
    prioridade.className = 'card-prioridade'
    prioridade.textContent = `Prioridade: ${chamado.prioridade}`

    const status = document.createElement('span')
    status.className = 'card-status'
    status.textContent = `Status: ${chamado.status}`

    card.append(id, titulo, usuario, prioridade, status)

    return card
}

function normalizarFiltro(texto) {
    if (!texto) return ''
    texto = texto.toLowerCase()
    texto = texto.replaceAll(/á/g, 'a')
    texto = texto.replaceAll(/ã/g, 'a')
    texto = texto.replaceAll(/â/g, 'a')
    texto = texto.replaceAll(/à/g, 'a')
    texto = texto.replaceAll(/é/g, 'e')
    texto = texto.replaceAll(/ê/g, 'e')
    texto = texto.replaceAll(/í/g, 'i')
    texto = texto.replaceAll(/ó/g, 'o')
    texto = texto.replaceAll(/ô/g, 'o')
    texto = texto.replaceAll(/õ/g, 'o')
    texto = texto.replaceAll(/ú/g, 'u')
    texto = texto.replaceAll(/ç/g, 'c')
    texto = texto.replaceAll(/[^a-z0-9]/g, '')
    return texto
}

function carregarChamados(chamadosParaExibir) {
    const cards = chamadosParaExibir.map(criarCardChamado)
    const container = document.getElementById('chamados-container')
    container.replaceChildren(...cards)
}

function filtrarChamados() {
    const chamadoFiltro = normalizarFiltro(inputChamado.value)
    const usuarioFiltro = normalizarFiltro(inputUsuario.value)
    const prioridadeFiltro = selectPrioridade.value
    const statusFiltro = selectStatus.value

    const chamadosFiltrados = chamados.filter(chamado => {
        const tituloChamado = normalizarFiltro(chamado.titulo)
        const usuarioChamado = normalizarFiltro(chamado.usuario)

        const bateuChamado = chamadoFiltro === '' || tituloChamado.includes(chamadoFiltro)
        const bateuUsuario = usuarioFiltro === '' || usuarioChamado.includes(usuarioFiltro)
        const bateuPrioridade = prioridadeFiltro === '' || chamado.prioridade === prioridadeFiltro
        const bateuStatus = statusFiltro === '' || chamado.status === statusFiltro

        return bateuChamado && bateuUsuario && bateuPrioridade && bateuStatus
    })

    carregarChamados(chamadosFiltrados)
}

botaoFiltrar.onclick = () => filtrarChamados()

botaoLimpar.onclick = () => {
    inputChamado.value = ''
    inputUsuario.value = ''
    selectPrioridade.value = ''
    selectStatus.value = ''
    carregarChamados(chamados)
}

// Filtro em tempo real ao digitar ou alterar selects
inputChamado.onkeyup = () => filtrarChamados()
inputUsuario.onkeyup = () => filtrarChamados()
selectPrioridade.onchange = () => filtrarChamados()
selectStatus.onchange = () => filtrarChamados()

carregarChamados(chamados)