import { useMutation, useQueryClient } from "@tanstack/react-query"
import requester from "../requester/requester";
import { api } from "../queries/config";
import { leadsQueryKey } from "../queries/cacheQueryKeys";

export const useLeadDeleteMutation = ()=>{
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (id:number) =>{
            const response = await requester.delete(`${api.delete.lead(id)}`);
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