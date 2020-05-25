import { View } from './View';

export class MensagemView extends View {

    //nao precisa, apenas para o uso de super da classe pai
    constructor(elemento) {
        super(elemento);
    }

    template(model) {
        //if ternario para verificar se o texto esta vazio/nulo
        return model.texto ? `<p class="alert alert-info">${model.texto}</p>` : `<p></p>`;
    }

}