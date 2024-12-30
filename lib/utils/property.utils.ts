import { propertyAmenitiesServerToClientSchema, TPropertyAmenitiesClientForm } from "@/schemas/lodging/property-amenities.schema"
import { propertyRulesServerToClientSchema, TPropertyRulesClientForm } from "@/schemas/lodging/property-rules.schema"


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


