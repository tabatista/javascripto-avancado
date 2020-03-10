class NegociacaoController {

    //melhora a perfomance para nao buscar varias vezes no dom os inputs
    constructor() {
        //imitando o jquery
        let $ = document.querySelector.bind(document);
        //transforma o $ em um metodo (antes era uma funcao-function)
        //manter a associcao com o document com o bind

        this._inputQuantidade = $('#quantidade');
        this._inputData = $('#data');
        this._inputValor = $('#valor');

        this._formulario = $('.form');

        /*
        //o escopo do this de uma arrow function eh lexico
        //nao eh dinamico como o escopo de uma funcao que muda de acordo com o contexto
        //isso significa que o "this" para o update/armadilha dentro da lista sera o controller
        this._listaNegociacoes = new ListaNegociacoes(model => this._negociacoesView.update(model));
        */

        this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($('#negociacoesView')), 'adicionar', 'esvaziar');

        this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'texto');
    }

    adicionar(event) {
        event.preventDefault();
        this._listaNegociacoes.adicionar(this._criarNegociacao());
        this._mensagem.texto = 'Negociação adicionada com sucesso!';
        this._limpaFormulario();

        console.log(this._listaNegociacoes);

    }

    importarNegociacoes() {

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
                //um estado concluido nao significa o status eh 200 de sucesso etc
                if (xhr.status == 200) {
                    console.log('Obtendo as negociacoes dos servidor');
                    //texto do que o servidor retornou - nesse caso o json
                    let response = xhr.responseText;

                    //transforma o texto em array
                    let lista = JSON.parse(response);

                    //varrer cada objeto do array e criar um novo array de Negociacao
                    //lembrando que arrow function nao precisa de return para retornar um item so e sem {}
                    lista.map(objeto =>
                        //nao precisa ser assim pq ja ta no padrao do Date:
                        // DataHelper.textoParaData((objeto.data).substring(0, 10)
                        new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)
                    )
                        .forEach(negociacao => { //adiciona cada negociacao criada na nossa lista
                            this._listaNegociacoes.adicionar(negociacao);
                        });

                    this._mensagem.texto = 'Negociacoes importadas com sucesso'

                } else {
                    console.log(xhr.status);
                    console.log(xhr.responseText);
                    this._mensagem.texto = 'Nao foi possivel obter as negociacoes';
                }
            }

        };

        //envia a requisicao
        xhr.send();






    }

    apagar() {
        this._listaNegociacoes.esvaziar();
        this._mensagem.texto = "Negociações apagada com sucesso!";
    }

    _criarNegociacao() {
        return new Negociacao(
            DataHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }

    _limpaFormulario() {
        this._formulario.reset();
        this._inputData.focus();
    }
}