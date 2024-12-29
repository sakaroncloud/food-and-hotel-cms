import { getData } from '@/app/data';
import FallbackImage from '@/components/fallback-image';
import { AddressFormModal } from '@/components/form/address-modal';
import { BACKEND_URL } from '@/lib/constants';
import { API_ROUTES } from '@/lib/routes';
import { ResponseWithNoMeta } from '@/lib/types/response.type';
import { Restaurant } from '@/lib/types/restaurant.types';
import { PenIcon, Phone } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { PiEnvelope } from 'react-icons/pi';

type Props = {
    restaurantSlug: string;
}

export const RestaurantHeroSection = async ({
    restaurantSlug
}: Props) => {

    const result = await getData<ResponseWithNoMeta<Restaurant.TRestaurant>>({
        endPoint: API_ROUTES.restaurant.endpoint,
        param: restaurantSlug,
        tags: ["restaurant", restaurantSlug]
    });

    const restaurant = result?.data

    if (!restaurant) return null

    const formattedAddress = [
        restaurant?.address?.streetOne,
        restaurant?.address?.area,
        restaurant?.address?.city?.name,
    ]
        .filter(Boolean) // Removes undefined or empty values
        .join(", ");
    return (
        <div>
            <div className='h-[220px] bg-slate-100 shadow-sm rounded-xl relative'>
                <FallbackImage
                    type='rectangle'
                    alt='Restaurant Featured Image'
                    src={BACKEND_URL + "/" + restaurant?.featuredImage?.url}
                    width={1000}
                    height={220}
                    quality={100}
                    className='object-cover w-full h-full'
                    errorMessage='Restaurant Featured Image is Missing'
                />

                <Link href={`/restaurants/${restaurantSlug}/edit`} className='absolute top-4 right-4 flex size-10 p-3 rounded-full bg-primary/60 items-center justify-center'>
                    <PenIcon className='  text-white' />
                </Link>
            </div>
            <div className='p-2 rounded-xl max-w-[1300px] mx-auto  -translate-y-1/2   h-48 flex items-end gap-4'>
                <div className=' border-white  border-4 rounded-full relative w-[150px] h-[150px] bottom-0'>
                    <FallbackImage
                        type='rectangle'
                        alt='Restaurant Logo Image'
                        src={BACKEND_URL + "/" + restaurant?.logo?.url}
                        width={150}
                        height={150}
                        className='object-cover w-[150px] h-[150px] rounded-full absolute z-50'
                    />
                </div>
                <div className='flex-1 h-1/2 p-6 gap-2 translate-y-2 flex items-center justify-between shadow-md bg-white rounded-xl'>
                    <div className='flex gap-2 flex-col'>
                        <Link href={`/restaurants/${restaurant.slug}`} className='text-xl font-bold text-gray-700'>
                            {restaurant.name}
                        </Link>
                        <div className='flex items-center gap-2 text-gray-700'>
                            <PiEnvelope className='' />
                            {restaurant.email}
                        </div>
                    </div>

                    <div className='flex flex-1 gap-4 items-center justify-end text-gray-700'>
                        <div className='flex gap-2 items-center'>

                            <div className='flex items-center gap-2 text-gray-700'>
                                <AddressFormModal
                                    formValues={
                                        restaurant?.address ? { ...restaurant?.address, city: restaurant?.address?.city.id } : undefined
                                    }
                                    ENDPOINT={`${API_ROUTES.restaurant.endpoint}/${restaurant.id}/address`} label="Edit Address"
                                />
                                {formattedAddress}
                            </div>

                        </div>
                        <div className='flex gap-4 items-center'>
                            <span className='text-gray-600'>| </span>
                            <Phone className='size-5' />
                            {restaurant?.phone || ""}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
