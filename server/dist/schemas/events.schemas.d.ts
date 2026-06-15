import { z } from "zod";
export declare const createEventSchema: z.ZodObject<{
    name: z.ZodString;
    location: z.ZodString;
    startAt: z.ZodUnion<[z.ZodString, z.ZodDate]>;
    endAt: z.ZodUnion<[z.ZodString, z.ZodDate]>;
    description: z.ZodString;
    imageUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    location: string;
    startAt: string | Date;
    endAt: string | Date;
    description: string;
    imageUrl?: string | null | undefined;
}, {
    name: string;
    location: string;
    startAt: string | Date;
    endAt: string | Date;
    description: string;
    imageUrl?: string | null | undefined;
}>;
export declare const updateEventSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    location: z.ZodOptional<z.ZodString>;
    startAt: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodDate]>>;
    endAt: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodDate]>>;
    description: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodString>;
    imageUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    location?: string | undefined;
    startAt?: string | Date | undefined;
    endAt?: string | Date | undefined;
    description?: string | undefined;
    status?: string | undefined;
    imageUrl?: string | null | undefined;
}, {
    name?: string | undefined;
    location?: string | undefined;
    startAt?: string | Date | undefined;
    endAt?: string | Date | undefined;
    description?: string | undefined;
    status?: string | undefined;
    imageUrl?: string | null | undefined;
}>;
export declare const eventIdParamSchema: z.ZodObject<{
    eventId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    eventId: string;
}, {
    eventId: string;
}>;
export type CreateEventInput = z.infer<typeof createEventSchema>;
export type UpdateEventInput = z.infer<typeof updateEventSchema>;
//# sourceMappingURL=events.schemas.d.ts.map