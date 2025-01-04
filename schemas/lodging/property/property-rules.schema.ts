import { z } from "zod"

type baseType = {
    status: boolean,
    description: string
}



const othersClientSchema = z.array(
    z.object({
        id: z.string(),
        text: z.string(),
    })
)

const serverToClientOthers = z.array(
    z.string()
).transform((values) => values.map((value, i) => ({
    id: i.toString(),
    text: value,
})))

const clientToServerOthers = z.array(
    z.object({
        id: z.string(),
        text: z.string(),
    })
).transform((values) => values.map((value) => value.text));

const baseSchemaObject = z.object({
    status: z.boolean(),
    description: z.string()
})

const basePropertyRulesSchema = z.object({
    petsAllowed: baseSchemaObject,
    smokingAllowed: baseSchemaObject,
    unmarriedCoupleAllowed: baseSchemaObject,
    outsideFoodAllowed: baseSchemaObject,
    lateNightRestriction: baseSchemaObject,
})

/**
 * This is used in amenities form in client
 */
export const propertyRulesClientSchema = basePropertyRulesSchema.extend({
    others: othersClientSchema
})

/**
 * This is used to transform the data from client form to - amenities DTO form
 * This is only used to parse - not to submit
 */
export const propertyRulesC2SSchema = basePropertyRulesSchema.extend({
    others: clientToServerOthers
})

/**
 * This is used to transform the data from server form to - client form
 * This is only used to parse - not to submit
 */
export const propertyRulesS2CSchema = basePropertyRulesSchema.extend({
    others: serverToClientOthers
})

export type TPropertyRulesClientForm = z.infer<typeof propertyRulesClientSchema>;

export const propertyRulesDefaultValues: TPropertyRulesClientForm = {
    petsAllowed: {
        status: false,
        description: "one"
    },
    smokingAllowed: {
        status: false,
        description: "two"
    },
    unmarriedCoupleAllowed: {
        status: true,
        description: "three"
    },
    outsideFoodAllowed: {
        status: false,
        description: "four"
    },
    lateNightRestriction: {
        status: false,
        description: "five"
    },
    others: [{
        id: "1",
        text: "six"
    }]
}
export type TPropertyRules = z.infer<typeof propertyRulesC2SSchema>;
