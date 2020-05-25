const stores = ['negociacoes'];
const version = 2;
const dbName = 'aluraframe';

let connection = null;
let close = null;

export class ConnectionFactory {

    constructor() {
        throw new Error('Nao pode criar instancia de ConnectionFactory');
    }

    static getConnection() {
        return new Promise((resolve, reject) => {

            let openRequest = window.indexedDB.open(dbName, version);

            openRequest.onupgradeneeded = e => ConnectionFactory._createStores(e.target.result);

            openRequest.onsuccess = e => {
                if (!connection) { //nulo, zero, string vazia e undefined eh avaliado falso
                    connection = e.target.result;

                    //salva o metodo na variavel
                    //ja associa ao connection, senao ira fechar o "nada"
                    close = connection.close.bind(connection);

                    //Monkey Patch - sobrescreve a funcao de close connection
                    connection.close = function () {
                        throw new Error('Vc nao pode fechar diretamente a conexao');
                    };
                }

                resolve(connection);
            };

            openRequest.onerror = e => {
                let error = e.target.error;
                console.log(error);
                reject(error.name);
            };

        });
    }

    static _createStores(connection) {
        stores.forEach(store => {
            if (connection.objectStoreNames.contains(store))
                connection.deleteObjectStore(store);

            connection.createObjectStore(store, { autoIncrement: true });
        });
    }

    static closeConnection() {
        if (connection) {
            close();
            //object, context, parametros
            //ao inves de usar o bind acima, podemos usar: Reflect.apply(close, connection, []);
            connection = null;
        }
    }
}