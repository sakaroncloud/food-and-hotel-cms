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

export const parsePAddressFromS2C = (addressFromServer?: TAddress): TAddressForm | undefined => {
    if (!addressFromServer) return undefined
    return {
        ...addressFromServer,
        city: addressFromServer.city.id
    }

}



// export const getIDsFromPropertyAndRoom = (propertySlug: string, roomSlug: string) => {
//     // Extract Property ID from the property slug
//     const propertyIdMatch = propertySlug.match(/--(\d+)$/);
//     const propertyId = propertyIdMatch ? propertyIdMatch[1] : null;

//     // Extract Room ID and Property ID from the room slug
//     const roomIdMatch = roomSlug.match(/R(\d+)P(\d+)/);
//     const roomId = roomIdMatch ? roomIdMatch[1] : null;
//     const roomPropertyId = roomIdMatch ? roomIdMatch[2] : null;
//     if ((!roomId || !roomPropertyId || !propertyId) || (propertyId !== roomPropertyId)) {
//         return {
//             slugTempered: true,
//         }
//     }
//     return {
//         slugTempered: false,
//         propertyId,
//         roomId,
//     }
// }

// export const getPropertyIDFromPropertySlug = (propertySlug: string) => {
//     const propertyIdMatch = propertySlug.match(/--(\d+)$/);
//     return propertyIdMatch ? propertyIdMatch[1] : null;
// }

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