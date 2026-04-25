import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { LeadType } from "../../models/leads";
import { api } from "../queries/config";
import requester from "../requester/requester";
import { leadsQueryKey } from "../queries/cacheQueryKeys";


export const useLeadMutation = ()=>{
    const queryClient = useQueryClient();
    const mutation = useMutation({
    mutationFn: async (lead:LeadType) =>{
        const response = await requester.post(`${api.post.lead()}`, JSON.stringify(lead))
        return Promise.resolve(response);
    },
    onSuccess: ()=>{
        queryClient.invalidateQueries({queryKey : [leadsQueryKey]});
    },
    onError: (error:Error)=>{
        console.log(error.message)
    }
    })

        return { mutation };
    }
