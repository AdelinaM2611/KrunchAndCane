"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureCustomFieldsExist = ensureCustomFieldsExist;
exports.upsertSubscriber = upsertSubscriber;
exports.tagSubscriberByEmail = tagSubscriberByEmail;
const config_1 = require("../lib/config");
const { apiKey, apiBase } = config_1.config.kit;
const baseUrl = apiBase.replace(/\/$/, "");
const headers = {
    "Content-Type": "application/json",
    "X-Kit-Api-Key": apiKey,
};
/**
 * Ensure custom fields exist. GET /v4/custom_fields, then POST any missing by label.
 */
async function ensureCustomFieldsExist(labels) {
    const res = await fetch(`${baseUrl}/v4/custom_fields`, {
        method: "GET",
        headers: { "X-Kit-Api-Key": apiKey },
    });
    if (!res.ok) {
        const body = await res.text();
        throw new Error(`Kit list custom_fields failed: ${res.status} ${body}`);
    }
    const data = (await res.json());
    const existingLabels = new Set((data.custom_fields ?? []).map((f) => f.label));
    for (const label of labels) {
        if (existingLabels.has(label))
            continue;
        const createRes = await fetch(`${baseUrl}/v4/custom_fields`, {
            method: "POST",
            headers,
            body: JSON.stringify({ label }),
        });
        if (!createRes.ok) {
            const body = await createRes.text();
            throw new Error(`Kit create custom_field "${label}" failed: ${createRes.status} ${body}`);
        }
        existingLabels.add(label);
    }
}
/**
 * Upsert subscriber. POST /v4/subscribers (create or update by email).
 */
async function upsertSubscriber(params) {
    const { email, firstName, fields } = params;
    const res = await fetch(`${baseUrl}/v4/subscribers`, {
        method: "POST",
        headers,
        body: JSON.stringify({
            email_address: email,
            first_name: firstName,
            fields,
        }),
    });
    if (!res.ok) {
        const body = await res.text();
        throw new Error(`Kit upsert subscriber failed: ${res.status} ${body}`);
    }
}
/**
 * Tag subscriber by email. Subscriber must exist first. POST /v4/tags/{tagId}/subscribers.
 */
async function tagSubscriberByEmail(tagId, email) {
    const res = await fetch(`${baseUrl}/v4/tags/${tagId}/subscribers`, {
        method: "POST",
        headers,
        body: JSON.stringify({ email_address: email }),
    });
    if (!res.ok) {
        const body = await res.text();
        throw new Error(`Kit tag subscriber failed: ${res.status} ${body}`);
    }
}
//# sourceMappingURL=kit.client.js.map