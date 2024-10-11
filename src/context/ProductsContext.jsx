import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";
import { createProductRequest, 
    getProductsRequest, 
    deleteProductRequest,
    getProductRequest,
    updateProductRequest } from "../api/products.js";

const ProductsContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useProducts = () => {
    const context = useContext(ProductsContext);
    if (!context)
        throw new Error ("useProducts debe estar dentro de un ProductsProvider");
    return context;
}

export function ProductsProvider({children}) {
    const [products, setProducts] = useState([]);

    //Funcion para crear un producto
    const createProduct = async (product) => {
        //console.log(product)
        await createProductRequest(product);
        getProducts();
    }//Fin de createProduct

    //Funcion para obtener todos los productos
    const getProducts = async ()=>{
        try {
            const res = await getProductsRequest();
            //Asignamos la respuesta del backend al arreglo de productos
            setProducts(res.data);
        } catch (error) {
            console.log(error);
        }
    }//Fin de getProducts

    //Funcion para eliminar un producto de la bd
    const deleteProduct = async (id) => {
        try {
            const res = await deleteProductRequest(id);
            //console.log(res.data);
            if (res.status === 200) {
                setProducts(products.filter(product => product._id != id))
            }
        } catch (error) {
            console.log(error)
        }
    }//Fin de deleteProduct

    //Funcion para obtener un producto por id
    const getProduct = async (id) => {
        try {
            const res = await getProductRequest(id)
            //console.log(res)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }//Fin de getProduct

    //Funcion para actualizar producto por id
    const updateProduct = async (id, product) => {
        try {
            await updateProductRequest(id, product);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ProductsContext.Provider value={{
            products,
            createProduct,
            getProducts,
            deleteProduct,
            getProduct,
            updateProduct
        }}>
            {children}
        </ProductsContext.Provider>
    )
}

ProductsProvider.propTypes = {
    children: PropTypes.any
}