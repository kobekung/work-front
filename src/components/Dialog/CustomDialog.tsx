import React, { FC, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { IoMdClose } from 'react-icons/io';

interface CustomDialogProps {
    open: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const CustomDialog: FC<CustomDialogProps> = ({ open, onClose, title, children }) => {
    const cancelButtonRef = useRef(null);


    return (
        <Transition.Root show={open} as="div">
            <Dialog
                as="div"
                static
                open={open}
                onClose={onClose}
                initialFocus={cancelButtonRef}
                className="fixed z-10 inset-0 overflow-y-auto "
            >
                <div className="flex items-center justify-center min-h-screen">
                    <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

                    <div className="relative bg-white p-4 rounded shadow-lg max-w-2xl w-full ">
                        <div className='flex justify-between'>
                            
                            <Dialog.Title as="h3" className="text-xl font-medium leading-6 text-gray-900">
                                {title}
                            </Dialog.Title>
                            <div className='cursor-pointer' onClick={onClose} ref={cancelButtonRef}>
                                <IoMdClose />
                            </div>
                        </div>
                        <div className="mt-2">
                            {children}
                        </div>

                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default CustomDialog;
