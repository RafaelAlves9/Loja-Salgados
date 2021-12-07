//valores gerais
const d = (e)=> document.querySelector(e)
const dAll = (e)=> document.querySelectorAll(e)
let quant = 1
let modalKey = 0
let itemCart = 0
function closeW() { d('.salgadoWindowArea').style.display='none' }

//relacionando dados
salgadoJson.map((item, index)=>{
    const salgadoItem = d('.models .salgado-item').cloneNode(true)
    //adicionando estruturas na tela
    d('.salgado-area').append(salgadoItem)

    //adicionando informações
    salgadoItem.setAttribute('data-key', index);
    salgadoItem.querySelector('.salgado-item-img img').src = item.img;
    salgadoItem.querySelector('.salgado-item-price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    salgadoItem.querySelector('.salgado-item-name').innerHTML = item.name;
    salgadoItem.querySelector('.salgado-item-desc').innerHTML = `${item.sizes} unidades`;
    
    //aparecendo janela de escolha
    salgadoItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault();
        d('.salgadoWindowArea').style.display='flex';
        quant = 1;
        const key = e.target.closest('.salgado-item').getAttribute('data-key');
        modalKey = key

        //adicionando inf window
        d('.salgadoBig img').src = salgadoJson[key].img;
        d('.salgadoInfo h1').innerHTML = salgadoJson[key].name;
        d('.salgadoInfo-qt').innerHTML = quant
        d('.salgadoInfo-actualPrice').innerHTML = `R$ ${salgadoJson[key].price.toFixed(2)}`;
        d('.salgadoInfo-size').innerHTML = `${salgadoJson[key].sizes} unidades`;
    })
})

//fechando o Window
dAll('.salgadoInfo-cancelMobileButton, .salgadoInfo-cancelButton').forEach((e)=>{
    e.addEventListener('click', (e)=>{
        closeW()
    })
})

//aumentando/diminuindo quantidade
d('.salgadoInfo-qtmais').addEventListener('click', (e)=>{
    quant++
    d('.salgadoInfo-qt').innerHTML = quant
})
d('.salgadoInfo-qtmenos').addEventListener('click', (e)=>{
    if (quant > 1){
        quant--
        d('.salgadoInfo-qt').innerHTML = quant
    } else { //fechando a janela caso (quant<1)
        closeW()
    }
})

//carrinho de compras
let cart = []

//adicionando ao carrinho
d('.salgadoInfo-addButton').addEventListener('click', (e)=>{
    //checar se ja existe o item no carrinho
   let identifier = salgadoJson[modalKey].id;
   let key = cart.findIndex((item)=> item.identifier == identifier);
   //se ja exitir:apenas aumentar a quantidade
   if(key > -1){
        const msg = confirm('Este item já está no carrinho, deseja adicionar mais quantidade?')
        if(msg == true){
                cart[key].qt += quant}
            else{
                closeW()
            }
   } else {
   //se nao: adicionar item ao carrinho
        cart.push({
            identifier,
            id:salgadoJson[modalKey].id,
            qt:quant})
    }
    //fechando janela
    closeW()
    //abrindo carrinho na tela
    openCart()
})

//abrindo carrinho no mobile
d('.menu-openner').addEventListener('click',()=>{
    if (cart.length > 0){
        d('aside').style.left = '0'
    }
})
//fechando carrinho no mobile
d('.menu-closer').addEventListener('click',()=>{
    d('aside').style.left = '100vw'
})

//abrindo e configurando tela do carrinho
function openCart(){
    //contador do carrinho - mobile
    d('.menu-openner span').innerHTML = cart.length

    if (cart.length > 0){
        d('aside').classList.add('show')
        d('.cart').innerHTML=''//nao repetindo o msm item

        //definindo o valor inicial
        let subtotal = 0
        let desconto = 0
        let total = 0
        let unidades = 0

        for(let i in cart){
            let salgadoItem = salgadoJson.find((item)=> item.id == cart[i].id)//relacionando IDs
            let cartItem = d('.cart-item').cloneNode(true)//pegando arquivo html
            d('.cart').append(cartItem)

            //operações de unidades e subtotal
            unidades += salgadoItem.sizes * cart[i].qt
            subtotal += salgadoItem.price * cart[i].qt
            
            //adicionando informacoes no carrinho
            cartItem.querySelector('img').src = salgadoItem.img
            cartItem.querySelector('.cart-item-nome').innerHTML = salgadoItem.name
            cartItem.querySelector('.cart-item-qt').innerHTML = cart[i].qt
            
            //aumentando a quantidade dentro carrinho
            cartItem.querySelector('.cart-item-qtmais').addEventListener('click',(e)=>{
                cart[i].qt++
                openCart()
            })

            //removendo a quantidade dentro carrinho
            cartItem.querySelector('.cart-item-qtmenos').addEventListener('click',(e)=>{
                if(cart[i].qt > 1){
                    cart[i].qt--
                } else {
                    cart.splice(i, 1)
                }
                openCart()
            })
        }

        //valores carrinho
        desconto = 0.1 * subtotal
        total = subtotal - desconto
        d('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`
        d('.unidades span:last-child').innerHTML = `${unidades} unidades`
        d('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`
        d('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`

        } else {
        d('aside').classList.remove('show')
        d('aside').style.left = '100vw'
    }
}