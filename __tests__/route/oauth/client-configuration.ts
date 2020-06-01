import request from "supertest";
import app from "../../../src/app/app";

const URL = "/oauth2/client-configuration";

describe(`Test Route: ~${URL}`, ()=>{
    const client_id = "sample-app";
    const response_text = "{\"client_id\":\"sample-app\",\"redirect_uri\":\"http://127.0.0.1:300/login.html\",\"client_secret\":null}";
    test(`It shoud response GET ${client_id} configuration`, done=>{
        request(app)
            .get(`${URL}?client_id=${client_id}`)
            .then(response=>{
                expect(response.text).toBe(response_text);
                done();
            });
    });
});