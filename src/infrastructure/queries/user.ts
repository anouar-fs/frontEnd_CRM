import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { usersQueryKey } from "./cacheQueryKeys";
import requester from "../requester/requester";
import { api } from "./config";
import type { UserType } from "../../models/user";

export const getUsers = ()=>
    queryOptions({
        queryKey: [usersQueryKey],
        queryFn: ()=> requester.get<UserType>(api.get.users()),
        staleTime: Infinity
})

export const usegetUsersSuspenseQuery = () =>{
    const { data: usersData } = useSuspenseQuery(getUsers());
    return usersData;
}
