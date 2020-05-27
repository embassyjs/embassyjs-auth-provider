import express, { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import ClientRepository from "../client/Repository";
import { HttpResponseError } from "../HttpResponseError";

const router = express.Router();

interface RequestParameter extends ParamsDictionary {
    client_id: string;
}

interface GetConfigurationResult {
    client_id?: string,
    redirect_uri?: string,
    client_secret?: string,
    error?: string,
    message?: string
}

function getConfiguration(req: Request<RequestParameter>, res: Response<GetConfigurationResult>): void {
    const id  = req.query.client_id as string;
    const repository = new ClientRepository();
    repository.selectClient(id)
        .then(client => {
            const result: GetConfigurationResult = {
                client_id: id,
                redirect_uri: client.redirect,
                client_secret: client.secret
            };
            res.send(result);
        })
        .catch((error: HttpResponseError) => {
            if (error.httpCode) {
                res.status(error.httpCode);
            } else {
                res.status(500);
            }
            res.send({
                error: error.name,
                message: error.message
            });
        });
}

router.get("/client-configuration", getConfiguration);

export default router;