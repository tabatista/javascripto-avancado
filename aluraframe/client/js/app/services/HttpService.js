class HttpService {

    get(url) {

        //resolve eh o retorno de sucesso
        //reject eh o erro
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();

            // xhr.open('GET', 'http://localhost:3000/negociacoes/semana')
            //preparado para abrir o endereco
            xhr.open('GET', url) //localmente o endereco nao precisa estar inteiro

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
                        resolve(JSON.parse(response));

                    } else {
                        console.log(`Status: ${xhr.status}. ${response}`);
                        reject(response);
                    }
                }

            };

            //envia a requisicao
            xhr.send();

        });
    }

    post(url, dado) {

        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onreadystatechange = () => {

                if (xhr.readyState == 4) {

                    if (xhr.status == 200) {

                        resolve(JSON.parse(xhr.responseText));
                    } else {

                        reject(xhr.responseText);
                    }
                }
            };
            // usando JSON.stringifly para converter objeto em uma string no formato JSON.
            xhr.send(JSON.stringify(dado));
        });

    }
}