/**
 * Ensure custom fields exist. GET /v4/custom_fields, then POST any missing by label.
 */
export declare function ensureCustomFieldsExist(labels: string[]): Promise<void>;
export type UpsertSubscriberParams = {
    email: string;
    firstName: string;
    fields: Record<string, string>;
};
/**
 * Upsert subscriber. POST /v4/subscribers (create or update by email).
 */
export declare function upsertSubscriber(params: UpsertSubscriberParams): Promise<void>;
/**
 * Tag subscriber by email. Subscriber must exist first. POST /v4/tags/{tagId}/subscribers.
 */
export declare function tagSubscriberByEmail(tagId: string, email: string): Promise<void>;
//# sourceMappingURL=kit.client.d.ts.map