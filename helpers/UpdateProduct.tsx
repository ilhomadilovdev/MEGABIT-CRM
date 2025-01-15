import React, { useState, useRef, useEffect } from 'react';
import { IoMdClose } from "react-icons/io";
import { CiStar } from 'react-icons/ci';

interface OffcanvasPropss {
    //data: string[];
    // title: string,
    //  price: string,
    //  setTitle: (title: string) => void
    // setPrice: (price: string) => void
    isOpenProduct: boolean;
    onCloses: () => void;
    //handlePostNewProduct?: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
    // createNewCategory?: () => void;
    ref?: React.Ref<HTMLDivElement>;
}

const OffcanvasProduct: React.FC<OffcanvasPropss> = ({
    //  setTitle,
    // setPrice,
    //title,
    //  price,
    
    isOpenProduct,
    onCloses,
}) => {

    const offcanvasReff = useRef<HTMLDivElement>(null);

    const handleClickOutsides = (event: MouseEvent) => {
        if (offcanvasReff.current && !offcanvasReff.current.contains(event.target as Node)) {
            onCloses();
        }
    };



    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutsides);
        return () => {
            document.removeEventListener('mousedown', handleClickOutsides);
        };
    }, []);

    return (
        <div
            className="offcanvas"
            ref={offcanvasReff}
            style={{ display: isOpenProduct ? 'block' : 'none' }}
        >
            <div className="offcanvas-content">
                <button onClick={onCloses}><IoMdClose /></button>
            </div>
            <div className='product'>
                <form  >
                    <p className='title'>Редактирование товара</p>


                    <div >
                        <div>
                            <div className='icon_start twoo'><CiStar className='icons_star' /> <p>Title </p></div>
                            <input
                                required
                                // value={title}
                                // onChange={(e) => setTitle(e.target.value)}
                                type='text'
                                placeholder='Наименования' />
                        </div>
                    </div>


                    <div>
                        <div className='icon_start twoo'><CiStar className='icons_star' /> <p>Price  </p></div>
                        <input
                            required
                            //  value={price}
                            // onChange={(e) => setPrice(e.target.value)}
                            type='number'
                            placeholder='Описания' />
                    </div>

                    <button>    Сохранит</button>
                </form>
            </div>

        </div>
    );
};

export default OffcanvasProduct