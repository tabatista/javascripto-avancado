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
        this._listaNegociacoes = new ListaNegociacoes();
        this._formulario = $('.form');
    }

    adicionar(event) {
        event.preventDefault();

        this._listaNegociacoes.adicionar(this._criarNegociacao());
        this._limpaFormulario();

        console.log(this._listaNegociacoes.negociacoes);

    }

    _criarNegociacao(){
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