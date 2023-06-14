import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { hasRole, isAutenticated } from "../../auth/auth.authenticated";
import { getUsuario } from "../../auth/auth.token.user";
import { createItemCart, deleteFactuCart, findFactuCart, findFactuClient } from "../../services/mercadoApi";
import { logout } from "../../session/operation.login";
import Navigation from "../auxiliarcomponent/Navigation";

function Carrito() {

    const { id } = useParams();

    const [productFactura, setProductFactura] = useState([]);
    const [mensaje, setMensaje] = useState("");
    const [sesion, setSesion] = useState(false);
    const [user, setUser] = useState(0);
    const [idFactu, setIdFactu] = useState(id);
    const [confirmed, setConfirmed] = useState(false);

    const [cantidadProduct, setCantidadProduct] = useState("");

    const history = useNavigate();

    useEffect(
        () => {
            setSesion(isAutenticated());
            id === "null" || id === "undefined" ?
                userData()
                : (
                    userData()
                )
        }, [sesion, idFactu, user, mensaje, confirmed]
    );

    const userData = () => {
        if (sesion) {
            setUser(getUsuario().id);
            getData()
        }

    }
    const finalizarFactu = async () => {
        Swal.fire('Carrito', 'Desea finalizar la compra', 'info ').then((a) => {
            setConfirmed(a.isConfirmed);
            if (a.isConfirmed) {
                // userData();
                carritoFinalizar();
            }
        });
    }

    const carritoFinalizar = async () => {
        try {
            let response = await deleteFactuCart(idFactu);

            let json;
            if (response.status === 200) {
                json = await response.json()
                Swal.fire('Compra', 'Compra realizada correctamente', 'success')
                setMensaje(json);
                history("/carrito/null")
                return json;
            }
            if (response.status === 500) {

                json = await response.json()
                setMensaje(json);
                return json;

            }
            if (response.status === 403) {
                Swal.fire('Acceso denegado', 'No tines permisos', 'warning')
                history("/")
            }
            if (response.status === 404) {
                Swal.fire('DDBB', 'No existe datos', 'warning')
                history("/mercadolibre")
            }
            if (response.status === 401) {
                if (sesion) {
                    logout();
                    history("/")
                }
                history("/")
            }

        } catch (error) {
            console.log(error)
        }
    }
    const createProduct = async (id, cantidad, ope) => {

        const datosUser = JSON.stringify(
            {
                "cliente": {
                    "id": user
                }
            }
        );
        let can = cambiarDatos(ope);

        if (can !== 99991999919999) {
            try {
                let response = await createItemCart(id, can, datosUser);

                setCantidadProduct(0);
                let json;
                if (response.status === 200) {
                    json = await response.json()
                    setMensaje(json);
                    //   console.log(json)

                    //   setFactura(json.cliente.id)
                    Swal.fire('Producto', 'Producto agregado', 'success')
                    history("/carrito/" + idFactu)
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
            Swal.fire('Cantidad', 'Agregar cantidad', 'info')
        }

    }
    const getData = async () => {

        if (id === "null" || id === "undefined") {
            try {
                let response = await findFactuClient(user);

                let json;
                if (response.status === 200) {
                    json = await response.json()
                    // setMensaje("ad")
                    setIdFactu(json[0].id);
                } else {
                }

            } catch (error) {

            }
        } else {

        }

        if (idFactu !== "null") {
            try {

                let response = await findFactuCart(idFactu);

                let json;
                if (response.status === 200) {
                    json = await response.json()
                    setProductFactura(json);
                    // console.log(json[0].items[0].cantidad)//cantidad
                    // console.log(json[0].items[0].producto.nombre)//cantidad
                    //console.log(json[0].items[0].producto.precio)//cantidad
                    //console.log(json[0].total)//cantidad

                    //console.log(json)

                    return json;
                }
                if (response.status === 500) {
                    json = await response.json()
                    setMensaje(json);
                    return json;
                }
                if (response.status === 400) {
                    json = await response.json()
                    //setMensaje(json);
                    Swal.fire('Carrito', 'No tienes productos agregados', 'warning')
                    // history('/mercadolibre')
                    return json;
                }
                if (response.status === 404) {

                    json = await response.json()
                    Swal.fire('DDBB', 'No tienes productos agregados', 'warning')
                    setProductFactura([])
                    // setMensaje(json)
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
    }
    const cambiarDatos = (ope) => {

        if (Math.floor(cantidadProduct) !== 0) {
            if (cantidadProduct !== '' && ope !== '') {
                if (ope === '+') {
                    if (cantidadProduct < 0) {
                        setCantidadProduct(Math.floor(cantidadProduct) * -1);
                        return Math.floor(cantidadProduct) * -1;
                    }
                    return Math.floor(cantidadProduct);

                }
                if (ope === '-') {
                    if (cantidadProduct > 0) {
                        setCantidadProduct(Math.floor(cantidadProduct) * -1)
                        return Math.floor(cantidadProduct) * -1;
                    }
                    return Math.floor(cantidadProduct);
                }

                // setCantidadProduct(0);
            } else {
                return 99991999919999;
            }

        } else {
            return 99991999919999;
        }

    }
    return (

        <>
            <Navigation user={sesion ? user : ""} sesion={sesion} roles={sesion ? hasRole() : []} />
            
            <div>
                <h1 className="uppercase text-center text-black truncate text-7xl font-mono font-black m-12 ">Carrito de compras</h1>
            </div>

            {sesion && productFactura.length > 0
                ?
                <>
                    {idFactu === "null" ? <div className="uppercase text-center text-black truncate text-7xl font-mono font-black m-12 ">Carrito vació</div> : (
                        <>
                            <div className="container ml-24 mr-2">
                                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" class="px-6 py-3">
                                                    Producto
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    Operación
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    Precio
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    Cantidad
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {productFactura[0].items.map(
                                                (fact, index) => (
                                                    <tr key={fact.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                        <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                            {fact.producto.nombre}
                                                        </td>
                                                        <td class="px-6 py-4">
                                                            <div class="flex items-center space-x-3">
                                                                <button onClick={() => createProduct(fact.producto.id, cantidadProduct, "-")} class="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                                                    <span class="sr-only">Quantity button</span>
                                                                    <svg class="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                                                                </button>
                                                                <div>
                                                                    <input onChange={(e) => setCantidadProduct(e.target.value)} type="number" id="third_product" class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1" required />
                                                                </div>
                                                                <button onClick={() => createProduct(fact.producto.id, cantidadProduct, "+")} class="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                                                    <span class="sr-only">Quantity button</span>
                                                                    <svg class="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                                                                </button>
                                                            </div>
                                                        </td>
                                                        <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                            {fact.producto.precio}
                                                        </td>
                                                        <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                            {fact.cantidad}
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <td colSpan={3} class=" px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                    TOTAL
                                                </td>
                                                <td class=" px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                    {productFactura[0].total}
                                                </td>
                                            </tr>
                                            <tr class=" bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <td colSpan={3}></td>
                                                <td class=" px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                    <button onClick={() => finalizarFactu()} type="button" class=" text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">Finalizar compra</button>

                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>

{/*

                            <table>
                                <thead>
                                    <tr>
                                        <th>nombre</th>
                                        <th>precio</th>
                                        <th>cantidad</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productFactura[0].items.map(
                                        (fact, index) => (

                                            //console.log(json[0].items[0].cantidad)//cantidad
                                            //console.log(json[0].items[0].producto.nombre)//cantidad
                                            //console.log(json[0].items[0].producto.precio)//cantidad
                                            //console.log(json[0].total)//cantidad

                                            <tr key={fact.id}>
                                                <th> {fact.producto.nombre
                                                }</th>
                                                <th> {fact.producto.precio
                                                }</th>
                                                <th>{
                                                    fact.cantidad
                                                }</th>
                                                <th>
                                                    <label >Cantidad: </label>
                                                </th>
                                                <th>
                                                    <input type="text" onChange={(e) => setCantidadProduct(e.target.value)} name="cantidadPm" id="cantidadPm" placeholder="2" />
                                                </th>
                                                <th>
                                                    <button onClick={() => createProduct(fact.producto.id, cantidadProduct, "+")}>Agregar</button>
                                                </th>
                                                <th>
                                                    <input type="text" onChange={(e) => setCantidadProduct(Math.floor(e.target.value) * -1)} name="cantidadPm" id="cantidadPm" placeholder="2" />
                                                </th>

                                                <th>
                                                    <button onClick={() => createProduct(fact.producto.id, cantidadProduct, "-")}>quitar</button>
                                                </th>
                                            </tr>
                                        )
                                    )}

                                    <tr>
                                        <th>Total: </th>
                                        <th>{productFactura[0].total
                                        }</th>
                                    </tr>
                                    <tr>
                                        <th><button onClick={() => finalizarFactu()}>Finalizar compra</button></th>
                                    </tr>
                                </tbody>
                            </table>
*/}
                        </>
                    )}
                </>
                :
                <div className="uppercase text-center text-black truncate text-7xl font-mono font-black m-12 ">Carrito vació</div>
            }
        </>
    );
}

export default Carrito;