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

const basePropertyAmenitiesSchema = z.object({
    general: z.object({
        frontDesk: commonAmenitySchema,
        wifi: commonAmenitySchema,
        gym: commonAmenitySchema,
        laundry: commonAmenitySchema,
        spa: commonAmenitySchema,
        pool: commonAmenitySchema,
        dining: commonAmenitySchema,

    }),
    kidsAndFamily: z.object({
        childFriendly: commonAmenitySchema,
        familyFriendly: commonAmenitySchema,
        babyChange: commonAmenitySchema,

    }),
    accessibility: z.object({
        elevator: commonAmenitySchema,
        carParking: commonAmenitySchema,
        wheelChair: commonAmenitySchema,
        stroller: commonAmenitySchema,
    }),
    safety: z.object({
        securityGuards: commonAmenitySchema,
        smokeAlarm: commonAmenitySchema,
        cctv: commonAmenitySchema,
        emergencyExit: commonAmenitySchema,
    })
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
export const propertyAmenitiesClientSchema = basePropertyAmenitiesSchema.extend({
    general: basePropertyAmenitiesSchema.shape.general.extend({
        others: othersClientSchema, // No transformation needed on the client
    }),
    kidsAndFamily: basePropertyAmenitiesSchema.shape.kidsAndFamily.extend({
        others: othersClientSchema, // No transformation needed on the client
    }),
    accessibility: basePropertyAmenitiesSchema.shape.accessibility.extend({
        others: othersClientSchema, // No transformation needed on the client
    }),
    safety: basePropertyAmenitiesSchema.shape.safety.extend({
        others: othersClientSchema, // No transformation needed on the client
    }),
});

/**
 * This is used to transform the data from server form to - client form
 * This is only used to parse - not to submit
 */
export const propertyAmenitiesS2CSchema = basePropertyAmenitiesSchema.extend({
    general: basePropertyAmenitiesSchema.shape.general.extend({
        others: serverToClientOthers, // No transformation needed on the client
    }),
    kidsAndFamily: basePropertyAmenitiesSchema.shape.kidsAndFamily.extend({
        others: serverToClientOthers, // No transformation needed on the client
    }),
    accessibility: basePropertyAmenitiesSchema.shape.accessibility.extend({
        others: serverToClientOthers, // No transformation needed on the client
    }),
    safety: basePropertyAmenitiesSchema.shape.safety.extend({
        others: serverToClientOthers, // No transformation needed on the client
    }),
});


/**
 * This is used to transform the data from client form to - amenities DTO form
 * This is only used to parse - not to submit
 */
export const propertyAmenitiesC2SSchema = basePropertyAmenitiesSchema.extend({
    general: basePropertyAmenitiesSchema.shape.general.extend({
        others: othersServerSchema, // No transformation needed on the client
    }),
    kidsAndFamily: basePropertyAmenitiesSchema.shape.kidsAndFamily.extend({
        others: othersServerSchema, // No transformation needed on the client
    }),
    accessibility: basePropertyAmenitiesSchema.shape.accessibility.extend({
        others: othersServerSchema, // No transformation needed on the client
    }),
    safety: basePropertyAmenitiesSchema.shape.safety.extend({
        others: othersServerSchema, // No transformation needed on the client
    }),
});

export type TPropertyAmenitiesClientForm = z.infer<typeof propertyAmenitiesClientSchema>;
export type TPropertyAmenities = z.infer<typeof propertyAmenitiesC2SSchema>;


const defaultObject = {
    status: false,
    description: ""
}

export const propertyAmenitiesDefaultValues: TPropertyAmenitiesClientForm = {
    general: {
        frontDesk: defaultObject,
        wifi: defaultObject,
        gym: defaultObject,
        laundry: defaultObject,
        spa: defaultObject,
        pool: defaultObject,

        dining: defaultObject,
        others: []
    },
    kidsAndFamily: {
        childFriendly: defaultObject,
        familyFriendly: defaultObject,
        babyChange: defaultObject,
        others: []
    },
    accessibility: {
        elevator: defaultObject,
        carParking: defaultObject,
        wheelChair: defaultObject,
        stroller: defaultObject,
        others: []
    },
    safety: {
        securityGuards: defaultObject,
        smokeAlarm: defaultObject,
        cctv: defaultObject,
        emergencyExit: defaultObject,
        others: []
    }
}


