import { z } from "zod";
export declare const createRsvpSchema: z.ZodObject<{
    eventId: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
    guests: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    name: string;
    eventId: string;
    email: string;
    guests?: number | undefined;
}, {
    name: string;
    eventId: string;
    email: string;
    guests?: number | undefined;
}>;
export type CreateRsvpInput = z.infer<typeof createRsvpSchema>;
//# sourceMappingURL=rsvp.schemas.d.ts.map