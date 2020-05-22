class Mensagem {

    constructor(texto = '') { //valor padrao do parametro para construtores/metodos
        this._texto = texto;
    }

    get texto() {
        return this._texto;
    }

    set texto(texto) { //modifica com texto = ''
        this._texto = texto;
    }
}