import PropTypes from "prop-types";
import { useNotes } from "../context/NotesContext.jsx";
import { Link } from "react-router-dom";
import { IoTrashBinSharp, IoPencilSharp } from 'react-icons/io5'

export default function NoteCard({note}) {
    const { deleteNote } = useNotes();
  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <header className="flex justify-between">
            <h1 className="text-1xl font-bold">
                {note.titulo}
            </h1>
            <div className="flex gap-x-2 items-center">
                <button  className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                    onClick={()=> {
                    //console.log(note._id);
                    deleteNote(note._id);}}>
                        <IoTrashBinSharp />
                </button>
                <Link className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-lg" 
                        to={'/notes/' + note._id}>
                    <IoPencilSharp />
                </Link>
            </div>
        </header>
        <p className="text-slate-300 my-2">
            {note.descripcion}
        </p>
        <p className="text-slate-300 my-2">
            {note.fecha}
        </p>
    </div>
  )
}

NoteCard.propTypes = {
    note: PropTypes.any
}