const d = (e)=> document.querySelector(e);

//relacionando dados
salgadoJson.map((item, index)=>{
    const salgadoItem = d('.models .salgado-item').cloneNode(true);
    //adicionando estruturas na tela
    d('.salgado-area').append(salgadoItem);

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
        const key = e.target.closest('.salgado-item').getAttribute('data-key');

        //adicionando inf window
        d('.salgadoBig img').src = salgadoJson[key].img;
        d('.salgadoInfo h1').innerHTML = salgadoJson[key].name;
        d('.salgadoInfo-actualPrice').innerHTML = `R$ ${salgadoJson[key].price.toFixed(2)}`;
        d('.salgadoInfo-size').innerHTML = salgadoJson[key].sizes;
    })
})