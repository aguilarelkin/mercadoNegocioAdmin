import { authorization, authorizationCreate, credentialsLogin, paramsLogin } from "./authorization";
let url = process.env.REACT_APP_API;
const API_SERVER_LOGIN = url ;

//const API_SERVER = "http://localhost:8080/api/v1";

export const loginData = async (username, password) => {
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
}