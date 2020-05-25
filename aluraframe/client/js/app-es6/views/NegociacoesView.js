import { View } from './View';
import { DataHelper } from '../helpers/DataHelper';
import { currentInstance } from '../controllers/NegociacaoController';

export class NegociacoesView extends View {

    constructor(elemento) {
        super(elemento);
        
        //event bubbling
        elemento.addEventListener('click', function(event){
            //event.target = o cara que disparou o evento, se for uma th...
            if(event.target.nodeName == 'TH'){
                //recuperando o texto dentro da th para ordenar
                currentInstance().ordenar(event.target.textContent.toLowerCase());
            }
        });
    }

    template(model) {

        return `
    <table class="table table-hover table-bordered">
        <thead>
            <tr>
                <th>DATA</th>
                <th>QUANTIDADE</th>
                <th>VALOR</th>
                <th>VOLUME</th>
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
     * Forma de percorrer o total acima com uma funcao autoretornavel

          (function(){
             let total = 0;
             model.negociacoes.forEach(n => total+= n.volume);
             return total;
          )()
     * 
     */


}
