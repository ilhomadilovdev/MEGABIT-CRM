import Images from '@/helpers/Image';
import { ProductInterface } from '@/types/Product';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

function Cart() {
  const [data, setData] = useState<ProductInterface[]>([]);
  const [dataFromLocalStorage, setDataFromLocalStorage] = useState<string | null>(null);


  useEffect(() => {

    const dataFromLocalStorage = localStorage.getItem('myData');
    if (dataFromLocalStorage) {
      setDataFromLocalStorage(dataFromLocalStorage);
    } else {
      setDataFromLocalStorage(null);
    }
    const storedData = localStorage.getItem('cart');
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem('myData');
      setDataFromLocalStorage(storedData);
    }



    if (storedData) {
      try {
        const parsedData: ProductInterface[] = JSON.parse(storedData);
        setData(parsedData);
      } catch (error) {
        console.error('Error parsing cart data:', error);

      }
    }
  }, []);

  const handleRemoveItem = (itemId: number) => {
    setData(prevData => prevData.filter(item => item.id !== itemId));

    localStorage.setItem(
      'cart',
      JSON.stringify(data.filter(item => item.id !== itemId))
    );
    toast.success('Товар удален из корзины', {
      position: "top-center",
      autoClose: 1400,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };



  return (
    <div className='container'>

      <div className='container_cart'>
        <div className='cart_title'>В корзине :{data.length} товаров</div>
        <div>
          {data.length === 0 ? (
            <Images />
          ) : (
            <div className="container">
              {data.map((item, index) => (
                <div key={index} className="card">
                  <Image width={200} height={100} src={item.thumbnail} alt="rasm" />
                  <p className='title_card'>Title:{item.title}</p>
                  <p className='title-description'> Description: {item.description}
                  </p>
                  <button onClick={() => handleRemoveItem(item.id)}>Удалить</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>

  )
}

export default Cart

