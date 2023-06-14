import { authorization, authorizationCreate, credentialsLogin, paramLogin, paramsLogin } from "./authorization";
import { enviroments } from "./enviroments";
let url = process.env.REACT_APP_API;
const API_SERVER_LOGIN = url ;
const API_LOGIN = enviroments.token_url;

//const API_SERVER = "http://localhost:8080/api/v1";

/*export const loginData = async (username, password) => {
    try {
        let response = await fetch(API_SERVER_LOGIN+"/oauth/token", {
            method: "POST",
            body: paramsLogin(username, password),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + credentialsLogin()
            }
        })
        return response;
    } catch (error) {

    }
}*/
export const loginToken = async (code) => {

    try {
        let response = await fetch(API_LOGIN, {
            method: "POST",
            body: paramLogin(code),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + credentialsLogin()
            }
        })
       // console.log(paramLogin(response))

        return response;

    } catch (error) {

    }
}