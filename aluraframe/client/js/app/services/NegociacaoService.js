class NegociacaoService {

    obterNegociacoesDaSemana(callback) {
        let xhr = new XMLHttpRequest();

        // xhr.open('GET', 'http://localhost:3000/negociacoes/semana')
        //preparado para abrir o endereco
        xhr.open('GET', 'negociacoes/semana') //localmente nao precisa estar inteiro

        /*configuracoes de envio*/
        xhr.onreadystatechange = () => { //quando o estado do xhr alterar a funcao eh acionada

            /*
            estados possiveis de uma requisicao ajax:
                0: requisicao ainda nao iniciada
                1: conexão com o servidor estabelecida
                2: requisição recebida
                3: processando requisicao
                4: requisicao estah concluida e a resposta estah pronta
            */

            //se o estado for igual a 4, recupero os dados do response
            if (xhr.readyState == 4) {
                //texto do que o servidor retornou - nesse caso o json
                let response = xhr.responseText;

                //um estado concluido nao significa o status eh 200 de sucesso etc
                if (xhr.status == 200) {
                    console.log('Obtendo as negociacoes dos servidor');

                    //transforma o texto em array
                    let lista = JSON.parse(response);

                    //varrer cada objeto do array e criar um novo array de Negociacao
                    //lembrando que arrow function nao precisa de return para retornar um item so e sem {}
                    let listaNegociacao = lista.map(objeto =>
                        //nao precisa ser assim pq ja ta no padrao do Date:
                        // DataHelper.textoParaData((objeto.data).substring(0, 10)
                        new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)
                    );

                    callback(null, listaNegociacao);

                } else {
                    console.log(`Status: ${xhr.status}. ${response}`);
                    callback('Nao foi possivel obter as negociacoes da semana', null);
                }
            }

        };

        //envia a requisicao
        xhr.send();
    }

}