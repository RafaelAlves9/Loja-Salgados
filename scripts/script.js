const d = (e)=> document.querySelector(e)
const dAll = (e)=> document.querySelectorAll(e)

// relacionando dados
salgadoJson.map((item, index)=>{
    const salgadoItem = d('.models .salgado-item').cloneNode(true)

    // adicionando estruturas na tela
    d('.salgado-area').append(salgadoItem)

    // adicionando informações
    salgadoItem.querySelector('.salgado-item-img img').src = item.img
    salgadoItem.querySelector('.salgado-item-price').innerHTML = `R$ ${item.price.toFixed(2)}`
    salgadoItem.querySelector('.salgado-item-name').innerHTML = item.name
    salgadoItem.querySelector('.salgado-item-desc').innerHTML = item.description

})