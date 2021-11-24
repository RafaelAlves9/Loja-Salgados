const d = (e)=> document.querySelector(e)
const dAll = (e)=> document.querySelectorAll(e)

// relacionando dados
pizzaJson.map((item, index)=>{
    const pizzaItem = d('.models .pizza-item').cloneNode(true)
    // adicionando estrutura na tela.
    d('.pizza-area').append(pizzaItem)
})