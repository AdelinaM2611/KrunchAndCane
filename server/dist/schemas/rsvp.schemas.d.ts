import { z } from "zod";
export declare const createRsvpSchema: z.ZodObject<{
    eventId: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
    phone: z.ZodOptional<z.ZodString>;
    guests: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    name: string;
    eventId: string;
    email: string;
    phone?: string | undefined;
    guests?: number | undefined;
}, {
    name: string;
    eventId: string;
    email: string;
    phone?: string | undefined;
    guests?: number | undefined;
}>;
/** Body schema when eventId comes from URL (POST /api/events/:eventId/rsvps) */
export declare const createRsvpBodySchema: z.ZodObject<Omit<{
    eventId: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
    phone: z.ZodOptional<z.ZodString>;
    guests: z.ZodOptional<z.ZodNumber>;
}, "eventId">, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    phone?: string | undefined;
    guests?: number | undefined;
}, {
    name: string;
    email: string;
    phone?: string | undefined;
    guests?: number | undefined;
}>;
export type CreateRsvpInput = z.infer<typeof createRsvpSchema>;
//# sourceMappingURL=rsvp.schemas.d.ts.map