import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { IoPersonAdd, IoLogIn, IoLogOut, IoPerson, IoList, IoChevronDownSharp, IoBagAdd, IoBagSharp } from 'react-icons/io5';
import { CiStickyNote } from "react-icons/ci";
import { Menu} from "@headlessui/react";

function classNames(...classes) {
    return classes.filter(Boolean).join('')
}

export default function Navbar() {
    const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="bg-zinc-700 my-3 flex grid sm:grid-cols-1 md:grid-cols-2 justify-between items-start py-5 px-10 rounded-lg">
        <Link to={
            isAuthenticated ? '/products' : '/'
        }>
            <h1 className="text-2xl font-bold">Sistema de Productos</h1>
        </Link>
        <ul className="flex gap-x-2">
            {
                isAuthenticated ? (
                    <>
                        <li>
                            <div className="flex mx-3 px-3 items-start">
                                <IoPerson size={30} className="mx-2"/>
                                    {user.username}
                             </div>
                        </li>
                        <li>
                        <Menu as="div" className="relative inline-block text-left">
                            <div>
                                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-zinc-700 px-3 py-2 text-sm 
                                                ring-1 ring-inset ring-zinc-700 hover:bg-zinc-800">
                                <IoList className="-mr-1 h-5 w-5" /> Productos
                                <IoChevronDownSharp aria-hidden="true" className="-mr-1 h-5 w-5" />
                                </Menu.Button>
                            </div>

                            <Menu.Items
                                transition
                                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-zinc shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                            >
                                <div className="py-1">
                                <Menu.Item>
                                    {({active}) => (
                                        <Link to="/products"
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'tex-gray-700',
                                            'block px-4 py-2 text-sm'
                                            )}
                                        >
                                            <IoBagSharp className="h-5 w-5 inline-flex"/> Listar
                                        </Link>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({active}) => (
                                        <Link to="/add-product"
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'tex-gray-700',
                                            'block px-4 py-2 text-sm'
                                            )}
                                        >
                                            <IoBagAdd className="h-5 w-5 inline-flex"/> Agregar
                                        </Link>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({active}) => (
                                        <Link to="/notes"
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'tex-gray-700',
                                            'block px-4 py-2 text-sm'
                                            )}
                                        >
                                            <CiStickyNote className="h-5 w-5 inline-flex"/> Notas
                                        </Link>
                                    )}
                                </Menu.Item>
                                
                                <Menu.Item>
                                    {({active}) => (
                                        <Link to="/login" onClick={()=>{logout()}}
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'tex-gray-700',
                                            'block px-4 py-2 text-sm'
                                            )}
                                        >
                                            <IoLogOut className="h-5 w-5 inline-flex"/> Salir
                                        </Link>
                                    )}
                                </Menu.Item>
                            </div>
                            </Menu.Items>
                        </Menu>

                        </li>
                    </>
                ): (
                    <>
                        <li>
                            <Link className="bg-zinc-500 rounded-md" 
                                    to="/login">
                                        <IoLogIn size={30}/>
                            </Link>
                        </li>
                        <li>
                            <Link className="bg-zinc-500 rounded-md" 
                                    to="/register">
                                    <IoPersonAdd size={30}/>
                            </Link>
                        </li>
                    </>
                )
            }
        </ul>
    </nav>
  )
}
