import { TrendingUp, Bookmark, Gem, type LucideProps } from "lucide-react";

export type AdvisorType = {
id: number;
username: string;
};

export type StatusMeta = {
label: string;
className: string;
};

export type CardMeta = {
title: string;
color1: string;
color2: string;
icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
};

export const STATUS_META: Record<number, StatusMeta> = {
0: { label: "Pending", className: "is-pending" },
1: { label: "Confirmed", className: "is-confirmed" },
2: { label: "Cancelled", className: "is-cancelled" },
3: { label: "Absent", className: "is-absent" },
};

export const CARD_META: Record<string,CardMeta> = {
    "monthlyAppointements":{title : "Monthly Appointements",color1 : "#f9b56a",color2:"#f67da0",icon:TrendingUp },
    "monthlyLeads":{title : "Monthly Leads",color1 : "#75b7f2",color2:"#2f86e6",icon:Bookmark },
    "monthlyAdvisors":{title : "Monthly Advisors",color1 : "#66d8c8",color2:"#39c8b7",icon:Gem },
}