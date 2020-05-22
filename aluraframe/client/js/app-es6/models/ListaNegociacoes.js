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

    get volumeTotal() {
        return this._negociacoes.reduce((total, elemento) => total + elemento.volume, 0.0);
    }

    ordenar(criterio) {
        this._negociacoes.sort(criterio);        
    }

    inverterOrdem() {
        this._negociacoes.reverse();
    }

}