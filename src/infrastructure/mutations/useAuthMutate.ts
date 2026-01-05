import { useMutation } from "@tanstack/react-query";
import type { AuthCredentialsType } from "../../models/authCredentials";
import { api } from "../queries/config";
import requester from "../requester/requester";

export const useAuthMutation = () =>
useMutation({
    mutationFn: (authCred: AuthCredentialsType) =>
        requester.post(`${api.post.auth()}`, JSON.stringify(authCred)),
});
