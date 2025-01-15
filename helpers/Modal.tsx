import React, { useState, useRef, useEffect } from 'react';
import { IoMdClose } from "react-icons/io";
import { CiStar } from 'react-icons/ci';

interface OffcanvasProps {
    isOpen: boolean;
    name: string;
    setName: (name: string) => void;
    onClose: () => void;
    createNewCategory?: (event: React.FormEvent<HTMLFormElement>) => Promise<void>; 
    ref?: React.Ref<HTMLDivElement>;
}

const Offcanvas: React.FC<OffcanvasProps> = ({ isOpen, onClose, name, setName, createNewCategory }) => {

    const offcanvasRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (offcanvasRef.current && !offcanvasRef.current.contains(event.target as Node)) {
            onClose();
        }
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
            <div className='modal_header'>
                <form onSubmit={createNewCategory} >
                    <p>Создание категории</p>
                    <div className='modal_icons'><CiStar className='icons_star' /> <p>Наименование категории</p></div>
                    <input
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type='text'
                        placeholder='Наименования' />
                    <button type='submit'>Сохранит</button>
                </form>
            </div>

        </div>
    );
};

export default Offcanvas