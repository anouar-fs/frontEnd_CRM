import { queryOptions, useQuery } from "@tanstack/react-query";
import { searchQueryKey } from "./cacheQueryKeys";
import requester from "../requester/requester";
import { api } from "./config";
// import type { SearchResponse } from "../../models/Typesense";

export const getSearch = (query:string)=>
    queryOptions({
        queryKey: [searchQueryKey,query],
        queryFn: async () => {
            return await requester.get<string>(
                api.get.search(query)
        );
        },
        enabled: query.trim() !== "",
        staleTime: Infinity
})

export const usegetSearchQuery = (query:string) =>{
    const { data: queryData } = useQuery(getSearch(query));
    return queryData;
}