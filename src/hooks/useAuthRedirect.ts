import { useRouter } from "next/router";
import useUser from "./useUser";

interface UseAuthRedirectParams {
    to?: string,
    whenLoggedIn?: boolean
}

export default function useAuthRedirect({to='/', whenLoggedIn=false}: UseAuthRedirectParams = {to: '/', whenLoggedIn: false}) {
    const router = useRouter(); 
    const {user, loading} = useUser();
    if (!loading)
        if (!!user === whenLoggedIn) router.replace(to)
}