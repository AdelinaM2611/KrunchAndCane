type EventForRsvp = {
    name: string;
    location: string;
    startAt: Date;
    endAt: Date;
};
/**
 * Send RSVP confirmation email via SendGrid.
 * Skips sending if SENDGRID_API_KEY or SENDGRID_FROM_EMAIL is not set.
 */
export declare function sendRsvpConfirmation(params: {
    email: string;
    firstName: string;
    event: EventForRsvp;
}): Promise<void>;
export declare const mailService: {
    sendRsvpConfirmation: typeof sendRsvpConfirmation;
};
export {};
//# sourceMappingURL=mail.service.d.ts.map