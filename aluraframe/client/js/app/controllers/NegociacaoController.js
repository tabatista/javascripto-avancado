class NegociacaoController {

    //melhora a perfomance para nao buscar varias vezes no dom os inputs
    constructor() {
        //imitando o jquery
        let $ = document.querySelector.bind(document);
        //transforma o $ em um metodo (antes era uma funcao)
        //manter a associcao com o document com o bind

        this._inputQuantidade = $('#quantidade');
        this._inputData = $('#data');
        this._inputValor = $('#valor');
    }

    adicionar(event) {
        event.preventDefault();

        //converte a string em data
        //let data = new Date(this._inputData.value.split('-'));
        //internamente ele usa o join com virgula para transformar a data em 'yyyy,mm,dd'
        //outra maneira de criar o Date
        //replace(/-/g, ',')
        //o '2016-11-12' vira '2016,11,12'

        //spread operator ... onde cada item do array eh transformado num parametro
        let data = new Date(...this._inputData.value
            .split('-')
            //o map recebe uma function: map(function(item){}) e pode receber o item e o indice do array como parametro
            //arrow function - quando so existe uma instrucao, pode-se omitir o bloco {}, o return e o ;
            .map((item, indice) =>
                item - indice % 2 //numero par fica menos 0 com modulo % de dois //segundo item                    
            )
        );
        //map para iterar os itens do array

        let negociacao = new Negociacao(
            data,
            this._inputQuantidade.value,
            this._inputValor.value
        );

        console.log(negociacao);

        /*DICA

        Quando a arrow function possui apenas um parâmetro, podemos remover os parênteses. Vejamos como fica o código anterior:

        let aprovados = avaliacoes
            .filter(prova => prova.nota >= 7)
            .map(prova => prova.aluno.nome);
         * 
         */

    }
}