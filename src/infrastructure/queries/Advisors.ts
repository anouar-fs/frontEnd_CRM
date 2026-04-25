import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { advisorssQueryKey } from "./cacheQueryKeys";
import requester from "../requester/requester";
import type { AdvisorTypeData } from "../../models/Data/Advisor/AdvisorType";
import { api } from "./config";

export const getAdvisors = ()=>
    queryOptions({
        queryKey: [advisorssQueryKey],
        queryFn: ()=> requester.get<AdvisorTypeData>(api.get.advisors()),
        staleTime: Infinity
})

export const usegetAdvisorsSuspenseQuery = () =>{
    const { data: AdvisorsData } = useSuspenseQuery(getAdvisors());
    return AdvisorsData;
}