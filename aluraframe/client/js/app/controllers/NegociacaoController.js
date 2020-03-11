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

        //a promise da a sensacao que eh um metodo sincrono quando na vdd eh assincrono
        //sendo o resultado futuro de uma operacao
        service.obterNegociacoesDaSemana() //chamamos o metodo sem passar o callback
        .then(negociacoes => { //se a promessa estiver cumprida, entao...
            negociacoes.forEach(negociacao => this._listaNegociacoes.adicionar(negociacao));
            this._mensagem.texto = 'Negociacao da semana obtida com sucesso';
        })
        .catch(erro =>  this._mensagem.texto = erro);
        //catch para o parametro de erro

        service.obterNegociacoesDaSemanaAnterior() 
        .then(negociacoes => { 
            negociacoes.forEach(negociacao => this._listaNegociacoes.adicionar(negociacao));
            this._mensagem.texto = 'Negociacao da semana anterior obtida com sucesso';
        })
        .catch(erro =>  this._mensagem.texto = erro);
        
        service.obterNegociacoesDaSemanaRetrasada() 
        .then(negociacoes => { 
            negociacoes.forEach(negociacao => this._listaNegociacoes.adicionar(negociacao));
            this._mensagem.texto = 'Negociacao da semana retrasada obtida com sucesso';
        })
        .catch(erro =>  this._mensagem.texto = erro);
       
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