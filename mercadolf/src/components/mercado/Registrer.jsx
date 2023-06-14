import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { createCliente } from "../../services/mercadoApi";
import Navigation from "../auxiliarcomponent/Navigation";

function Register() {

    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [email, setEmail] = useState("");
    const [foto, setFoto] = useState("image.png");
    const [password, setPassword] = useState("");
    const [passwordTwo, setPasswordTwo] = useState("");

    const [mensaje, setMensaje] = useState([]);
    const history = useNavigate();

    const register = async (event) => {
        event.preventDefault();

        if (nombre === "" || apellido === "" || email === "" || foto === "" || password === "" || passwordTwo === "") {
            Swal.fire('Datos requeridos', 'Ingresar campos vacios', 'info')
            return;
        } else {
            if (password === passwordTwo) {
                const client = JSON.stringify(
                    {
                        nombre, apellido, email, foto, password,
                        "enable": true,
                        "roles": [{
                            "id": 3,
                            "nombre": "ROLE_CLIENT"
                        }]
                    }
                );

                try {
                    let response = await createCliente(client);

                    let json;

                    if (response.status === 200) {
                        json = await response.json()
                        if (json.cliente.id !== null) {

                            setMensaje(json);
                            Swal.fire('Cliente', 'Cliente registrado con exito', 'success')
                            history("/")
                        } else {
                            Swal.fire('Cliente', 'Cliente registrado, Inicia sesión', 'success')
                            history("/")
                        }

                        return json;

                    }
                    if (response.status === 500) {
                        json = await response.json()
                        setMensaje(json);
                        return json;

                    }
                    if (response.status === 400) {

                        json = await response.json()

                        Swal.fire('Datos requeridos', 'Ingresar campos vacios o datos correctos', 'info')

                        setMensaje(json);
                        return json;
                    }
                    if (response.status === 403) {
                        Swal.fire('Acceso denegado', 'No tines permisos', 'warning')
                        history("/")
                    }


                } catch (error) {
                    console.log(error);
                }
            } else {
                Swal.fire('Contraseña', 'Las contraseñas no coninciden', 'warning')
            }
        }
    }
    return (


        <>
            <Navigation sesion={false} roles={[]} />

            <div>
                <h1 className="uppercase text-center text-black truncate text-7xl font-mono font-black m-12 ">Crear Cuenta </h1>
            </div>

            <form method="post" onSubmit={register} className="ml-24 mr-24">
                <div className="ml-48 mr-48">
                    <div class="grid md:grid-cols-2 md:gap-6">

                        <div class="relative z-0 w-full mb-6 group">
                            <input type="text" onChange={(e) => { setNombre(e.target.value) }} value={nombre} name="floating_first_name" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nombres</label>
                        </div>
                        <div class="relative z-0 w-full mb-6 group">
                            <input type="text" onChange={(e) => { setApellido(e.target.value) }} value={apellido} name="floating_last_name" id="floating_last_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label for="floating_last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Apellidos</label>
                        </div>
                    </div>
                    <div class="relative z-0 w-full mb-6 group">
                        <input type="email" onChange={(e) => { setEmail(e.target.value) }} value={email} name="floating_email" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                    </div>
                    <div class="relative z-0 w-full mb-6 group">
                        <input type="password" onChange={(e) => { setPassword(e.target.value) }} value={password} name="floating_password" id="floating_password" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label for="floating_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Contraseña</label>
                    </div>
                    <div class="relative z-0 w-full mb-6 group">
                        <input type="password" onChange={(e) => { setPasswordTwo(e.target.value) }} value={passwordTwo} name="repeat_password" id="floating_repeat_password" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label for="floating_repeat_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirmar contraseña</label>
                    </div>
                    <center>
                        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Resgistarase</button>
                    </center>
                </div>
            </form>


            {/*
            <form method="post" onSubmit={register}>
                <div>
                    <div>
                        <label>Nombre</label>
                    </div>
                    <div>
                        <input type="text" onChange={(e) => { setNombre(e.target.value) }} value={nombre} name="nameLogin" id="nameLogin" placeholder="nameLogin" autoFocus />
                    </div>

                </div>
                <div>
                    <div>
                        <label>Apellido</label>
                    </div>
                    <div>
                        <input type="text" onChange={(e) => { setApellido(e.target.value) }} value={apellido} name="apellido" id="apellido" placeholder="apellido" />
                    </div>

                </div>
                <div>
                    <div>
                        <label>Email</label>
                    </div>
                    <div>
                        <input type="email" onChange={(e) => { setEmail(e.target.value) }} value={email} name="email" id="email" placeholder="email" />
                    </div>

                </div>
                <div>
                    <div>
                        <label>Foto</label>
                    </div>
                    <div>
                        <input type="text" onChange={(e) => { setFoto(e.target.value) }} value={foto} name="foto" id="foto" placeholder="foto" />
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
                        <label>Confirmar Contraseña</label>
                    </div>
                    <div>
                        <input type="password" onChange={(e) => { setPasswordTwo(e.target.value) }} value={passwordTwo} name="passwordTwo" id="passwordTwo" placeholder="Password" />
                    </div>
                </div>
                <div>
                    <div>
                        <input type="submit" value="Resgistarase" />
                    </div>
                </div>
            </form>
*/}
        </>
    );

}

export default Register;