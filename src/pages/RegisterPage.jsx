import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext.jsx";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { IoLogIn, IoPersonAdd } from 'react-icons/io5';

function RegisterPage() {
  const {register, handleSubmit, formState: { errors }, } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/products");
  }, [isAuthenticated, navigate]);

  const onSubmit = handleSubmit(async (values) => {
    //console.log(values)
    signup(values);
  });

  return (
    <div className="bg-zinc-800 max-w-md p-10 rounded-md">
        {
            registerErrors.map((error, i)=>(
                <div className="bg-red-500 p-2 my-2 text-white" key={i}>
                    {error}
                </div>
            ))
        }
      <h1 className="text-2xl font-bold text-white my-3">Register</h1>
      <form onSubmit={onSubmit}>
      <label htmlFor="username">User Name</label>
        <input
          type="text"
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Username"
          {...register("username", { required: true, minLength: 5 })}
        />
        {errors.username?.type === "required" && (
          <p className="text-red-500">Nombre de usuario requerido</p>
        )}
        {errors.username?.type === "minLength" && (
          <p className="text-red-500">La longitud minima es de 5 caracteres</p>
        )}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="email"
          {...register("email", {
            required: true,
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Porfavor introduce un email valido",
            },
          })}
        />
        {errors.email?.type === "required" && (
          <p className="text-red-500">Email requerido</p>
        )}
        {errors.email?.message && (
          <p className="text-red-500">Email invalido</p>
        )}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="password"
          {...register("password", { required: true, minLength: 6 })}
        />
        {errors.password?.type === "required" && (
          <p className="text-red-500">Password requerido</p>
        )}
        {errors.password?.type === "minLength" && (
          <p className="text-red-500">La longitud minima es de 6 caracteres</p>
        )}

        <button
          type="Submit"
          className="bg-transparent hover:bg-zinc-500 text-white 
                        font-semibold hover:text-white py-2 px-4 border border-zinc-400 
                        border-transparent rounded">
          <IoPersonAdd size={30}/>
          Registrar
        </button>
      </form>
      <p className="flex gap-x-2 justify-between pt-5 mt-5">
          ¿Ya tienes cuenta?
          <Link to="/login" className="text-sky-500">
            <div className="flex mx-2 px-2 items-center">
              Inicia sesión <IoLogIn size={30} className="mx-1"/>
            </div>
          </Link>
        </p>
    </div>
  );
}

export default RegisterPage;
