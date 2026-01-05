import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { leadsQueryKey } from "./cacheQueryKeys";
import requester from "../requester/requester";
import { api } from "./config";
import type { LeadType } from "../../models/leads";

export const getLeads = ()=>
    queryOptions({
        queryKey: [leadsQueryKey],
        queryFn: ()=> requester.get<LeadType[]>(api.get.leads()),
        staleTime: Infinity
})

export const usegetLeadsSuspenseQuery = () =>{
    const { data: leadssData } = useSuspenseQuery(getLeads());
    return leadssData;
}
