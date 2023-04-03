import { api, RouterOutputs } from "@/utils/api";

export const useUser = () => {
    if (typeof window == 'undefined') return;
    type TYPE = RouterOutputs["auth"]["getUserByToken"]["user"]

    let user: TYPE | null = null;
    const token = localStorage.getItem('token');
    if (!token) return;

    user = api.auth.getUserByToken.useQuery().data?.user ?? null;

    user = user as TYPE | null
    return user;

}