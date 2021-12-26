import { EN_REQUEST_METHOD } from "../enum/EN_REQUEST_METHOD";

export class Api {
    static call(url: string, method: EN_REQUEST_METHOD): any {
        return fetch(new Request(url, { method: method }))
        .then(response => {
            return response;
        })
        .catch(error => {
            throw new Error(error);
        })
    }
}