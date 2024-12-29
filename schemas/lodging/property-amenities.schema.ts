import { z } from "zod";

const commonAmenitySchema = z.object({
    status: z.boolean(),
    description: z.string().optional().nullable()
})

const othersClientSchema = z.array(
    z.object({
        id: z.string(),
        text: z.string(),
    })
).transform((values) => values.map((value) => value.text));

const othersServerSchema = z.array(
    z.string()
);

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

export const propertyAmenitiesServerSchema = basePropertyAmenitiesSchema.extend({
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
export type TPropertyAmenitiesServerForm = z.infer<typeof propertyAmenitiesServerSchema>;


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


