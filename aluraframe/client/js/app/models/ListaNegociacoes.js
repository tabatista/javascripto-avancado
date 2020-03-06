class ListaNegociacoes {

    constructor(contexto, armadilha) {
        this._negociacoes = [];
        this._armadilha = armadilha;
        this._contexto = contexto;
    }

    adicionar(negociacao) {
        this._negociacoes.push(negociacao);
        //para usarmos o contexto do controller para invocar o update do view
        //como se fosse assim contexto._armadilha(this);
        //o terceiro parametro diz respeito aos parametros (por um array) 
        //que a funcao da armadilha vai receber
        //nesse caso a propria classe lista de negociacoes
        Reflect.apply(this._armadilha, this._contexto, [this]);
    }
    
    get negociacoes() {
        //programacao defensiva, devolve uma nova lista com a copia da lista - concat
        // assim a original nao eh alterada
        return [].concat(this._negociacoes);
    }
    
    esvaziar() {
        this._negociacoes = [];
        Reflect.apply(this._armadilha, this._contexto, [this]);
    }

}