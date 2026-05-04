
import type { AdvisorType } from "./Data/Advisor/AdvisorType";
import type { LeadType } from "./leads";

export type AppointmentType = {
    id: number;
    advisor: AdvisorType;
    lead: LeadType;
    date: string; 
    heureDebut: string;
    statut: number;
    createdAt: string;
};