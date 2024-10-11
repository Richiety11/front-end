export default function HomePage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <h1 className="text-3xl font-bold my-3 text-center">Sistema de Productos</h1>
        <h2 className="text-3xl font-bold my-3 text-center">Lenguajes web</h2>

        <div>
          <p className="gap-x-2 text-justify pt-5 mt-5 text-sm">
            Este sistema ha sido creado en la materia de Lenguajes Web
            Para la Maestria en Sistemas Computacionales (MSC)
          </p>
          <hr className="h-1 bg-gradient-to-r from-sky-500 to-indigo-500"
          />
          <p className="text-center text-xs">
            Derechos Reservados RABG &#9400; 2024
          </p>
        </div>
      </div>
    </div>
  )
}
