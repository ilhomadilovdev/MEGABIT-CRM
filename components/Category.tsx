
import Offcanvas from '@/helpers/ProductModal';
import React, { useEffect, useState } from 'react'
import { AiOutlineDelete, AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from 'react-toastify';
import { CiEdit } from 'react-icons/ci';





function CategoryProduct() {
  interface Product {
    id: number | string;
    title: string;
    productId: number;
    category: {
      name: string
    }
  }



  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState<Product[]>([])

  const [loading, setLoading] = useState(false)
  const [loadingDelete, setLoadingDelete] = useState(false)
  const [error, setError] = useState(null)

  const [count, setCount] = useState(1);


  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [image, setImage] = useState<string[]>([]);
  const [loadProduct, setLoadProduct] = useState(false);




  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await fetch(`https://api.escuelajs.co/api/v1/categories/${count}/products`);
      const product = await response.json();
      setProduct(product);
      console.log(product);

    } catch (error: any) {
      setError(error)
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false)
    }
  };

  //createNewProduct
  const handlePostNewProduct = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoadProduct(true);
    console.log('product bosildi');

    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          images: image,
          description,
          categoryId,
          price,
        }),
      });

      if (response.ok) {
        const data = await response.json()
        fetchData()
        toast.success('Товар успешно создан', {
          position: "top-center",
          autoClose: 1400,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log('newProduct', data);


      } else {
        console.error('Error fetching product:', error);
      }
    } catch (error) {

      console.error('Error fetching product:', error);
    } finally {
      setLoadProduct(false);
    }
  };

  //deleteProduct
  async function deleteProduct(id: string | number) {
    setLoadingDelete(true)
    console.log('delete');
    try {
      const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Success:', data)
      fetchData()
      toast.success('Товар успешно удален', {
        position: "top-center",
        autoClose: 1400,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });


    } catch (error) {
      console.error('Error:', error);

    } finally {
      setLoadingDelete(false)
    }
  }


  useEffect(() => {
    fetchData();
  }, [count]);





  return (
    <div className='parent'>
      <div className='btn_div'>
        <button onClick={() => setIsOpen(true)}>Создать товар + </button>
        <Offcanvas
          handlePostNewProduct={handlePostNewProduct}
          setTitle={setTitle}
          setPrice={setPrice}
          setDescription={setDescription}
          setCategoryId={setCategoryId}
          setImage={setImage}
          title={title}
          price={price}
          description={description}
          categoryId={categoryId}
          image={image}
          count={count}
          setCount={setCount}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)} />
      </div>

      {loadProduct ? <AiOutlineLoading3Quarters /> : ''}
      {loadingDelete?<AiOutlineLoading3Quarters /> : ''}
      <div>
        {loading ? (
          <h1>Yuklanmoqda</h1>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <table className='tt'>
            <thead className='tr' >
              <tr  >
                <th >#</th>
                <th>Наименование</th>
              </tr>
            </thead>
            <tbody>
              {product.map((item, index) => (
                <tr key={item.id}>
                  <td className='index'>{index + 1} </td>
                  <td className='name one'>
                    <p className='p'>{item?.title.slice(0, 12)}</p>
                    <p className='p'>{item?.category.name}</p>
                    <div className='icons'>
                      <div  >
                        <button  > <CiEdit />
                        </button>
                      </div>
                      <button onClick={() => deleteProduct(item.id)} > <AiOutlineDelete /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}


      </div>
    </div>
  )








}

export default CategoryProduct