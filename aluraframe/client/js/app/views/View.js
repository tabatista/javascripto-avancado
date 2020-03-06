//suposta classe abstrata
class View {

    constructor(elemento) {
        this._elemento = elemento;
    }

    template(){
        throw new Error('O metodo template deve ser implementado');
    }

    //coloca o template no DOM como elemento, apos converter a string
    update(model) {
        this._elemento.innerHTML = this.template(model);
    }
}