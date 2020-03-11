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
        let service = new NegociacaoService();

        //resolve a ordem de execucao apos todas promessas cumpridas (em um array)
        // e o erro de todas eh tratado num lugar so
        Promise.all([service.obterNegociacoesDaSemana(),
            service.obterNegociacoesDaSemanaAnterior(),
            service.obterNegociacoesDaSemanaRetrasada()]
        ).then(negociacoes => {
            //as negociacoes acima eh um array com 3 arrays dentro
            //achatamos todos os itens dos arrays em um array so, que eh o arrayAchatado
            //assim podemos percorrer esse array com o foreach para adicionar na lista de negociacoes
            negociacoes.reduce((arrayAchatado, array) => arrayAchatado.concat(array), [])
            .forEach(negociacao => {
                this._listaNegociacoes.adicionar(negociacao);
            });
        })
            .catch(erro => this._mensagem.texto = erro);
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