class NegociacaoService {

    obterNegociacoesDaSemana() {

        //resolve eh uma funcao que tem o retorno de sucesso
        //reject eh o erro
        return new Promise((resolve, reject) => {
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

                        resolve(listaNegociacao);

                    } else {
                        console.log(`Status: ${xhr.status}. ${response}`);
                        reject('Nao foi possivel obter as negociacoes da semana');
                    }
                }

            };

            //envia a requisicao
            xhr.send();

        });
    }

    obterNegociacoesDaSemanaRetrasada() {

        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();

            xhr.open('GET', 'negociacoes/retrasada');

            xhr.onreadystatechange = () => {

                if (xhr.readyState == 4) {

                    if (xhr.status == 200) {

                        resolve(JSON.parse(xhr.responseText)
                            .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));

                    } else {
                        console.log(xhr.responseText);
                        reject('Nao foi possivel obter as negociacoes da semana retrasada');
                    }
                }
            };

            xhr.send();
        });
    }

    obterNegociacoesDaSemanaAnterior() {

        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();

            xhr.open('GET', 'negociacoes/anterior');

            xhr.onreadystatechange = () => {

                if (xhr.readyState == 4) {

                    if (xhr.status == 200) {

                        resolve(JSON.parse(xhr.responseText)
                            .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));

                    } else {
                        console.log(xhr.responseText);
                        reject('Nao foi possivel obter as negociacoes da semana anterior');
                    }
                }
            };

            xhr.send();
        });
    }

}