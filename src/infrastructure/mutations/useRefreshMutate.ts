import { useMutation } from "@tanstack/react-query";
import requester from "../requester/requester";
import { api } from "../queries/config";

export const useRefreshMutation = () =>
useMutation({
    mutationFn: () =>
        requester.post(`${api.post.refresh()}`),
});