"use client"
import { AddItemButton } from '@/components/uploads/add-item-button'
import { useState } from 'react';
import { MenuFormModal } from '../menu-form-modal';

type Props = {
    restaurantSlug: string;
}

export const MenuAddModalButton = ({ restaurantSlug }: Props) => {
    const [openMenuModal, setOpenMenuModal] = useState(false);

    return (
        <>
            <AddItemButton label="Add New" onClick={() => setOpenMenuModal(true)} />
            {openMenuModal && (
                <MenuFormModal
                    setOpenModal={setOpenMenuModal}
                    openModal={openMenuModal}
                    restaurantSlug={restaurantSlug} label="Add New Menu"
                    formDescription="Add your new Menu here"
                />
            )}
        </>
    )
}
