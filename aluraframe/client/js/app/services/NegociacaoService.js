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

    cadastrar(negociacao) {
        //retorna uma promise para ser usado no controller
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDAO(connection)) //retorna o dao para o proximo then
            .then(dao => dao.adicionar(negociacao))
            .then(() => 'Negociacao adicionada com sucesso') //se houve sucesso, retorna implicatamente a mensagem
            .catch(error => {
                console.log(error);
                throw new Error('Nao foi possovel adicionar a negociacao');
            });
    }

    listar() {
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDAO(connection))
            .then(dao => dao.listarTodos())
            .catch(error => {
                console.log(error);
                throw new Error('Nao foi possivel obter as negociacoes');
            });
    }

    apagar() {
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDAO(connection))
            .then(dao => dao.apagarTodos())
            .then(() => 'Negociacoes apagadas com sucesso')
            .catch(error => {
                console.log(error)
                throw new Error('Nao foi possivel apagar as negociacoes');
            });
    }

    importar(listaAtual) {
        /*
        Todo array possui a funcao some(), com ela identificamos se o item buscado faz parte da lista
        varrendo cada um deles de forma semelhante a um forEach()

        A funcao some() vai varrer cada item da lista verificando se os elementos sao iguais ao criterio estabelecido.
        Enquanto o item for diferente, ele seguirag para o proximo. Quando o elemento for equivalente ao criterio b
        letras (array) retornarah true e não seguirah iterando no array ate o fim. 
        Basta encontrar um item que seja correspondente ao criterio para que o retorno de some() seja "verdadeiro".

        No entanto, quando buscamos uma letra que nao existe, por exemplo, a letra e, o retorno serah "falso".
        */

        let negociacoesPromise = this.obterNegociacoes();

        //retorna as negociacoes inexistentes dentro da listaAtual.negociacoes
        return negociacoesPromise
            .then(negociacoes =>
                //verifica se nao existe para retornar e adicionar na lista
                //O metodo filter() cria um novo array com todos os elementos que passaram no teste implementado pela funcao fornecida.
                //se o valor retornado for true, o item será incluido
                negociacoes.filter(negociacao =>
                    !listaAtual
                        //converte o obj em string para comparacao
                        .some(negociacaoExistente => negociacao.isEquals(negociacaoExistente)))
            )
            .catch(error => {
                console.log(error)
                throw new Error('Nao foi possivel importar as negociacoes');
            });

    }

}