import { z } from "zod";

const commonAmenitySchema = z.object({
    status: z.boolean(),
    description: z.string()
})

const othersClientSchema = z.array(
    z.object({
        id: z.string(),
        text: z.string(),
    })
)

const othersServerSchema = othersClientSchema.transform((values) => values.map((value) => value.text));

const baseRoomAmenitiesSchema = z.object({
    general: z.object({
        wifi: commonAmenitySchema,
        phone: commonAmenitySchema,
        ac: commonAmenitySchema,
        television: commonAmenitySchema,
        miniFridge: commonAmenitySchema,
        coffeeMaker: commonAmenitySchema,
    }),
    bathroom: z.object({
        privateBathroom: commonAmenitySchema,
        hotWater: commonAmenitySchema,
        shower: commonAmenitySchema,
        bathtub: commonAmenitySchema,
        hairDryer: commonAmenitySchema,
        toiletries: commonAmenitySchema,

    }),
    bedroom: z.object({
        hangers: commonAmenitySchema,
        extraPillowAndBlanket: commonAmenitySchema,
        iron: commonAmenitySchema,
        laptopDesk: commonAmenitySchema,
        balcony: commonAmenitySchema,
    }),
    safety: z.object({
        smokeAlarm: commonAmenitySchema,
    }),
    propertyId: z.number({
        message: "Property ID must be a number"
    }),
})

const serverToClientOthers = z.array(
    z.string()
).transform((values) => values.map((value, i) => ({
    id: i.toString(),
    text: value,
})))


/**
 * This is used in amenities form in client
 */
export const roomAmenitiesClientSchema = baseRoomAmenitiesSchema.extend({
    general: baseRoomAmenitiesSchema.shape.general.extend({
        others: othersClientSchema, // No transformation needed on the client
    }),
    bathroom: baseRoomAmenitiesSchema.shape.bathroom.extend({
        others: othersClientSchema, // No transformation needed on the client
    }),
    bedroom: baseRoomAmenitiesSchema.shape.bedroom.extend({
        others: othersClientSchema, // No transformation needed on the client
    }),
    safety: baseRoomAmenitiesSchema.shape.safety.extend({
        others: othersClientSchema, // No transformation needed on the client
    }),
});

/**
 * This is used to transform the data from server form to - client form
 * This is only used to parse - not to submit
 */
export const roomAmenitiesS2CSchema = baseRoomAmenitiesSchema.extend({
    general: baseRoomAmenitiesSchema.shape.general.extend({
        others: serverToClientOthers, // No transformation needed on the client
    }),
    bathroom: baseRoomAmenitiesSchema.shape.bathroom.extend({
        others: serverToClientOthers, // No transformation needed on the client
    }),
    bedroom: baseRoomAmenitiesSchema.shape.bedroom.extend({
        others: serverToClientOthers, // No transformation needed on the client
    }),
    safety: baseRoomAmenitiesSchema.shape.safety.extend({
        others: serverToClientOthers, // No transformation needed on the client
    }),
});


/**
 * This is used to transform the data from client form to - amenities DTO form
 * This is only used to parse - not to submit
 */
export const roomAmenitiesC2SSchema = baseRoomAmenitiesSchema.extend({
    general: baseRoomAmenitiesSchema.shape.general.extend({
        others: othersServerSchema, // No transformation needed on the client
    }),
    bathroom: baseRoomAmenitiesSchema.shape.bathroom.extend({
        others: othersServerSchema, // No transformation needed on the client
    }),
    bedroom: baseRoomAmenitiesSchema.shape.bedroom.extend({
        others: othersServerSchema, // No transformation needed on the client
    }),
    safety: baseRoomAmenitiesSchema.shape.safety.extend({
        others: othersServerSchema, // No transformation needed on the client
    }),
});

export type TRoomAmenitiesClientForm = z.infer<typeof roomAmenitiesClientSchema>;
export type TRoomAmenities = Omit<z.infer<typeof roomAmenitiesC2SSchema>, 'propertyId'>;


const defaultObject = {
    status: false,
    description: ""
}

export const roomAmenitiesDefaultValues: Omit<TRoomAmenitiesClientForm, "propertyId"> = {
    general: {
        wifi: defaultObject,
        phone: defaultObject,
        ac: defaultObject,
        television: defaultObject,
        miniFridge: defaultObject,
        coffeeMaker: defaultObject,
        others: []
    },

    bathroom: {
        bathtub: defaultObject,
        hairDryer: defaultObject,
        hotWater: defaultObject,
        privateBathroom: defaultObject,
        shower: defaultObject,
        toiletries: defaultObject,
        others: []
    },

    bedroom: {
        balcony: defaultObject,
        extraPillowAndBlanket: defaultObject,
        hangers: defaultObject,
        iron: defaultObject,
        laptopDesk: defaultObject,
        others: []
    },

    safety: {
        smokeAlarm: defaultObject,
        others: []
    },
}


