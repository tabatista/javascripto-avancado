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
}