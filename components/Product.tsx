
import { ProductInterface } from '@/types/Product';
import React, { useEffect, useState } from 'react'
import { FaCartArrowDown } from "react-icons/fa";
import { toast } from 'react-toastify';

function Product() {


  const [cart, setCart] = useState<ProductInterface[]>(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });




  const [product, setProduct] = useState<ProductInterface[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)



  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await fetch(`https://dummyjson.com/products?limit=8`);
      const product = await response.json();
      setProduct(product.products);
      console.log(product);

    } catch (error: any) {
      setError(error)
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchData()

  }, [])




  function addToCart(product: ProductInterface) {
    const isProductAlreadyInCart = cart.some(
      (item) => item.id === product.id
    );

    if (!isProductAlreadyInCart) {
      const newCart = [...cart, product];
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
      toast.success('Товар добавлен в корзину', {
        position: "top-center",
        autoClose: 1400,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

    } else {

      toast.info('Товар уже находится в корзине', {
        position: "top-center",
        autoClose: 1400,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };




  return (
    <div className='cart_product'>

      <div className='cart_icon'>
        <span>Корзинка</span>
        <div className='icons_cart'> <FaCartArrowDown /> {cart.length}</div>
      </div>

      <div>
        {loading ? (
          'loading'
        ) : (
          <div className="container">
            {product.map((item, index) => (
              <div key={index} className="card">
                <img src={item.thumbnail} alt="rasm" />
                <p className='title_card'>Title:{item.title}</p>
                <p className='title-description'> Description: {item.description}
                </p>
                <button onClick={() => addToCart(item)} >
                  {cart.some((cartItem) => cartItem.id === item.id)
                    ? (<div className='carts'>В корзине </div>)
                    : <div >Добавить в корзину</div>}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )

}





export default Product