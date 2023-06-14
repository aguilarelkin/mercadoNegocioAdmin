import { authorization, authorizationCreate, authorizationCreateCliente, credentialsLogin, paramsLogin } from "./authorization";
let url = process.env.REACT_APP_API;
const API_SERVER = url + "/api/v1/mercado";
const API_SERVER_MERCADO = url + "/api/v1/factura";
const API_SERVER_CLIENT = url + "/api/v1/cliente";

//const API_SERVER = "http://localhost:8080/api/v1/mercado";
//const API_SERVER_MERCADO = "http://localhost:8080/api/v1/factura";
//const API_SERVER_CLIENT = "http://localhost:8080/api/v1/cliente";

export const findAllProductMercado = async () => {

    try {
        let response = await fetch(API_SERVER + "/products", {
            method: "GET",
            // headers: authorization()
        })

        return response;
    } catch (error) {

    }

}
export const findAllProductMercadoPage = async (page) => {

    try {
        let response = await fetch(API_SERVER + "/products/page/" + page, {
            method: "GET",
            //headers: authorization()
        })

        return response;
    } catch (error) {

    }

}

export const createItemCart = async (id, cantidad, user) => {

    try {
        let response = await fetch(API_SERVER_MERCADO + "/create/" + id + "/" + cantidad, {
            method: "POST",
            body: user,
            headers: authorizationCreate()
        });

        return response;
    } catch (error) {

    }
}

export const findFactuCart = async (id) => {
    try {
        let response = await fetch(API_SERVER_MERCADO + "/shopcart/" + id, {
            method: "GET",
            headers: authorization()
        });
        return response;


    } catch (error) {

    }
}
export const findFactuClient = async (id) => {
    try {
        let response = await fetch(API_SERVER_MERCADO + "/getFactura/" + id, {
            method: "GET",
            headers: authorization()
        })
        return response;
    } catch (error) {

    }
}
export const deleteFactuCart = async (id) => {
    try {
        let response = await fetch(API_SERVER_MERCADO + "/delete/" + id, {
            method: "DELETE",
            headers: authorization()
        })
        return response;
    } catch (error) {

    }
}
export const createCliente = async (client) => {
    try {
        let response = await fetch(API_SERVER_CLIENT + "/post", {
            method: "POST",
            body: client,
            headers: authorizationCreateCliente()
        })
        return response;

    } catch (error) {

    }
}