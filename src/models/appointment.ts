import type { LeadType } from "./leads";
import type { UserType } from "./user";

export type AppointmentType = {
    id: number;
    advisor: UserType;
    lead: LeadType;
    date: string; 
    heureDebut: string;
    statut: number;
    createdAt: string;
};