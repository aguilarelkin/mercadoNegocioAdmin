import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { hasRole, isAutenticated } from "../auth/auth.authenticated";
import { getUsuario } from "../auth/auth.token.user";
import { guardarToken, guardarUser } from "../auth/token.login";
import { loginData } from "../services/loginApi";
import Navigation from "./auxiliarcomponent/Navigation";
import generar from "../services/auth";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [mensaje, setMensaje] = useState([]);
    const [sesion, setSesion] = useState(false);
    const history = useNavigate();

    useEffect(
        () => {
            if (isAutenticated()) {
                setSesion(isAutenticated());
                // Swal.fire('Login', `${getUsuario().username} ya estás autenticado`, 'info')
                history("/mercadolibre")
            } else {
                generar();
            };
        }, []
    );

    const login = async (event) => {
        /*event.preventDefault();

        if (username === "" || password === "") {
            Swal.fire('Datos requeridos', 'Ingresar campos vacios', 'info')
            return;

        } else {
            try {
                let response = await loginData(username, password);

                let json;

                if (response.status === 200) {
                    json = await response.json()
                    guardarUser(json.access_token);
                    guardarToken(json.access_token);
                    setMensaje(json);
                    Swal.fire('Bienvenido', `${getUsuario().username}`, 'success')
                    history("/mercadolibre")
                    return json;
                }
                if (response.status === 500) {
                    json = await response.json()
                    setMensaje(json);
                    return json;
                }
                if (response.status === 400) {
                    json = await response.json()
                    setMensaje(json);
                    Swal.fire('Datos incorrectos', 'Usuario o contraseña incorrectos', 'warning')
                    return json;
                }

                if (response.status === 401 || response.status === 403) {
                    history("/")
                }
            } catch (error) {

            }
        }*/
        //33:14
    }

    return (
        <>
            {/*
            {sesion}
            <Navigation sesion={sesion} roles={sesion ? hasRole() : []} />

            {mensaje !== null ? <h1>{mensaje.mensaje}</h1> : <></>}
            {mensaje.length ? <h1>{mensaje}</h1> : <></>}
            <div>
                <h1 className="uppercase text-center text-black truncate text-7xl font-mono font-black m-12 " >Bienvenido</h1>
            </div>

            <center>
                <div class="container mx-auto w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <form method="post" onSubmit={login} class="space-y-6" action="#">
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input type="email" onChange={(e) => { setUsername(e.target.value) }} value={username} name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required autoFocus />
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                            <input type="password" onChange={(e) => { setPassword(e.target.value) }} value={password} name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                        </div>

                        <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
                        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Not registered? <a href={"/register"} class="text-blue-700 hover:underline dark:text-blue-500">Create account</a>
                        </div>
                    </form>
                </div>
            </center>
    */}


{/*
            <form method="post" onSubmit={login}>
                <div>
                    <div>
                        <label>Nombre</label>
                    </div>
                    <div>
                        <input type="text" onChange={(e) => { setUsername(e.target.value) }} value={username} name="username" id="username" placeholder="Username" autoFocus />
                    </div>

                </div>
                <div>
                    <div>
                        <label>Contraseña</label>
                    </div>
                    <div>
                        <input type="password" onChange={(e) => { setPassword(e.target.value) }} value={password} name="password" id="password" placeholder="Password" />
                    </div>
                </div>
                <div>
                    <div>
                        <input type="submit" value="Enviar" />
                    </div>
                </div>
            </form>
*/}
        </>
    );
}

export default Login;