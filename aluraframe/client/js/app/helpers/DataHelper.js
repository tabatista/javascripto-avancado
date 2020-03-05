class DataHelper {

    constructor() {
        throw new Error('DataHelper nao pode ser instanciada');
    }

    static dataParaTexto(data) {

        //template string
        return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
    }

    static textoParaData(texto) {

        //valida formatacao do texto com expressao regular
        //d de digito e {} pro tamanho - 4 digitos / 2 digitos / 2 digitos
        //valida a formatacao yyyy-mm-dd
        //O ˆ indica "comecando com " e o $ "terminando com".
        if (!(/^\d{4}-\d{2}-\d{2}$/.test(texto)))
            throw new Error('A data deve estar no formato aaaa-mm-dd')

        //converte a string em data
        //let data = new Date(this._inputData.value.split('-'));
        //internamente ele usa o join com virgula para transformar a data em 'yyyy,mm,dd'
        //outra maneira de criar o Date
        //replace(/-/g, ',')
        //o '2016-11-12' vira '2016,11,12'

        //spread operator ... onde cada item do array eh transformado num parametro
        return new Date(...texto
            .split('-')
            //map para iterar os itens do array
            //o map recebe uma function: map(function(item){}) e pode receber o item e o indice do array como parametro
            //arrow function - quando so existe uma instrucao, pode-se omitir o bloco {}, o return e o ;
            .map((item, indice) =>
                item - indice % 2 //numero par fica menos 0 com modulo % de dois //segundo item                    
            )
        );
    }
    /*DICA

    Quando a arrow function possui apenas um parâmetro, podemos remover os parênteses. Vejamos como fica o código anterior:

    let aprovados = avaliacoes
        .filter(prova => prova.nota >= 7)
        .map(prova => prova.aluno.nome);
     * 
     */

}