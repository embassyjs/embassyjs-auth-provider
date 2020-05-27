import { PoolConnection } from "mariadb";
import { ClientModel } from "./Mode";
import { createPool } from "../../adapter/mariadb/pool";
import { HttpResponseError } from "../HttpResponseError";

class ClientRepository {

    connectionReserved: PoolConnection;

    constructor() {
        this.connectionReserved = null;

        this.selectClient = this.selectClient.bind(this);
        this.releasePoolConnection = this.releasePoolConnection.bind(this);
    }

    selectClient(id: string): Promise<ClientModel> {
        const query = `SELECT secret, redirect, title, consent FROM clients WHERE id = ${id}`;

        return createPool()
            .then(nextConnection => {
                this.connectionReserved = nextConnection;
                return this.connectionReserved.query(query);
            })
            .then((r: ClientModel[]) => {
                const [client] = r;
                if (client === undefined) {
                    const error: HttpResponseError = {
                        httpCode: 404,
                        name: "clien_not_found",
                        message: "clien not found",
                    };
                    throw (error);
                }
                return this.releasePoolConnection(client);
            })
            .catch(error => {
                this.releasePoolConnection();
                throw (error);
            });
    }

    releasePoolConnection<T>(r?: T): T {
        if (this.connectionReserved !== null) {
            this.connectionReserved.end();
        }

        return r;
    }

}

export default ClientRepository;