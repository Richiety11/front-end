import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext.jsx";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { IoLogIn, IoPersonAdd, IoEyeSharp, IoEyeOffSharp } from 'react-icons/io5';
import ReCaptcha from 'react-google-recaptcha'

function LoginPage() {
  const {register, handleSubmit, formState: { errors }, } = useForm();
  const { login, isAuthenticated, errors: loginErrors } = useAuth();
  const [passwordShown, setPasswordShown] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);

  const togglePasswordVisibility = () => {
    setPasswordShown(passwordShown ? false : true);
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) 
      navigate("/products");
      //navigate("/add-product");
    else
    console.log("No esta autenticado")
  }, [isAuthenticated, navigate]);

  const onSubmit = handleSubmit((data) => {
    //console.log(data)
    login(data);
  });

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      {
            loginErrors.map((error, i)=>(
                <div className="bg-red-500 p-2 my-2 text-white" key={i}>
                    {error}
                </div>
            ))
        }
        <h1 className="text-2xl font-bold text-white my-3 ">Login</h1>
        <form onSubmit={onSubmit}>
          <label htmlFor="email">Email</label>
          <input type="email" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Enter your email"
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
          <div className="flex justify-end items-center relative">
            <input type={passwordShown ? "text" : "password"}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-3"
              placeholder="Enter your password"
              {
                ...register("password", { required: true, minLength: 6 })
              }
            />
            {
              passwordShown ? <IoEyeSharp size={30} className="absolute mr-2 w-10"
                                          onClick={togglePasswordVisibility}/>
                            :
                              <IoEyeOffSharp size={30} className="absolute mr-2 w-10"
                              onClick={togglePasswordVisibility}/>
            }
            {
              errors.password?.type === "required" && (
              <p className="text-red-500">Password requerido</p>
              )
            }
            {
              errors.password?.type === "minLength" && (
              <p className="text-red-500">La longitud minima es de 6 caracteres</p>
              )
            }
          </div>
          <button
            type="Submit" className="bg-transparent hover:bg-zinc-500 text-white 
                        font-semibold hover:text-white py-2 px-4 border border-zinc-400 
                        border-transparent rounded my-2"
                        disabled={!captchaValue}
          >
            <div className="flex mx-1 px-1 items-center">
            <IoLogIn size={30} className="mx-1"/> Log In 
            </div>
          </button>
          <ReCaptcha className="my-4"
            sitekey="6Le5Gl0qAAAAAO8hihb0F8rxnHcJaDXK40GNkOYW"
            onChange={(value) => setCaptchaValue(value)}
          />
        </form>
        <p className="flex gap-x-2 justify-between">
        Dont have an account?
          <Link to="/register" className="text-sky-500">
            <div className="flex mx-2 px-2 items-center">
              Create an account <IoPersonAdd size={30} className="mx-1"/>
            </div>
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage