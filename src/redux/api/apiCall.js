import axios from "axios";
import Colors from "../../constants/Colors";
import { getStoredToken } from "../../common/Methods";

var token = '';

export async function makeRequest({ url, method = 'get', header = {}, data = {} }) {
    try {
        let value = await getStoredToken();
        if (value != undefined && value != null) {
            token = value;
        }
    } catch (error) {
        console.log(Colors.CONSOLE_RED + "Error in retriving token : " + Colors.CONSOLE_WHITE + error)
    }

    let headers = {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
        header
    }

    if (method === "get") {
        return axios({ method: 'get', url: url, headers: headers })
            .then((response) => {
                return Promise.resolve(response)
            }).catch((err) => {
                return Promise.reject(err)
            })
    }
    else if (method === "post") {
        return axios.post(url, data, { headers: headers })
            .then((response) => {
                return Promise.resolve(response)
            }).catch((err) => {
                return Promise.reject(err)
            })
    }
    else if (method == "delete") {
        return axios.delete(url, { headers: headers })
            .then((response) => {
                return Promise.resolve(response)
            }).catch((err) => {
                return Promise.reject(err)
            })
    }
    else if (method === "put") {
        return axios.put(url, data, { headers: headers })
            .then((response) => {
                return Promise.resolve(response)
            }).catch((err) => {
                return Promise.reject(err)
            })
    }
}