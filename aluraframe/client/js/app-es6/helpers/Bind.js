import { ProxyFactory } from '../services/ProxyFactory';

//data binding (associação de dados) entre o model e view
export class Bind {

    //rest operator com os 3 pontinhos para receber varios parametros ao inves de um array explicto na chamada do Bind
    //deve ser sempre o ultimo parametro
    constructor(model, view, ...props) {
        let proxy = ProxyFactory.create(model, props,
            model => view.update(model)
        );

        view.update(model);

        //em js um construtor pode retornar qualquer coisa, nao apenas a propria instancia
        return proxy;
    }


}