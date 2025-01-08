import { TAddressForm } from "@/schemas/schema.address"
import { TAddress } from "../types/address.types"

export const parseAddressFromS2C = (addressFromServer?: TAddress): TAddressForm | undefined => {
    if (!addressFromServer) return undefined
    return {
        ...addressFromServer,
        city: addressFromServer.city.id
    }
}
