import { NegociacaoController } from './controllers/NegociacaoController';
import {} from './polyfill/fetch';

let negociacaoController = new NegociacaoController();

//bind para nao perder a associacao do this
document.querySelector('.form').onsubmit = negociacaoController.adicionar.bind(negociacaoController);

//seletor de atributo com o type... do botao apagar la no index.html
document.querySelector('[type=button]').onclick = negociacaoController.apagar.bind(negociacaoController);