import { z } from "zod";

const commonRuleSchema = z.object({
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

const baseRoomRulesSchema = z.object({
    allowSmoking: commonRuleSchema,
    propertyId: z.number({
        message: "Property ID must be a number"
    }),
})

export const serverToClientOthers = z.array(
    z.string()
).transform((values) => values.map((value, i) => ({
    id: i.toString(),
    text: value,
})))

export const roomRulesC2SSchema = baseRoomRulesSchema.extend({
    others: othersServerSchema, // No transformation needed on the client
});

export const roomRulesClientSchema = baseRoomRulesSchema.extend({
    others: othersClientSchema, // No transformation needed on the client
});

// Use this in form schema
export type TRoomRulesClientForm = z.infer<typeof roomRulesClientSchema>;
export type TRoomRules = Omit<TRoomRulesClientForm, "propertyId">
// Use this to transform the data from server form to - client form
export const roomRulesS2CSchema = baseRoomRulesSchema.extend({
    others: serverToClientOthers,
});

export const roomRulesDefaultValues: Omit<TRoomRulesClientForm, "propertyId"> = {
    allowSmoking: {
        status: false,
        description: ""
    },
    others: [],
}