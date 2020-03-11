class NegociacaoService {

    constructor() {
        this._http = new HttpService();
    }

    obterNegociacoes() {
        //resolve a ordem de execucao apos todas promessas cumpridas (em um array)
        // e o erro de todas eh tratado num lugar so
        return Promise.all([this.obterNegociacoesDaSemana(),
        this.obterNegociacoesDaSemanaAnterior(),
        this.obterNegociacoesDaSemanaRetrasada()]
        ).then(periodos => {
            //as negociacoes acima eh um array com 3 arrays dentro
            //achatamos todos os itens dos arrays em um array so, que eh o arrayAchatado
            //assim podemos percorrer esse array com o foreach para adicionar na lista de negociacoes
            let negociacoes = periodos.reduce((arrayAchatado, array) => arrayAchatado.concat(array), []);

            return negociacoes;
        })
         .catch(erro => {
             throw new Error(erro)
         });
    }

    obterNegociacoesDaSemana() {

        //varrer cada objeto do array e criar um novo array de Negociacao com o map
        //lembrando que arrow function nao precisa de return para retornar um item so e sem {}
        //para a data em texto nao precisa ser como abaixo pq ja ta no padrao do Date:
        // DataHelper.textoParaData((objeto.data).substring(0, 10)

        return this._http
            .get('negociacoes/semana')
            .then(negociacoes => {
                return negociacoes.map(objeto =>
                    new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
            })
            .catch(erro => 'Nao foi possivel obter as negociacoes da semana');
    }

    obterNegociacoesDaSemanaRetrasada() {

        //retornar com new Promise
        return new Promise((resolve, reject) => {
            this._http
                .get('negociacoes/retrasada')
                .then(negociacoes => {
                    resolve(negociacoes.map(objeto =>
                        new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                })
                .catch(erro => reject('Nao foi possivel obter as negociacoes da semana retrasada'));
        });
    }

    obterNegociacoesDaSemanaAnterior() {

        //outra forma, de retornar sem o new Promise
        return this._http
            .get('negociacoes/anterior')
            .then(negociacoes => {
                return negociacoes.map(objeto =>
                    new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
            })
            .catch(erro => { 
                throw new Error('Nao foi possivel obter as negociacoes da semana anterior')
             });
    }

}