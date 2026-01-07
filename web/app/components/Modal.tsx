'use client'

import { ReactNode } from 'react'
import { IoMdClose } from 'react-icons/io'

interface ModalProps {
    children: ReactNode
    closeModal: () => void
}

/**
 * Modal Component
 * Displays content in a modal overlay with close button
 */
export default function Modal({ children, closeModal }: ModalProps) {
    return (
        <div
            className="fixed top-[50px] left-0 w-full h-full bg-black/50 flex justify-center items-center z-10"
            onClick={closeModal}
        >
            <div
                className="bg-white p-2.5 rounded w-[90%] h-fit relative md:w-[800px] lg:w-[1000px]"
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    className="absolute w-[25px] h-[25px] bg-white rounded-full -top-[15px] -right-[15px] flex justify-center items-center border-2 border-orange cursor-pointer"
                    onClick={closeModal}
                >
                    <IoMdClose />
                </div>
                {children}
            </div>
        </div>
    )
}

