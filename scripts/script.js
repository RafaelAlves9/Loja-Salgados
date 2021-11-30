//valores gerais
const d = (e)=> document.querySelector(e)
const dAll = (e)=> document.querySelectorAll(e)
let quant = 1;
let modalKey = 0
let itemCart = 0

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
    salgadoItem.querySelector('.salgado-item-desc').innerHTML = item.desc;
    
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
        d('.salgadoInfo-actualPrice').innerHTML = `R$ ${salgadoJson[key].price.toFixed(2)}`;
        d('.salgadoInfo-size').innerHTML = salgadoJson[key].sizes;
        d('.salgadoInfo-qt').innerHTML = quant
    })
})

//fechando o Window
dAll('.salgadoInfo-cancelMobileButton, .salgadoInfo-cancelButton').forEach((e)=>{
    e.addEventListener('click', (e)=>{
        d('.salgadoWindowArea').style.display='none';
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
    let msg = confirm('Este item já está no carrinho, deseja adicionar mais quantidade?')
       if(msg == true){
        cart[key].qt += quant}
        else{
        d('.salgadoWindowArea').style.display='none';
        }
   } else {
   //se nao: adicionar item ao carrinho
        cart.push({
            identifier,
            id:salgadoJson[modalKey].id,
            qt:quant})
    }
     //contador carrinho - mobile
   itemCart++;
   d('.menu-openner span').innerHTML = itemCart;
    //fechando janela
    d('.salgadoWindowArea').style.display='none';
})