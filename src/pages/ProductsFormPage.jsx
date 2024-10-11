import { useForm } from 'react-hook-form';
import { useProducts } from '../context/ProductsContext.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { IoBagAdd } from 'react-icons/io5'

export default function ProductsFormPage() {
  const { register, handleSubmit, setValue, formState:{errors}} =  useForm(
    {
      defaultValues: {
        year: new Date().getFullYear(),
        price: 0.0
      }
    }
  );
  const { products, createProduct, getProduct, updateProduct } = useProducts();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadProduct() {
      //console.log(params)
      if (params.id) {//Si existe dentro de params un id, entonces obtenemos los datos del producto
      const product = await getProduct(params.id);
      setValue('name', product.name);
      setValue('price', product.price);
      setValue('year', product.year);
      }
    }//Fin de loadProduct

    loadProduct();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) //fin de useEffect

  console.log(products)

  const onSubmit = handleSubmit((data) =>{
    //console.log(data)
    if (params.id) {//Si hay un parametro en la url actualiza
      updateProduct(params.id, data);
    }else{ //Si no hay parametro en la url crea el producto
      createProduct(data);
    }
    navigate('/products');
  })//Fin de onSubmit
  
  return (
    <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
      <h1 className="text-2xl font-bold text-white my-3">Add Product</h1>
      <form onSubmit={onSubmit}>
      <label htmlFor="name">Product Name</label>
        <input type="text"
                className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                placeholder='Nombre del Producto'
                {
                  ...register("name")
                }
                autoFocus
        />
        {
          errors.name && (
            <div className='text-red-500'>
              Nombre de producto requerido
            </div>
          )
        }
        <label htmlFor="price">Price</label>
        <input type="number" step="0.10"
                className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                placeholder='Precio del Producto'
                {
                  ...register("price", {
                    required: true,
                    min: 0.0,
                    valueAsNumber: true
                  })
                }
        />
        {
          errors.price && (
            <div className='text-red-500'>
              Precio del producto requerido
            </div>
          )
        }
        {
          errors.price?.type==="min" && (
            <div className='text-red-500'>
              Precio del producto minimo $0
            </div>
          )
        }
        <label htmlFor="year">Year</label>
        <input type="number" step="1" max={new Date().getFullYear()} min="1980"
                className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                placeholder='Año del Producto'
                {
                  ...register("year", {
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
