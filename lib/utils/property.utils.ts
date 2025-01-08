import { propertyAmenitiesS2CSchema, TPropertyAmenitiesClientForm } from "@/schemas/lodging/property/property-amenities.schema"
import { propertyLocationsSchema, propertyLocationsServerSchema, TPropertyLocationsForm } from "@/schemas/lodging/property/property-locations.schema"
import { propertyRulesS2CSchema, TPropertyRulesClientForm } from "@/schemas/lodging/property/property-rules.schema"
import { addressFormSchema, TAddressForm } from "@/schemas/schema.address"
import { TAddress } from "../types/address.types"
import { roomBasicFormSchema, TRoomBasicForm } from "@/schemas/lodging/room/room-basic.schema"
import { Property } from "../types/property.types"
import { roomAmenitiesS2CSchema, TRoomAmenities, TRoomAmenitiesClientForm } from "@/schemas/lodging/room/room-amenities.schema"
import { roomRulesS2CSchema, TRoomRulesClientForm } from "@/schemas/lodging/room/room-rules.schema"
import { TAsyncGallery } from "../types/upload.type"
import { propertyGalleryS2CSchema, TPropertyGalleryClientForm } from "@/schemas/lodging/property/property.gallery.schema"


/**
 *  
 * @param amenitiesFromServer 
 * 
 * @returns TPropertyAmenitiesClientForm | null
 */
export const parsePAmenitiesFromS2C = (amenitiesFromServer: any): TPropertyAmenitiesClientForm | undefined => {
    const validatedFields = propertyAmenitiesS2CSchema.safeParse(amenitiesFromServer)
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
export const parsePRulesFromS2C = (rulesFromServer: any): TPropertyRulesClientForm | undefined => {
    const validatedFields = propertyRulesS2CSchema.safeParse(rulesFromServer)
    if (validatedFields.success) {
        const data = validatedFields.data
        return data
    }
    return undefined
}


export const parsePLocationsFromS2C = (locationsFromServer: any): TPropertyLocationsForm | undefined => {
    const validatedFields = propertyLocationsServerSchema.safeParse(locationsFromServer)
    if (validatedFields.success) {
        return {
            places: validatedFields.data
        }
    }
    return undefined
}


export const parseRoomGeneralInfoFromS2C = (roomFromServer: any): TRoomBasicForm | undefined => {
    const validatedFields = roomBasicFormSchema.safeParse(roomFromServer)
    if (validatedFields.success) {
        return validatedFields.data
    }

    return undefined
}

export const parseRoomAmenitiesFromS2C = (roomFromServer?: any): TRoomAmenitiesClientForm | undefined => {
    const validatedFields = roomAmenitiesS2CSchema.safeParse(roomFromServer)
    if (validatedFields.success) {
        return validatedFields.data
    }
    return undefined
}

export const parseRoomRulesFromS2C = (roomFromServer?: any): TRoomRulesClientForm | undefined => {
    console.log(roomFromServer)
    const validatedFields = roomRulesS2CSchema.safeParse(roomFromServer)
    if (validatedFields.success) {
        return validatedFields.data
    }
    return undefined
}

export const parsePropertyGalleryFromS2C = (gallery: any): TPropertyGalleryClientForm | undefined => {
    const validatedFields = propertyGalleryS2CSchema.safeParse({
        galleryIds: gallery
    })

    if (validatedFields.success) {
        return validatedFields.data
    }
    return undefined
}