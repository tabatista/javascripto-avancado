class NegociacaoDAO {

    constructor(connection) {
        this._connection = connection;
        this._store = 'negociacoes';
    };

    adicionar(negociacao) {
        return new Promise((resolve, reject) => {
            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .add(negociacao);

            request.onsuccess = e => {
                resolve();
            };

            request.onerror = e => {
                console.log(e.target.error);
                reject('Nao foi possivel adicionar a negociacao');
            };
        });
    }

    listarTodos() {
        return new Promise((resolve, reject) => {

            let cursor = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .openCursor();

            let negociacoes = [];
            cursor.onsuccess = e => {
                let atual = e.target.result;

                if (atual) {
                    let dado = atual.value;
                    negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor));
                    atual.continue();
                } else {
                    resolve(negociacoes);
                }

            };

            cursor.onerror = e => {
                console.log(e.target.error);
                reject('Nao foi possivel listar as negociacoes');
            };
        });
    }
}