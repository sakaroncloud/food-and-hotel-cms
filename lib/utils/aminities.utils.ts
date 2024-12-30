import { propertyAmenitiesServerToClientSchema, TPropertyAmenitiesClientForm } from "@/schemas/lodging/property-amenities.schema"


/**
 *  
 * @param amenitiesFromServer 
 * 
 * @returns TPropertyAmenitiesClientForm | null
 */
export const parsePAmenitiesFromServerToClient = (amenitiesFromServer: any): TPropertyAmenitiesClientForm | undefined => {
    const validatedFields = propertyAmenitiesServerToClientSchema.safeParse(amenitiesFromServer)
    if (validatedFields.success) {
        const data = validatedFields.data
        return data
    }
    return undefined
}

