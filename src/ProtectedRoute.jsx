import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "./context/AuthContext.jsx";

export default function ProtectedRoute() {
    const {loading, isAuthenticated} = useAuth();

    console.log("Loading: " + loading);
    console.log("isAuthenticated: " + isAuthenticated);

    if(loading)
      return <h1>Cargando...</h1>

    if (!isAuthenticated)
        return <Navigate to="/login" replace />

  return (
    <Outlet/>
  )
}
