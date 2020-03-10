class Bind {


    constructor(model, view, props){
        let proxy = ProxyFactory.create(model, props, 
        model => view.update(model)
        );

        view.update(model);

        //em js um construtor pode retornar qualquer coisa, nao apenas a propria instancia
        return proxy;
    }

    
}