import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { eventQueryKey } from "./cacheQueryKeys";
import requester from "../requester/requester";
import { api } from "./config";
import type { LeadType } from "../../models/leads";
import type { AppointmentType } from "../../models/appointment";

export const getEvents = (date:string)=>
    queryOptions({
        queryKey: [eventQueryKey,date],
        queryFn: ()=> requester.get<AppointmentType[]>(api.get.event(date)),
        staleTime: Infinity
})

export const usegetEventsSuspenseQuery = (date:string) =>{
    const { data: EventData } = useSuspenseQuery(getEvents(date));
    return EventData;
}

export const getLead = (id:number)=>
    queryOptions({
        queryKey: [eventQueryKey,id],
        queryFn: ()=> requester.get<LeadType>(api.get.lead(id)),
        staleTime: Infinity
})

export const usegetLeadSuspenseQuery = (id:number) =>{
    const { data: leadData } = useSuspenseQuery(getLead(id));
    return leadData;
}
