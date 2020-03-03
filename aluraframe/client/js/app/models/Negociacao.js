//ecmascript 6

class Negociacao {

    //define os atributos/propriedades
    constructor(data, quantidade, valor) {
        //regra de negocio
        //R1. Uma negociacao depois de criada nao pode ser alterada
        //com a convencao _ eu digo que esse atributo nao pode ser modificado/acessado
        this._data = new Date(data.getTime());
        this._quantidade = quantidade;
        this._valor = valor;
        Object.freeze(this); //congela o objeto - nao permite altera-la
        //shallow - raso - congela "apenas" o objeto - sem deep freeze
    }

    //comportamento
    get volume() {
        return this._quantidade * this._valor;
    }

    //metodos acessadores
    get data() {
        //programacao defensiva - garante que nao se altere o valor
        //se usado o "setDate" (da classe Date) - estara alterando somente a copia dele
        return new Date(this._data.getTime()); //retorna um numero que representa uma data
    }

    get quantidade() {
        return this._quantidade;
    }

    get valor(){
        return this._valor;
    }
}