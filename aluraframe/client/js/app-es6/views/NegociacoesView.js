import {View} from './View';

export class NegociacoesView extends View {

    constructor(elemento) {
        super(elemento);
    }

    template(model) {

        return `
    <table class="table table-hover table-bordered">
        <thead>
            <tr>
                <th onclick="negociacaoController.ordenar('data')">DATA</th>
                <th onclick="negociacaoController.ordenar('quantidade')">QUANTIDADE</th>
                <th onclick="negociacaoController.ordenar('valor')">VALOR</th>
                <th onclick="negociacaoController.ordenar('volume')">VOLUME</th>
            </tr>
        </thead>

                <tbody>
                ${model.negociacoes.map(n =>
            `
                    <tr>
                        <td>${DataHelper.dataParaTexto(n.data)}</td>
                        <td>${n.quantidade}</td>
                        <td>${n.valor}</td>
                        <td>${n.volume}</td>
                    </tr>
                  `
        ).join('')}
            </tbody>
            <tfoot>
                    <td colspan="3"><td>
                    <td>${
            model.volumeTotal
            }</td>
            </tfoot>
         </table>
        `;
    }

    /*
     * Forma de percorrer o totlal acima com uma funcao autoretornavel

          (function(){
             let total = 0;
             model.negociacoes.forEach(n => total+= n.volume);
             return total;
          )()
     * 
     */


}
