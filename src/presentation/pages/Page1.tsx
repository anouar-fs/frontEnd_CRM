import { useNavigate } from "react-router-dom";
import { useRefreshMutation } from "../../infrastructure/mutations/useRefreshMutate";
import { useAuthStore } from "../../store/auth.store";
import { PATH_ROUTER } from "../configuration";


const Page1 = () => {
    const accessToken = useAuthStore((state) => state.accessToken)
    const navigate = useNavigate();    
    const { mutateAsync: refrashMutate } = useRefreshMutation();

    const newToken = async ()=>{
        const tmp = await refrashMutate();
        console.log(tmp)
    } 
    
    return (
        <>
            <div>this is the Page1</div>
            <p>this is token {accessToken}</p>
            <button onClick={newToken}>Get Refreshed Token</button>
            <button onClick={()=>navigate(PATH_ROUTER.Users)}>Go to users</button>
        </>
    )
}

export default Page1