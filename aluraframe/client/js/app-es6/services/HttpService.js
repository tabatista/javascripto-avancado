export class HttpService {

    _handleErrors(res) {
        if (!res.ok)
            throw new Error(res.statusText);

        return res;
    }

    get(url) {

        //variavel fetchapi do escopo global
        return fetch(url)
            .then(res => this._handleErrors(res))
            .then(res => res.json()); //o response eh bruto por si so, por isso deve-se converte-lo
    }

    post(url, dado) {

        //o segundo parametro eh uma configuracao com propriedades
        return fetch(url, {
            headers: { 'Content-type': 'application/json' },
            method: 'post',
            body: JSON.stringify(dado)
        })
            // usando JSON.stringifly para converter objeto em uma string no formato JSON.
            // HTTP é um protocolo textual, não podemos enviar um objeto JavaScript diretamente
            .then(res => this._handleErrors(res));
    }
}