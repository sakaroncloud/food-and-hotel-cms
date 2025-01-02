import React from 'react'
import { PropertyHeroSection } from './property-overview/property-overview-header';

type Props = {
    propertySlug: string;
    children?: React.ReactNode;
}

const SinglePropertyProvider = ({ children, propertySlug }: Props) => {

    const propertyID = propertySlug.split("--")?.[1]

    return (
        <div className='bg-slate-50'>

            <PropertyHeroSection
                propertyId={propertyID}
            />

            <div className='p-2 rounded-xl max-w-[1300px] mx-auto  pt-6'>
                {children}
            </div>
        </div>
    )
}

export default SinglePropertyProvider