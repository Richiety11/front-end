import { useEffect } from "react"
import { useNotes } from "../context/NotesContext.jsx";
import NoteCard from "../components/NoteCard.jsx";
import { IoAddCircle } from 'react-icons/io5';
import { Link } from "react-router-dom";

export default function NotesPage() {
    const { getNotes, notes } = useNotes();
  
    //Ejecutamos getNotes inmediatamente despues de cargar el componente
    useEffect(() => {
      getNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
    if (notes.length ===0)
      return (<h1>No hay notas en la lista</h1>)
  
    return (
      <div>
        <ul className="flex gap-x-2 my-2">
          <li>
            <Link className="bg-zinc-500 rounded-sm"  
                    to="/add-note">
              <IoAddCircle size={30}/>
            </Link>
          </li>
          Agregar nota
        </ul>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
          {
            notes.map((note) => (
              <NoteCard note={note} key={note._id} />
            ))
          }
        </div>
      </div>
      

    )
  }