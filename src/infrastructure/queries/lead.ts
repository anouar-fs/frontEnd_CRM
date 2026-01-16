import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { leadsQueryKey } from "./cacheQueryKeys";
import requester from "../requester/requester";
import { api } from "./config";
import type { LeadData } from "../../models/Data/Lead/LeadData";

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
