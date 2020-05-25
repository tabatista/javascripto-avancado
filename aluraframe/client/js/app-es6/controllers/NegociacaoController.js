import { ListaNegociacoes } from '../models/ListaNegociacoes';
import { Mensagem } from '../models/Mensagem';
import { NegociacoesView } from '../views/NegociacoesView';
import { MensagemView } from '../views/MensagemView';
import { NegociacaoService } from '../services/NegociacaoService';
import { DataHelper } from '../helpers/DataHelper';
import { Bind } from '../helpers/Bind';
import { Negociacao } from '../models/Negociacao';

class NegociacaoController {

    //melhora a perfomance para nao buscar varias vezes no dom os inputs
    constructor() {
        //imitando o jquery
        let $ = document.querySelector.bind(document);
        //transforma o $ em um metodo (antes era uma funcao-function)
        //manter a associcao com o document com o bind

        this._inputQuantidade = $('#quantidade');
        this._inputData = $('#data');
        this._inputValor = $('#valor');

        this._formulario = $('.form');
        this._service = new NegociacaoService();

        /*
        //o escopo do this de uma arrow function eh lexico
        //nao eh dinamico como o escopo de uma funcao que muda de acordo com o contexto
        //isso significa que o "this" para o update/armadilha dentro da lista sera o controller
        this._listaNegociacoes = new ListaNegociacoes(model => this._negociacoesView.update(model));
        */

        this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($('#negociacoesView')), 'adicionar', 'esvaziar', 'ordenar', 'inverterOrdem');

        this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'texto');

        this._ordemAtual = '';

        this._init();
    }

    _init() {

        this._service
            .listar()
            .then(negociacoes => {
                negociacoes.forEach(negociacao => {
                    this._listaNegociacoes.adicionar(negociacao);
                });
            }).catch(error => this._mensagem.texto = error);

        //executa uma funcao de tempos em tempos - segundo parametros eh em milisegundos
        setInterval(() => {
            this.importarNegociacoes()
        }, 5000);
    }

    adicionar(event) {
        event.preventDefault();
        let negociacao;
        try {
            negociacao = this._criarNegociacao();
        } catch (e) {
            this._mensagem.texto = e;
            throw new Error(e);
        }

        this._service.
            cadastrar(negociacao)
            .then(mensagem => {
                this._listaNegociacoes.adicionar(negociacao);
                this._mensagem.texto = mensagem;
                this._limpaFormulario();
            })
            .catch(error => this._mensagem.texto = error);
    }

    importarNegociacoes() {
        this._service
            .importar(this._listaNegociacoes.negociacoes)
            .then(negociacoes => {
                negociacoes.forEach(negociacao => {
                    this._listaNegociacoes.adicionar(negociacao);
                });
                this._mensagem.texto = 'Negociacoes do periodo importadas';
            })
            .catch(error => this._mensagem.texto = error);
    }

    apagar() {

        this._service
            .apagar()
            .then(msg => {
                this._mensagem.texto = msg;
                this._listaNegociacoes.esvaziar();
            })
            .catch(error => this._mensagem.texto = error);

    }

    _criarNegociacao() {
        return new Negociacao(
            DataHelper.textoParaData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        );
    }

    _limpaFormulario() {
        this._formulario.reset();
        this._inputData.focus();
    }

    ordenar(coluna) {
        if (this._ordemAtual == coluna) {
            this._listaNegociacoes.inverterOrdem();
        } else {
            this._listaNegociacoes.ordenar((a, b) => a[coluna] - b[coluna]);
        }

        this._ordemAtual = coluna;
    }
}