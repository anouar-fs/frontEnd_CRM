import { useMutation } from "@tanstack/react-query";
import type { AuthCredentialsType } from "../../models/authCredentials";
import { api } from "../queries/config";
import requester from "../requester/requester";

export const useAuthMutation = () =>
useMutation<{ accessToken: string }, Error, AuthCredentialsType>({
    mutationFn: async (authCred: AuthCredentialsType) => {
        const res = await requester.post<{ accessToken: string }>(
            api.post.auth(),
            JSON.stringify(authCred)
        );

        if (!res) {
            throw new Error("No response from server");
        }

        return res;
    },
});
