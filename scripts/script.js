const d = (e)=> document.querySelector(e)
const dAll = (e)=> document.querySelectorAll(e)

// relacionando dados
pizzaJson.map((item, index)=>{
    const pizzaItem = d('.models .pizza-item').cloneNode(true)

    pizzaItem.querySelector('.pizza-item-img img').src = item.img
    pizzaItem.querySelector('.pizza-item-price').innerHTML = `R$ ${item.price.toFixed(2)}`
    pizzaItem.querySelector('.pizza-item-name').innerHTML = item.name
    pizzaItem.querySelector('.pizza-item-desc').innerHTML = item.description

    // adicionando estrutura na tela
    d('.pizza-area').append(pizzaItem)
})