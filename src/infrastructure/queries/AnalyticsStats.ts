import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { analyticStatsQueryKey } from "./cacheQueryKeys";
import requester from "../requester/requester";
import { api } from "./config";
import type { AppointmentAnalyticsType } from "../../models/appointementAnalytics";

export const getAnalyticsStats = (idAdvisor:number)=>
    queryOptions({
        queryKey: [analyticStatsQueryKey,idAdvisor],
        queryFn: ()=> requester.get<AppointmentAnalyticsType>(api.get.analyticssStats(idAdvisor)),
        staleTime: Infinity
})

export const usegetAnalyticsStatsSuspenseQuery = (idAdvisor:number) =>{
    const { data: AnalyticsStats } = useSuspenseQuery(getAnalyticsStats(idAdvisor));
    return AnalyticsStats;
}


