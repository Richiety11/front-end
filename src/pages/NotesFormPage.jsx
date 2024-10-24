import { useForm } from 'react-hook-form';
import { useNotes } from '../context/NotesContext.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { IoBagAdd } from 'react-icons/io5';

export default function NotesFormPage() {
    const { register, handleSubmit, setValue, formState:{errors}} =  useForm(
      {
        defaultValues: {
          fecha: new Date().getFullYear()
        }
      }
    );
    const { notes, createNote, getNote, updateNote } = useNotes();
    const navigate = useNavigate();
    const params = useParams();
  
    useEffect(() => {
      async function loadNote() {
        //console.log(params)
        if (params.id) {//Si existe dentro de params un id, entonces obtenemos los datos de la nota
        const note = await getNote(params.id);
        setValue('titulo', note.titulo);
        setValue('descripcion', note.descripcion);
        setValue('fecha', note.fecha);
        }
      }//Fin de loadNote
  
      loadNote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) //fin de useEffect
  
    console.log(notes)
  
    const onSubmit = handleSubmit((data) =>{
      //console.log(data)
      if (params.id) {//Si hay un parametro en la url actualiza
        updateNote(params.id, data);
      }else{ //Si no hay parametro en la url crea la nota
        createNote(data);
      }
      navigate('/notes');
    })//Fin de onSubmit
    
    return (
      <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
        <h1 className="text-2xl font-bold text-white my-3">Add a Note</h1>
        <form onSubmit={onSubmit}>
        <label htmlFor="titulo">Titulo</label>
          <input type="text"
                  className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                  placeholder='Titulo de la nota'
                  {
                    ...register("titulo")
                  }
                  autoFocus
          />
          {
            errors.titulo && (
              <div className='text-red-500'>
                Titulo de nota requerido
              </div>
            )
          }
          <label htmlFor="descripcion">Descripcion</label>
          <input type="String"
                  className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                  placeholder='Descripcion de la nota'
                  {
                    ...register("descripcion")
                  }
          />
          {
            errors.titulo && (
              <div className='text-red-500'>
                Descripcion de la nota requerida
              </div>
            )
          }
          <label htmlFor="fecha">Fecha</label>
          <input type="number" step="1" max={new Date().getFullYear()} min="1980"
                  className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                  placeholder='Fecha de la nota'
                  {
                    ...register("fecha", {
                      valueAsNumber: true
                    })
                  }
          />
          <button
              type="Submit"
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 
                border-b-4 border-blue-700 hover:border-blue-500 rounded"
            >
              <IoBagAdd size={30}/> Guardar
            </button>
        </form>
      </div>
    )
  }