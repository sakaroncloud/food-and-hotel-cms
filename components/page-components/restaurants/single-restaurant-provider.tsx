import React from 'react'
import { RestaurantHeroSection } from './restaurant-overview/restaurant-hero';

type Props = {
    restaurantSlug: string;
    children?: React.ReactNode;
}

const SingleRestaurantProvider = ({ children, restaurantSlug }: Props) => {


    return (
        <div className='bg-slate-50'>
            <RestaurantHeroSection
                restaurantSlug={restaurantSlug}
            />
            <div className='p-2 rounded-xl max-w-[1300px] mx-auto -translate-y-[100px] pt-6'>
                {children}
            </div>
        </div>
    )
}

export default SingleRestaurantProvider