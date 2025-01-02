import { getData } from '@/app/data';
import FallbackImage from '@/components/fallback-image';
import { BACKEND_URL } from '@/lib/constants';
import { API_ROUTES } from '@/lib/routes';
import { Property } from '@/lib/types/property.types';
import { ResponseWithNoMeta } from '@/lib/types/response.type';
import { Phone } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { PiEnvelope } from 'react-icons/pi';

type Props = {
    propertyId: string;
}

export const PropertyHeroSection = async ({ propertyId }: Props) => {
    const result = await getData<ResponseWithNoMeta<Property.TProperty>>({
        endPoint: API_ROUTES.property.endpoint,
        param: propertyId,
        tags: ["proeprty", propertyId]
    });

    const property = result?.data

    if (!property) return null

    const formattedAddress = [
        property?.address?.streetOne,
        property?.address?.area,
        property?.address?.city?.name,
    ]
        .filter(Boolean) // Removes undefined or empty values

    const galleries = result?.data?.galleries
    console.log(formattedAddress)
    return (
        <div>
            <div className='h-[220px] bg-slate-100 shadow-sm rounded-xl relative flex gap-6 flex-wrap'>
                {galleries?.map((gallery) => (
                    <div key={gallery.id} className='w-[300px] h-[200px] bg-slate-100 shadow-sm rounded-xl relative'>
                        <FallbackImage type='rectangle' height={220} width={300} src={BACKEND_URL + "/" + gallery.url} alt={"image"} className='object-cover w-full h-full' />
                    </div>
                ))}
            </div>

            <div className='p-2 rounded-xl max-w-[1300px] mx-auto  flex items-end gap-4'>
                <div className='flex-1 h-1/2 p-6 gap-2 translate-y-2 flex items-center justify-between shadow-md bg-white rounded-xl'>
                    <div className='flex gap-2 flex-col'>
                        <Link href={`/restaurants/${property.slug}`} className='text-xl font-bold text-gray-700'>
                            {property.name}
                        </Link>
                        <div className='flex items-center gap-2 text-gray-700'>
                            <PiEnvelope className='' />
                            {property.email}
                        </div>
                    </div>

                    <div className='flex flex-1 gap-4 items-center justify-end text-gray-700'>
                        <div className='flex gap-2 items-center'>

                            <div className='flex items-center gap-2 text-gray-700'>
                                {formattedAddress.join(", ")}
                            </div>

                        </div>
                        <div className='flex gap-4 items-center'>
                            <span className='text-gray-600'>| </span>
                            <Phone className='size-5' />
                            {property?.phone || ""}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
