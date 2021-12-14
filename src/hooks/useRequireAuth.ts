import { useRouter } from "next/router";
import useUser from "./useUser";

export default function useRequireAuth() {
    const router = useRouter();
    const {user, loading} = useUser();

    if (!loading && !user) router.replace('/')
}