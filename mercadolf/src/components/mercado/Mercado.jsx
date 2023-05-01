import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { hasRole, isAutenticated } from "../../auth/auth.authenticated";
import { getUsuario } from "../../auth/auth.token.user";
import { createItemCart, findAllProductMercado, findAllProductMercadoPage } from "../../services/mercadoApi";
import { logout } from "../../session/operation.login";
import Navigation from "../auxiliarcomponent/Navigation";
import Paginator from "./Paginator";
function Mercado() {
    const { page } = useParams();

    const [cantidadProduct, setCantidadProduct] = useState("");
    const [product, setProduct] = useState([]);
    const [mensaje, setMensaje] = useState([]);
    const [sesion, setSesion] = useState(false);
    const [control, setControl] = useState(true);
    const [user, setUser] = useState(0);
    const [nombre, setNombre] = useState('Client');
    const [factura, setFactura] = useState(null);
    const [pagePro, setPagePro] = useState(page);
    const [pageTotal, setPageTotal] = useState([]);
    const [total, setTotal] = useState([]);

    const history = useNavigate();

    useEffect(
        () => {
            setSesion(isAutenticated())
            if (!pagePro) {
                setPagePro(0);
            }
            getProduct();
            userData();

        }, [mensaje, pagePro]

    );


    const userData = () => {

        if (sesion) {
            setUser(getUsuario().id);
            setNombre(getUsuario().nombre);
        }
    }

    const carrito = (factura) => {
        history("/carrito/" + factura)
    }

    const calcularPage = (total, totalEl) => {


        let pag;
        let desde = 0;
        let hasta = 0;

        if (Math.floor(pagePro) + 5 <= total) {
            desde = Math.floor(pagePro) + 1;//= total.slice(pagePro-1*5,pagePro*5)// Math.min(Math.max(1, pagePro -3 ), total - 4);
            hasta = Math.floor(pagePro) + 5;//= Math.max(Math.min(total, pagePro  + 3), 5);      
        } else {
            console.log(Math.floor(pagePro) + (total - (Math.floor(pagePro))))
            desde = Math.floor(pagePro) + 1;
            hasta = Math.floor(pagePro) + (total - (Math.floor(pagePro)));//= Math.max(Math.min(total, pagePro  + 3), 5);
        }

        if (total > 4) {
            pag = new Array(hasta - desde + 1).fill(0).map((valor, indice) => indice + desde);
        } else {
            pag = new Array(total).fill(0).map((valor, indice) => indice + 1);
        }
        setPageTotal(pag);

    }
    const getProduct = async () => {

        try {
            let response = await findAllProductMercadoPage(pagePro);

            let json;
            if (response.status === 200) {
                json = await response.json()
                console.log(json.totalElements)
                console.log(json.totalPages)
                setControl(true)
                setProduct(json.content);
                calcularPage(json.totalPages, json.totalElements);
                console.log()
                //let pag = new Array(json.totalPages).fill(0).map((valor, indice)=>indice+1);

                setTotal(json.totalPages);
                return json;
            }
            if (response.status === 500) {
                json = await response.json()
                setMensaje(json);
                return json;
            }
            if (response.status === 404) {

                json = await response.json()
                Swal.fire('DDBB', 'No existe datos', 'warning')
                setControl(false);
                setProduct([])
                setMensaje(json)
                return;
            }
            if (response.status === 403) {
                Swal.fire('Acceso denegado', 'No tines permisos', 'warning')
                history("/")
            }
            if (response.status === 401) {
                if (sesion) {
                    logout();
                    history("/")
                }
                Swal.fire('Iniciar sesión', '', 'warning')
                history("/")
            }
        } catch (error) {
            console.log(error)

        }

    }
    /*
    const getProduct = async () => {
        try {
            let response = await findAllProductMercado();
            let json;
            if (response.status === 200) {
                json = await response.json()
                setControl(true)
                setProduct(json);
                return json;
            }
            if (response.status === 500) {
                json = await response.json()
                setMensaje(json);
                return json;
            }
            if (response.status === 404) {

                json = await response.json()
                Swal.fire('DDBB', 'No existe datos', 'warning')
                setControl(false);
                setProduct([])
                setMensaje(json)
                return;
            }
            if (response.status === 403) {
                Swal.fire('Acceso denegado', 'No tines permisos', 'warning')
                history("/")
            }
            if (response.status === 401) {
                if (sesion) {
                    logout();
                    history("/")
                }
                Swal.fire('Iniciar sesión', '', 'warning')
                history("/")
            }
        } catch (error) {
            console.log(error)

        }

    }
    */

    const createProduct = async (id, cantidad) => {

        if (sesion) {
            const datosUser = JSON.stringify(

                {
                    "cliente": {
                        "id": user
                    }
                }
            );

            try {
                let response = await createItemCart(id, cantidad, datosUser);

                setCantidadProduct(0);

                let json;
                if (response.status === 200) {
                    json = await response.json()
                    setMensaje(json);
                    //   console.log(json)

                    setFactura(json.cliente.id)
                    Swal.fire('Producto', 'Producto agregado', 'success')
                    history("/mercadolibre")
                    return json;

                }
                if (response.status === 500) {

                    json = await response.json()
                    setMensaje(json);
                    return json;

                }
                if (response.status === 404) {

                    json = await response.json()
                    setMensaje(json);
                    return json;
                }
                if (response.status === 400) {

                    json = await response.json()
                    Swal.fire('Datos requeridos', 'Lo sentimos el producto no esta disponible', 'info')
                    setMensaje(json);
                    return json;
                }
                if (response.status === 403) {
                    Swal.fire('Acceso denegado', 'No tienes permisos', 'warning')
                    history("/")
                }
                if (response.status === 401) {
                    if (sesion) {
                        logout();
                    }
                    history("/")
                }
            } catch (error) {
                const datoError = "campos vacios";
                setMensaje(datoError)
                // console.log(error);
            }
        } else {
            Swal.fire('Login', 'Debes iniciar sesión', 'info')
            history("/")
        }

    }

    return (
        <>
            <Navigation user={sesion ? nombre : ""} sesion={sesion} roles={sesion ? hasRole() : []} onChange={factura} />

            <div class="container mt-12  ml-12 ">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                    {product.map(
                        (prod) => (

                            <div key={prod.id} class="flex justify-center  bg-white border border-gray-200 rounded-lg  dark:bg-gray-800 dark:border-gray-700">
                                <a href="#">
                                    <img class="p-8 rounded-t-lg" src={"http://localhost:9000/api/v1/mercado/uploads/img/" + prod.imagen} alt="product image" />
                                </a>
                                <div class="px-5 pb-5">
                                    <a href="#">
                                        <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{prod.nombre}</h5>
                                    </a>
                                    <div class="flex items-center mt-2.5 mb-5">
                                        <p aria-hidden="true" class="w-16 text-wlack-300" fill="currentColor" >Cantidad: </p>
                                        <span class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">{prod.cantidad}</span>
                                    </div>
                                    <div class="flex items-center justify-between">
                                        <span class="text-3xl font-bold text-gray-900 dark:text-white">{prod.precio}</span>
                                        <button onClick={() => createProduct(prod.id, "1")} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</button>
                                    </div>
                                </div>
                            </div>

                        )
                    )
                    }


                </div>
            </div>


            {/*
            <button onClick={() => { carrito(factura) }} type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">Carrito</button>
*/}


            {
                /*
                            <table>
                            <thead>
                                <tr>
                                    <th> {factura} id</th>
                                    <th> nombre</th>
                                    <th> precio</th>
                                    <th> imagen</th>
                                    <th>cantidad</th>
                                </tr>
                            </thead>
                            <tbody>
                                {product.map(
                                    (prod) => (
            
                                        <tr key={prod.id}>
                                            <th> {prod.id}</th>
                                            <th> {prod.nombre}</th>
                                            <th> {prod.precio}</th>
                                            <th>  <img src={"http://localhost:8080/api/v1/mercado/uploads/img/" + prod.imagen} alt="" /></th>
                                            <th>{prod.cantidad}</th>
                                            <th><button onClick={() => createProduct(prod.id, "1")}>Agregar</button> </th>
                                        </tr>
            
                                    )
                                )
                                }
                            </tbody>
                        </table>
            
                        <button onClick={() => { carrito(factura) }} >Carrito</button>
                */
            }
            <div className="m-12">
                <Paginator pageTotal={pageTotal} pagePro={pagePro} total={total} />
            </div>


        </>

    );
}
export default Mercado;