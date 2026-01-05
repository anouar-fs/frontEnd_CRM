import { useMutation } from "@tanstack/react-query";
import requester from "../requester/requester";
import { api } from "../queries/config";

export const useLogoutMutation = () =>
useMutation({
    mutationFn: () => requester.post(`${api.post.logout()}`),
});