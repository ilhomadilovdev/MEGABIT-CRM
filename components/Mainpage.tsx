


import Offcanvas from '@/helpers/Modal';
import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { toast } from 'react-toastify';


function Mainpage() {

  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const getCategory = () => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch('https://api.escuelajs.co/api/v1/categories', {

        });

        if (!response.ok) {
          throw new Error('Ошибка при получении данных');
        }

        const product = await response.json();
        setProduct(product);
        console.log('data', product);
        setLoading(false)
      } catch (error: any) {
        setError(error.message);
        console.log('error', error);

      }
    }
    fetchData()
  }
  //category yaratish
  const [name, setName] = useState('');

  async function createNewCategory(event: React.FormEvent) {
    event.preventDefault();
    console.log('hhhhh');
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          image: "https://avatars.mds.yandex.net/i?id=427958d103801c3272a11a612ed8a56891fcca82-5236580-images-thumbs&n=13",
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      getCategory()
      toast.success('Категория успешно создан', {
        position: "top-center",
        autoClose: 1400,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log('Success:', data)


    } catch (error) {
      console.error('Error:', error);

    }
  }

  //delete category

  const [isLoading, setIsLoading] = useState(false);
  async function deleteCategory(id: string | number) {

    setIsLoading(true)
    console.log('delete');
    try {
      const response = await fetch(`https://api.escuelajs.co/api/v1/categories/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Success:', data)
      getCategory()
      toast.success('Категория успешно удален', {
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
      setIsLoading(false)
    }
  }



  useEffect(() => {
    getCategory()
  }, [])

  interface Product {
    id: number;
    title: string;
    name: string
  }



  return (
    <div className='parent'>
      <div className='btn_div'>
        <button onClick={() => setIsOpen(true)}>Создать категорию + </button>
        <Offcanvas name={name} setName={setName} createNewCategory={createNewCategory} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
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
                    <p className='p'>{item.name}</p>
                    <div className='icons'>
                      <button> <CiEdit /></button>
                      <button onClick={() => deleteCategory(item.id)}> <AiOutlineDelete /> </button>
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

export default Mainpage