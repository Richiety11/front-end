import axios from "./axios";

/* NOTAS */

//Llamada al Api para obtener todas las notas
export const getNotesRequest = () => axios.get('/notes');

//llamada al api para obtener un producto por id
export const getNoteRequest = (id) => axios.get('/notes/' + id);

//Llamada al api para agregar un producto
export const createNoteRequest = (note) => axios.post('/notes', note);

//llamada al api para eliminar un producto
export const deleteNoteRequest = (id) => axios.delete('/notes/' + id);

//Llamada al api para actualizar un producto
export const updateNoteRequest = (id, note) => axios.put('/notes/' + id, note);