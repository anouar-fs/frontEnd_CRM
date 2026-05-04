import type { AdvisorType } from "../../models/Data/Advisor/AdvisorType";


export class AdvisorBuilder {
    private _model = {} as AdvisorType;

    withId(id: number): AdvisorBuilder {
        this._model.id = id;
        return this;
    }

    withFirstname(firstname: string): AdvisorBuilder {
        this._model.firstname = firstname;
        return this;
    }

    withLastname(lastname: string): AdvisorBuilder {
        this._model.lastname = lastname;
        return this;
    }

    withEmail(email: string): AdvisorBuilder {
        this._model.email = email;
        return this;
    }

    withPhoneNumber(phoneNumber: string): AdvisorBuilder {
        this._model.phoneNumber = phoneNumber;
        return this;
    }

    withRole(role: number): AdvisorBuilder {
        this._model.role = role;
        return this;
    }

    build(): AdvisorType {
        return this._model;
    }
}