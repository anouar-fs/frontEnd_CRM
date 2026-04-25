import type { LeadType } from "../models/leads"

export type LeadFormInputs = {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    product_interest: string
}

export const toLeadFormInputsInput=():LeadFormInputs=>{
    return {firstName:"",lastName:"",email:"",phone:"",product_interest:""}
}

export const toLeadType=(leadInput:LeadFormInputs):LeadType =>{
    return {
        firstName:leadInput.firstName,
        lastName:leadInput.lastName,
        email:leadInput.email,
        phone:leadInput.phone,
        product_interest:leadInput.product_interest,
        receivedAt: new Date().toISOString().replace("T", " ").replace("Z", "000"),
        utmCampaign: "CRM",
        welcome_email_sent: false,
        source: "CRM",
        whatsappAnswer: false
    }
}