import React, { useState, useRef, useEffect } from 'react';
import { IoMdClose } from "react-icons/io";
import { CiStar } from 'react-icons/ci';

interface OffcanvasProps {
    title: string,
    price: string,
    description: string,
    categoryId: string,
    image: string[],
    setTitle: (title: string) => void
    setPrice: (price: string) => void
    setDescription: (description: string) => void
    setCategoryId: (categoryId: string) => void
    setImage: (image: string[]) => void
    isOpen: boolean;
    count: number;
    setCount: (count: number) => void;
    onClose: () => void;
    handlePostNewProduct?: (event: React.FormEvent<HTMLFormElement>) => Promise<void>; 
    createNewCategory?: () => void;
    ref?: React.Ref<HTMLDivElement>;
}

const Offcanvas: React.FC<OffcanvasProps> = ({
    handlePostNewProduct,
    setTitle,
    setPrice,
    setDescription,
    setCategoryId,
    setImage,
    title,
    price,
    description,
    categoryId,
    image,
    isOpen,
    onClose,
    createNewCategory,
    count,
    setCount }) => {

    const offcanvasRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (offcanvasRef.current && !offcanvasRef.current.contains(event.target as Node)) {
            onClose();
        }
    };

    const handleCountChange = (event: any) => {
        const newCount = Number(event.target.value);
        setCount(newCount);
        setCategoryId(newCount.toString()); 
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div
            className="offcanvas"
            ref={offcanvasRef}
            style={{ display: isOpen ? 'block' : 'none' }}
        >
            <div className="offcanvas-content">
                <button onClick={onClose}><IoMdClose /></button>
            </div>
            <div className='product'>
                <form  onSubmit={handlePostNewProduct} >
                    <p className='title'>Создание товара</p>
                    <div >
                        <div className='icon_start'><CiStar className='icons_star' /> <p>Категория</p></div>



                        <select value={count} onChange={handleCountChange}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                    </div>

                    <div >
                        <div className='hidden'>
                            <div className='icon_start onee'><CiStar className='icons_star' /> <p>Category </p></div>
                            <input 
                                required
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                                type='text'
                                placeholder='Наименования'
                            />
                        </div>



                        <div>
                            <div className='icon_start twoo'><CiStar className='icons_star' /> <p>Title </p></div>
                            <input
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                type='text'
                                placeholder='Наименования' />
                        </div>
                    </div>

                    <div>
                        <div className='icon_start end'><CiStar className='icons_star' /> <p>Описание  </p></div>
                        <input
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            type='text'
                            placeholder='Описания' />
                    </div>
                    <div>
                        <div className='icon_start twoo'><CiStar className='icons_star' /> <p>Price  </p></div>
                        <input
                            required
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            type='number'
                            placeholder='Описания' />
                    </div>
                    <div>
                        <div className='icon_start twoo'><CiStar className='icons_star' /> <p>Фото  </p></div>
                        <input
                            required
                            value={image}
                            onChange={(e) => setImage([e.target.value])}
                            type='text'
                            placeholder='URL фото' />
                    </div>


                 <button type='submit'>    Сохранит</button>
                </form>
            </div>

        </div>
    );
};

export default Offcanvas