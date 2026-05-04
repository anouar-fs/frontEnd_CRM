import type { LeadType } from "../../models/leads";

export class LeadBuilder {
    private _model = {} as LeadType;

    withId(id: number): LeadBuilder {
        this._model.id = id;
        return this;
    }

    withFirstname(firstName: string): LeadBuilder {
        this._model.firstName = firstName;
        return this;
    }

    withLastname(lastName: string): LeadBuilder {
        this._model.lastName = lastName;
        return this;
    }

    withEmail(email: string): LeadBuilder {
        this._model.email = email;
        return this;
    }

    withPhone(phone: string): LeadBuilder {
        this._model.phone = phone;
        return this;
    }

    withSource(source: string): LeadBuilder {
        this._model.source = source;
        return this;
    }

    withReceivedAt(receivedAt: string): LeadBuilder {
        this._model.receivedAt = receivedAt;
        return this;
    }

    withProductInterest(productInterest: string): LeadBuilder {
        this._model.product_interest = productInterest;
        return this;
    }

    withUtmCampaign(utmCampaign: string): LeadBuilder {
        this._model.utmCampaign = utmCampaign;
        return this;
    }

    withWelcomeEmailSent(welcomeEmailSent: boolean): LeadBuilder {
        this._model.welcome_email_sent = welcomeEmailSent;
        return this;
    }

    withWhatsappAnswer(whatsappAnswer: boolean): LeadBuilder {
        this._model.whatsappAnswer = whatsappAnswer;
        return this;
    }

    build(): LeadType {
        return this._model;
    }
}