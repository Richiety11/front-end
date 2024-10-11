import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest, logoutRequest } from "../api/auth.js";
import PropTypes from "prop-types";
import Cookies from 'js-cookie';

export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = ()=>{
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe estar definido en un contexto')
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            //console.log(error)
            //Si existe un error al registrar usuario
            //guardamos el error en la varuable errors
            setErrors(error.response.data.message);
        }
    }//fin de signUp

    const login = async (user) => {
        try {
            const res = await loginRequest(user);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            //console.log(error)
            //Si existe un error al registrar usuario
            //guardamos el error en la varuable errors
            setErrors(error.response.data.message);
        }
    }//fin de login

    //Funcion para cerrar sesion
    const logout = () => {
        logoutRequest();
        Cookies.remove('token');
        setIsAuthenticated(false);
        setUser(null);
    }

    useEffect(()=>{
        if (errors.length > 0) {
            const timer = setTimeout(()=>{
                setErrors([])
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errors]); //Fin de useEffect timer borrado errores

    useEffect(()=>{
        async function checkLogin() {
            const cookies = Cookies.get();
            console.log(cookies)
            
            if (!cookies.token) {
                //Si no hay una cookie que contenga token
                setIsAuthenticated(false);
                setLoading(false);//No hay cookie y no se cargan los datos del backend
                //Establecemos los datos del usuario en null
                return setUser(null);
            }

            try { //En caso de que exista un token en las cookie
                //lo verificamos en el backend con verifytokenrequest
                const res = await verifyTokenRequest(cookies.token);
                console.log(res);
                if (!res.data) { //Si el backend no responde con un token
                    setIsAuthenticated(false);
                    setLoading(false);
                    setUser(null);
                    return;
                }

                //En caso de que exista un tokewn y se obtengan datos de respuesta del usuario
                setIsAuthenticated(true);//El usuario ya esta autenticado
                setUser(res.data);//Establecemos en memoria los datos del usuario
                setLoading(false);//Termino de cargar los datos del usuarioi

            } catch (error) {
                console.log(error);
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
            }
        }//Fin de checkLogin

        checkLogin();
    }, []);//Fin de useEffect

    return(
        <AuthContext.Provider value={ { 
            user,
            signup,
            isAuthenticated,
            errors,
            login,
            loading,
            logout
         } }>
            {children}
        </AuthContext.Provider>
    )
}//Fin de AuthProvider

AuthProvider.propTypes = {
    children: PropTypes.any
}