import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";
import { createNoteRequest, 
    getNotesRequest, 
    deleteNoteRequest, 
    getNoteRequest, 
    updateNoteRequest } from "../api/notes.js";

    const NotesContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useNotes = () => {
    const context = useContext(NotesContext);
    if (!context)
        throw new Error ("useNotes debe estar dentro de un NotesProvider");
    return context;
}

export function NotesProvider({children}) {
    const [notes, setNotes] = useState([]);

    //Funcion para crear una nota
    const createNote = async (note) => {
        //console.log(note)
        await createNoteRequest(note);
        getNotes();
    }//Fin de createNote

    //Funcion para obtener todas las notas
    const getNotes = async ()=>{
        try {
            const res = await getNotesRequest();
            //Asignamos la respuesta del backend al arreglo de notas
            setNotes(res.data);
        } catch (error) {
            console.log(error);
        }
    }//Fin de getNotes

    //Funcion para eliminar una nota de la bd
    const deleteNote = async (id) => {
        try {
            const res = await deleteNoteRequest(id);
            //console.log(res.data);
            if (res.status === 200) {
                setNotes(notes.filter(note => note._id != id))
            }
        } catch (error) {
            console.log(error)
        }
    }//Fin de deleteNote

    //Funcion para obtener una nota por id
    const getNote = async (id) => {
        try {
            const res = await getNoteRequest(id)
            //console.log(res)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }//Fin de getNote

    //Funcion para actualizar nota por id
    const updateNote = async (id, note) => {
        try {
            await updateNoteRequest(id, note);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <NotesContext.Provider value={{
            notes,
            createNote,
            getNotes,
            deleteNote,
            getNote,
            updateNote
        }}>
            {children}
        </NotesContext.Provider>
    )
}

NotesProvider.propTypes = {
    children: PropTypes.any
}