import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { advisorssQueryKey } from "./cacheQueryKeys";
import requester from "../requester/requester";
import { api } from "./config";
import type { AdvisorType } from "../../helpers/TypesHelpers";

export const getAdvisors = ()=>
    queryOptions({
        queryKey: [advisorssQueryKey],
        queryFn: ()=> requester.get<AdvisorType[]>(api.get.advisors()),
        staleTime: Infinity
})

export const usegetAdvisorsSuspenseQuery = () =>{
    const { data: AdvisorsData } = useSuspenseQuery(getAdvisors());
    return AdvisorsData;
}