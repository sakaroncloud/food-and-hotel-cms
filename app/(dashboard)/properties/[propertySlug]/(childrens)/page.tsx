import { PropertyHeroSection } from "@/components/page-components/properties/property-overview/property-hero-section"
import { SinglePropertyBody } from "@/components/page-components/properties/property-overview/single-property-body"

type Props = {
    params: Promise<{ propertySlug: string }>
}
const SinglePropertyPage = async ({ params }: Props) => {
    const propertySlug = (await params).propertySlug
    const propertyID = propertySlug.split("--")?.[1]
    return (
        <div className='bg-slate-50'>
            <PropertyHeroSection
                propertyId={propertyID}
            />
            <div className='p-2 rounded-xl max-w-[1300px] mx-auto  pt-6'>
                <SinglePropertyBody propertyId={propertyID} />
            </div>
        </div>
    )
}

export default SinglePropertyPage