import OffcanvasProduct from '@/helpers/UpdateProduct'
import React from 'react'
import { CiEdit } from 'react-icons/ci'
interface HandleModalProps {
    isOpenProduct: boolean;
    setIsOpenProduct: React.Dispatch<React.SetStateAction<boolean>>;
  }


function HandleModal({ isOpenProduct, setIsOpenProduct }:HandleModalProps) {
    
    return (
        <div >
            
            <OffcanvasProduct
                isOpenProduct={isOpenProduct}
                onCloses={() => setIsOpenProduct(false)} />
        </div>
    )
}

export default HandleModal