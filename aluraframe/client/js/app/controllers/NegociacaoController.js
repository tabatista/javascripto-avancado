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

        this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($('#negociacoesView')), 'adicionar', 'esvaziar', 'ordenar', 'inverterOrdem');

        this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'texto');

        this._ordemAtual = '';

        ConnectionFactory
            .getConnection()
            .then(connection => {
                new NegociacaoDAO(connection)
                    .listarTodos()
                    .then(negociacoes => {
                        negociacoes.forEach(negociacao => {
                            this._listaNegociacoes.adicionar(negociacao);
                        });
                    });
            }).catch(error => this._mensagem.texto = error);
    }

    adicionar(event) {
        event.preventDefault();

        let negociacao = this._criarNegociacao();

        ConnectionFactory
            .getConnection()
            .then(connection => {
                new NegociacaoDAO(connection)
                    .adicionar(negociacao)
                    .then(() => {
                        this._listaNegociacoes.adicionar(negociacao);
                        this._mensagem.texto = 'Negociação adicionada com sucesso!';
                        this._limpaFormulario();
                    });
            }).catch(error => this._mensagem.texto = error);
    }

    importarNegociacoes() {
        let service = new NegociacaoService();
        let negociacoesPromise = service.obterNegociacoes();

        negociacoesPromise
            .then(negociacoes => 
                negociacoes.filter(negociacao =>
                     this._listaNegociacoes.negociacoes.indexOf(negociacao) == -1)) //verifica se existe
            .then(negociacoes => {

                negociacoes.forEach(negociacao => {
                    this._listaNegociacoes.adicionar(negociacao);
                });
            })
            .catch(error => this._mensagem.texto = erro);
    }

    apagar() {

        ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDAO(connection))
            .then(dao => dao.apagarTodos())
            .then(mensagem => {
                this._mensagem.texto = mensagem;
                this._listaNegociacoes.esvaziar();
            })
            .catch(error => this._mensagem.texto = error);
    }

    _criarNegociacao() {
        return new Negociacao(
            DataHelper.textoParaData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        );
    }

    _limpaFormulario() {
        this._formulario.reset();
        this._inputData.focus();
    }

    ordenar(coluna) {
        if (this._ordemAtual == coluna) {
            this._listaNegociacoes.inverterOrdem();
        } else {
            this._listaNegociacoes.ordenar((a, b) => a[coluna] - b[coluna]);
        }

        this._ordemAtual = coluna;
    }
}