import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { appointementStatsQueryKey } from "./cacheQueryKeys";
import requester from "../requester/requester";
import { api } from "./config";
import type { AppointmentStatsType } from "../../models/appointementStats";

export const getAppointementStats = ()=>
    queryOptions({
        queryKey: [appointementStatsQueryKey],
        queryFn: ()=> requester.get<AppointmentStatsType[]>(api.get.appointementStats()),
        staleTime: Infinity
})

export const usegetAppointementStatsSuspenseQuery = () =>{
    const { data: AppointementStats } = useSuspenseQuery(getAppointementStats());
    return AppointementStats;
}


