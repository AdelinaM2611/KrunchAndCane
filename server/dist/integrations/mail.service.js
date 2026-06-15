"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailService = void 0;
exports.sendRsvpConfirmation = sendRsvpConfirmation;
exports.sendEventCancellation = sendEventCancellation;

const mail_1 = __importDefault(require("@sendgrid/mail"));
const config_1 = require("../lib/config");
if (config_1.config.sendgrid.apiKey) {
    mail_1.default.setApiKey(config_1.config.sendgrid.apiKey);
}
function formatEventDate(d) {
    return d.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}
function formatEventTime(startAt, endAt) {
    const start = startAt.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
    const end = endAt.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
    return `${start}–${end}`;
}
/**
 * Send RSVP confirmation email via SendGrid.
 * Skips sending if SENDGRID_API_KEY or SENDGRID_FROM_EMAIL is not set.
 */
async function sendRsvpConfirmation(params) {
    const { apiKey, fromEmail, fromName } = config_1.config.sendgrid;
    if (!apiKey || !fromEmail)
        return;
    const { email, firstName, event } = params;
    const startAt = event.startAt instanceof Date ? event.startAt : new Date(event.startAt);
    const endAt = event.endAt instanceof Date ? event.endAt : new Date(event.endAt);
    const eventDate = formatEventDate(startAt);
    const eventTime = formatEventTime(startAt, endAt);
    const subject = `You're confirmed for ${event.name} – Krunch & Cane`;
    const text = [
        `Hi ${firstName},`,
        ``,
        `You're confirmed for ${event.name}.`,
        ``,
        `Date: ${eventDate}`,
        `Time: ${eventTime}`,
        `Location: ${event.location}`,
        ``,
        `We look forward to seeing you!`,
        ``,
        `Krunch & Cane`,
    ].join("\n");
    const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: system-ui, sans-serif; line-height: 1.6; color: #1f2937; max-width: 480px;">
  <p>Hi ${firstName},</p>
  <p>You're confirmed for <strong>${event.name}</strong>.</p>
  <table style="border-collapse: collapse; margin: 1rem 0;">
    <tr><td style="padding: 0.25rem 0.5rem 0.25rem 0;"><strong>Date</strong></td><td style="padding: 0.25rem 0;">${eventDate}</td></tr>
    <tr><td style="padding: 0.25rem 0.5rem 0.25rem 0;"><strong>Time</strong></td><td style="padding: 0.25rem 0;">${eventTime}</td></tr>
    <tr><td style="padding: 0.25rem 0.5rem 0.25rem 0;"><strong>Location</strong></td><td style="padding: 0.25rem 0;">${event.location}</td></tr>
  </table>
  <p>We look forward to seeing you!</p>
  <p style="color: #6b7280;">Krunch &amp; Cane</p>
</body>
</html>
`.trim();
    await mail_1.default.send({
        to: email,
        from: { email: fromEmail, name: fromName },
        subject,
        text,
        html,
    });
}
/**
 * Send event cancellation email via SendGrid.
 * Skips if SendGrid is not configured. Uses placeholder body text.
 */
async function sendEventCancellation(params) {
    const { apiKey, fromEmail, fromName } = config_1.config.sendgrid;
    if (!apiKey || !fromEmail)
        return;
    const { email, firstName, event } = params;
    const startAt = event.startAt instanceof Date ? event.startAt : new Date(event.startAt);
    const eventDate = formatEventDate(startAt);
    const subject = `Event cancelled: ${event.name} – Krunch & Cane`;
    const text = [
        `Hi ${firstName},`,
        ``,
        `We're sorry to let you know that the following event has been cancelled:`,
        ``,
        `Event: ${event.name}`,
        `Date: ${eventDate}`,
        `Location: ${event.location}`,
        ``,
        `[Placeholder: We hope to see you at a future event. For any questions, please reply to this email or contact us at Info@krunchandcane.co.uk.]`,
        ``,
        `Krunch & Cane`,
    ].join("\n");
    const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: system-ui, sans-serif; line-height: 1.6; color: #1f2937; max-width: 480px;">
  <p>Hi ${firstName},</p>
  <p>We're sorry to let you know that the following event has been <strong>cancelled</strong>:</p>
  <table style="border-collapse: collapse; margin: 1rem 0;">
    <tr><td style="padding: 0.25rem 0.5rem 0.25rem 0;"><strong>Event</strong></td><td style="padding: 0.25rem 0;">${event.name}</td></tr>
    <tr><td style="padding: 0.25rem 0.5rem 0.25rem 0;"><strong>Date</strong></td><td style="padding: 0.25rem 0;">${eventDate}</td></tr>
    <tr><td style="padding: 0.25rem 0.5rem 0.25rem 0;"><strong>Location</strong></td><td style="padding: 0.25rem 0;">${event.location}</td></tr>
  </table>
  <p style="color: #6b7280;">[Placeholder: We hope to see you at a future event. For any questions, please reply to this email or contact us at Info@krunchandcane.co.uk.]</p>
  <p style="color: #6b7280;">Krunch &amp; Cane</p>
</body>
</html>
`.trim();
    await mail_1.default.send({
        to: email,
        from: { email: fromEmail, name: fromName },
        subject,
        text,
        html,
    });
}
exports.mailService = {
    sendRsvpConfirmation,
    sendEventCancellation,
};
//# sourceMappingURL=mail.service.js.map