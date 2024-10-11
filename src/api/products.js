import axios from "./axios";

//Llamada al Api para obtener todos los productos
export const getProductsRequest = () => axios.get('/products');

//llamada al api para obtener un producto por id
export const getProductRequest = (id) => axios.get('/products/' + id);

//Llamada al api para agregar un producto
export const createProductRequest = (product) => axios.post('/products', product);

//llamada al api para eliminar un producto
export const deleteProductRequest = (id) => axios.delete('/products/' + id);

//Llamada al api para actualizar un producto
export const updateProductRequest = (id, product) => axios.put('/products/' + id, product);
