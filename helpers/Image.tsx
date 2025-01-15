import React from 'react'
import Image, { StaticImageData } from 'next/image';
function Images() {
    const myImage: StaticImageData = require('../assets/images/korzinka.png')
    return (
        <div className='images_korzinka'>
            <p>Корзинка пусто</p>
            <Image src={myImage} alt="My Image" width={400} height={400} />
        </div>
    )
}

export default Images