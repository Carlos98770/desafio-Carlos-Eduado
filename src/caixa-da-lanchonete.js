class CaixaDaLanchonete {
    //Separando em objetos os dados do vetor itens
    clearData(itens){
        let lista_pedidos = []
        itens.forEach(element => 
            {
            
            let qtd = null
            qtd = element[element.length - 1]
            let codigo = element.slice(0,-2)
            
            let pedido = {
                'codigo': codigo,
                'quantidade': qtd
            }
            lista_pedidos.push(pedido)
        });
        return lista_pedidos
    }
    //verificando se o item está disponivel
    validade_item(chaves,lista_de_pedidos){
        let flag = false
        for(let i = 0; i < lista_de_pedidos.length; i++){
            for(let j = 0; j < chaves.length; j++){
                if(lista_de_pedidos[i].codigo == chaves[j]){
                    flag = true;
                }
            }
            if(flag == false){
                return flag
            }
        }
        return flag
    }
    //verificando a quantidade dos elementos
    validade_quantidade(vetor_pedidos){
        let flag = true
        vetor_pedidos.forEach(element => {
            if(element.quantidade == 0){
                flag = false
            }
        
        });
        return flag
    }
    //verificando se o carrinho está vazio
    validade_pedido(vetor_pedidos){
        if(vetor_pedidos.length == 0){
            return false
        }
        return true
    }
    //verificando o pagamento
    validade_pagamento(metodoDePagamento){
        if( metodoDePagamento != 'dinheiro' && metodoDePagamento != 'debito'
        && metodoDePagamento != 'credito'){
            return false
        }
        return true
    }
    //Para pagamento em dinhero
    pagamento_dinheiro(cadarpio, lista_de_pedidos){
        let total = 0
        lista_de_pedidos.forEach(element => {
            total += cadarpio[element.codigo] * element.quantidade
        });
        return (total-(total * 0.05)).toFixed(2)
    }
    //Para pagamento em credito
    pagamento_credito(cadarpio, lista_de_pedidos){
        let total = 0
        lista_de_pedidos.forEach(element => {
            total += cadarpio[element.codigo] * element.quantidade
        });
        return (total+(total * 0.03)).toFixed(2)
    }
    //Para pagamento em debito
    pagamento_debito(cadarpio, lista_de_pedidos){
        let total = 0
        lista_de_pedidos.forEach(element => {
            total += cadarpio[element.codigo] * element.quantidade
        });
        return total.toFixed(2)
    }
    //Verificando a condiçao do item extra
    acompanhamento(lista_de_pedidos){
        let tem_cafe = false
        let tem_chantily = false
        let cont = 0
        lista_de_pedidos.forEach(extra => {
            if( extra.codigo == 'chantily'){
                tem_chantily = true
                cont++
                lista_de_pedidos.forEach(element => {
                    if(element.codigo == 'cafe'){
                        tem_cafe = true
                        cont++
                    }
                });
            }
        });

        let tem_queijo = false
        let tem_sanduiche = false
        lista_de_pedidos.forEach(extra => {
            if( extra.codigo == 'queijo'){
                tem_queijo = true
                cont++
                lista_de_pedidos.forEach(element => {
                    if(element.codigo == 'sanduiche'){
                        tem_sanduiche = true
                        cont++
                    }
                });
            }
        });
        let condicao = (tem_cafe && tem_chantily) || (tem_queijo && tem_sanduiche)
        if(cont == 0){
            return true
        }else{
            return condicao
        }
    }
    
    calcularValorDaCompra(metodoDePagamento, itens) {
        let cadarpio = {
        'cafe':3.00,
        'chantily': 1.50,
        'suco':6.20,
        'sanduiche':6.50,
        'queijo':2.00,
        'salgado':7.25,
        'combo1':9.50,
        'combo2':7.50
        }
        let pagamento = metodoDePagamento
        let chaves = Object.keys(cadarpio)
        let lista_pedidos = this.clearData(itens)
        
        
        if(this.validade_pedido(lista_pedidos) == false){
            return "Não há itens no carrinho de compra!"
        }
        if(this.validade_pagamento(pagamento) == false){
            return "Forma de pagamento inválida!"
        }
        if(this.validade_item(chaves,lista_pedidos) == false){
            return "Item inválido!"
        }
        if(this.validade_quantidade(lista_pedidos) == false){
            return "Quantidade inválida!"
        }
        if(this.acompanhamento(lista_pedidos) == false){
            return "Item extra não pode ser pedido sem o principal"
        }
        if( pagamento == 'dinheiro'){
            let valor = this.pagamento_dinheiro(cadarpio,lista_pedidos).toString();
            valor = valor.replace('.', ',')

            return "R$ "+ valor
        }
        if( pagamento == 'credito'){
            let valor = this.pagamento_credito(cadarpio,lista_pedidos).toString();
            valor = valor.replace('.', ',')

            return "R$ "+ valor
        }
        if( pagamento == 'debito'){
            let valor = this.pagamento_debito(cadarpio,lista_pedidos).toString();
            valor = valor.replace('.', ',')

            return "R$ "+ valor
          }
    }
}
export { CaixaDaLanchonete };


