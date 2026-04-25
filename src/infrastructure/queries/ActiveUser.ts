import requester from "../requester/requester";
import type { AdvisorType } from "../../models/Data/Advisor/AdvisorType";
import { api } from "./config";

// export const getActivUser = ()=>
//     queryOptions({
//         queryKey: [activUserQueryKey],
//         queryFn: ()=> requester.get<AdvisorType>(api.get.ActivUser()),
//         staleTime: Infinity
// })

export const getActivUser = async () =>{
    const activUser = await requester.get<AdvisorType>(api.get.ActivUser())
    return activUser;
}