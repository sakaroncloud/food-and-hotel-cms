import { roomBasicFormSchema, TRoomBasicForm } from "@/schemas/lodging/room/room-basic.schema";
import { SubmitHandler } from "../global.action";
import { API_ROUTES } from "@/lib/routes";
import { roomAmenitiesClientSchema, roomAmenitiesClientToServerSchema, TRoomAmenitiesClientForm } from "@/schemas/lodging/room/room-amenities.schema";
import { roomRulesClientToServerSchema, TRoomRulesClientForm } from "@/schemas/lodging/room/room-rules.schema";

export async function submitRoom(formData: TRoomBasicForm, param?: string) {
    const validationFields = roomBasicFormSchema.safeParse(formData)
    if (!validationFields.success) {
        return {
            message: "Data tempered",
        };
    }

    return await SubmitHandler({
        ENDPOINT: API_ROUTES.room.endpoint,
        METHOD: param ? "PATCH" : "POST",
        DATA: validationFields.data,
        PARAM: param
    })
}

export async function updateRoomAmenities(formData: TRoomAmenitiesClientForm, param: string | number) {
    console.log(formData)
    const validationFields = roomAmenitiesClientToServerSchema.safeParse(formData)
    if (!validationFields.success) {
        return {
            message: "Data tempered",
        };
    }

    console.log(API_ROUTES.room.endpoint + "/" + param + "/amenities")

    return await SubmitHandler({
        ENDPOINT: API_ROUTES.room.endpoint + "/" + param + "/amenities",
        METHOD: "PATCH",
        DATA: validationFields.data,
    })
}

export async function updateRoomRules(formData: TRoomRulesClientForm, param: string | number) {
    const validationFields = roomRulesClientToServerSchema.safeParse(formData)
    if (!validationFields.success) {
        return {
            message: "Data tempered",
        };
    }

    console.log(validationFields.data)
    return await SubmitHandler({
        ENDPOINT: API_ROUTES.room.endpoint + "/" + param + "/rules",
        METHOD: "PATCH",
        DATA: validationFields.data,
    })
}