class ListaNegociacoes {

    constructor(armadilha) {
        this._negociacoes = [];
        this._armadilha = armadilha;
    }

    adicionar(negociacao) {
        this._negociacoes.push(negociacao);
        //para usarmos o contexto do controller para invocar o update do view
        //o terceiro parametro diz respeito aos parametros (por um array) 
        //que a funcao da armadilha vai receber
        //nesse caso a propria classe lista de negociacoes
        this._armadilha(this);

        //dica de como usar algum metodo com o: Reflect.apply(Aviao.prototype.voa, this, [])
    }
    
    get negociacoes() {
        //programacao defensiva, devolve uma nova lista com a copia da lista - concat
        // assim a original nao eh alterada
        return [].concat(this._negociacoes);
    }
    
    esvaziar() {
        this._negociacoes = [];
        this._armadilha(this);
    }

}