import { useEffect } from "react";
import Swal from "sweetalert2";
import { logout } from "../session/operation.login";
import { useNavigate } from "react-router-dom";


function Logout() {

    const history = useNavigate();
    useEffect(
        () => {
            logout();
            history("/mercadolibre");
        }, []
    );

    return (<> </>);
}

export default Logout;