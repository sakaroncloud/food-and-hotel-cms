import { propertyAmenitiesServerToClientSchema, TPropertyAmenitiesClientForm } from "@/schemas/lodging/property/property-amenities.schema"
import { propertyLocationsSchema, propertyLocationsServerSchema, TPropertyLocationsForm } from "@/schemas/lodging/property/property-locations.schema"
import { propertyRulesServerToClientSchema, TPropertyRulesClientForm } from "@/schemas/lodging/property/property-rules.schema"


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

/**
 *  
 * @param rulesFromServer 
 * 
 * @returns TPropertyRulesClientForm | null
 */
export const parsePRulesFromServerToClient = (rulesFromServer: any): TPropertyRulesClientForm | undefined => {
    const validatedFields = propertyRulesServerToClientSchema.safeParse(rulesFromServer)
    if (validatedFields.success) {
        const data = validatedFields.data
        return data
    }
    return undefined
}


export const parsePLocationsFromServerToClient = (locationsFromServer: any): TPropertyLocationsForm | undefined => {
    const validatedFields = propertyLocationsServerSchema.safeParse(locationsFromServer)
    if (validatedFields.success) {
        return {
            places: validatedFields.data
        }
    }
    return undefined
}

