import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { leadQueryKey, leadsQueryKey } from "./cacheQueryKeys";
import requester from "../requester/requester";
import { api } from "./config";
import type { LeadData } from "../../models/Data/Lead/LeadData";
import type { LeadType } from "../../models/leads";

export const getLeads = (page:number,pageSize:number)=>
    queryOptions({
        queryKey: [leadsQueryKey,page,pageSize],
        queryFn: ()=> requester.get<LeadData>(api.get.leads(page,pageSize)),
        staleTime: Infinity
})

export const usegetLeadsSuspenseQuery = (page:number,pageSize:number) =>{
    const { data: leadssData } = useSuspenseQuery(getLeads(page,pageSize));
    return leadssData;
}

export const getLead = (id:number)=>
    queryOptions({
        queryKey: [leadQueryKey,id],
        queryFn: ()=> requester.get<LeadType>(api.get.lead(id)),
        staleTime: Infinity
})

export const usegetLeadSuspenseQuery = (id:number) =>{
    const { data: leadData } = useSuspenseQuery(getLead(id));
    return leadData;
}

