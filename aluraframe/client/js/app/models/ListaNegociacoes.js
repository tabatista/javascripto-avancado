class ListaNegociacoes {

    constructor() {
        this._negociacoes = [];
    }

    adicionar(negociacao) {
        this._negociacoes.push(negociacao);
        //this._negociacoes = [].concat(this._negociacoes, negociacao);
    }
    
    get negociacoes() {
        //programacao defensiva, devolve uma nova lista com a copia da lista - concat
        // assim a original nao eh alterada
        return [].concat(this._negociacoes);
    }
    
    esvaziar() {
        this._negociacoes = [];
    }

}