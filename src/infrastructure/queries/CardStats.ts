import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { cardStatsQueryKey } from "./cacheQueryKeys";
import requester from "../requester/requester";
import { api } from "./config";
import type { CardStats } from "../../models/CardStats";

export const getCardStats = ()=>
    queryOptions({
        queryKey: [cardStatsQueryKey],
        queryFn: ()=> requester.get<CardStats>(api.get.cardStats()),
        staleTime: Infinity
})

export const usegetCardsStatsSuspenseQuery = () =>{
    const { data: LeadsStats } = useSuspenseQuery(getCardStats());
    return LeadsStats;
}


