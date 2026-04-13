import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { leadsStatsQueryKey } from "./cacheQueryKeys";
import requester from "../requester/requester";
import { api } from "./config";
import type { LeadsStatsType } from "../../models/LeadsStat";

export const getLeadsStats = ()=>
    queryOptions({
        queryKey: [leadsStatsQueryKey],
        queryFn: ()=> requester.get<LeadsStatsType>(api.get.leadsStats()),
        staleTime: Infinity
})

export const usegetLeadsStatsSuspenseQuery = () =>{
    const { data: LeadsStats } = useSuspenseQuery(getLeadsStats());
    return LeadsStats;
}


