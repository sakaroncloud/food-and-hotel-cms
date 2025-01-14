import { propertyAmenitiesServer2ClientSchema, TPropertyAmenitiesClientForm } from "@/schemas/lodging/property/property-amenities.schema"
import { propertyLocationsSchema, propertyLocationsServerSchema, TPropertyLocationsForm } from "@/schemas/lodging/property/property-locations.schema"
import { propertyRulesServer2ClientSchema, TPropertyRulesClientForm } from "@/schemas/lodging/property/property-rules.schema"
import { addressFormSchema, TAddressForm } from "@/schemas/schema.address"
import { TAddress } from "../types/address.types"
import { roomBasicFormSchema, TRoomBasicForm } from "@/schemas/lodging/room/room-basic.schema"
import { Property } from "../types/property.types"
import { roomAmenitiesServer2ClientSchema, TRoomAmenities, TRoomAmenitiesClientForm } from "@/schemas/lodging/room/room-amenities.schema"
import { roomRulesServer2ClientSchema, TRoomRulesClientForm } from "@/schemas/lodging/room/room-rules.schema"
import { TAsyncGallery } from "../types/upload.type"
import { propertyGalleryServer2ClientSchema, TPropertyGalleryClientForm } from "@/schemas/lodging/property/property.gallery.schema"


/**
 *  
 * @param amenitiesFromServer 
 * 
 * @returns TPropertyAmenitiesClientForm | null
 */
export const parsePAmenitiesFromServer2Client = (amenitiesFromServer: any): TPropertyAmenitiesClientForm | undefined => {
    const validatedFields = propertyAmenitiesServer2ClientSchema.safeParse(amenitiesFromServer)
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
export const parsePRulesFromServer2Client = (rulesFromServer: any): TPropertyRulesClientForm | undefined => {
    const validatedFields = propertyRulesServer2ClientSchema.safeParse(rulesFromServer)
    if (validatedFields.success) {
        const data = validatedFields.data
        return data
    }
    return undefined
}


export const parsePLocationsFromServer2Client = (locationsFromServer: any): TPropertyLocationsForm | undefined => {
    const validatedFields = propertyLocationsServerSchema.safeParse(locationsFromServer)
    if (validatedFields.success) {
        return {
            places: validatedFields.data
        }
    }
    return undefined
}

export const parsePAddressFromServer2Client = (addressFromServer?: TAddress): TAddressForm | undefined => {
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

export const parseRoomGeneralInfoFromServer2Client = (roomFromServer: any): TRoomBasicForm | undefined => {
    const validatedFields = roomBasicFormSchema.safeParse(roomFromServer)
    if (validatedFields.success) {
        return validatedFields.data
    }

    return undefined
}

export const parseRoomAmenitiesFromServer2Client = (roomFromServer?: any): TRoomAmenitiesClientForm | undefined => {
    const validatedFields = roomAmenitiesServer2ClientSchema.safeParse(roomFromServer)
    if (validatedFields.success) {
        return validatedFields.data
    }
    return undefined
}

export const parseRoomRulesFromServer2Client = (roomFromServer?: any): TRoomRulesClientForm | undefined => {
    console.log(roomFromServer)
    const validatedFields = roomRulesServer2ClientSchema.safeParse(roomFromServer)
    if (validatedFields.success) {
        return validatedFields.data
    }
    return undefined
}

export const parsePropertyGalleryFromServer2Client = (gallery: any): TPropertyGalleryClientForm | undefined => {
    const validatedFields = propertyGalleryServer2ClientSchema.safeParse({
        galleryIds: gallery
    })

    if (validatedFields.success) {
        return validatedFields.data
    }
    return undefined
}