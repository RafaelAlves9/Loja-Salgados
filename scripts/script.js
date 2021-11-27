const d = (e)=> document.querySelector(e)
const s = (e)=> salgadoItem.querySelector(e)

//relacionando dados
salgadoJson.map((item, index)=>{
    const salgadoItem = d('.models .salgado-item').cloneNode(true)

    //adicionando estruturas na tela
    d('.salgado-area').append(salgadoItem)

    //adicionando informações
    s('.salgado-item-img img').src = item.img
    s('.salgado-item-price').innerHTML = `R$ ${item.price.toFixed(2)}`
    s('.salgado-item-name').innerHTML = item.name
    s('.salgado-item-desc').innerHTML = item.description

    //aparecendo janela de escolha
    s('a').addEventListener('click', (e)=>{
        e.preventDefault()
        d('.salgadoWindowArea').style.display='flex'
    })
})