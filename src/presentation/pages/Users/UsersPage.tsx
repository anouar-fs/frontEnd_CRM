import { useNavigate } from "react-router-dom";
import { usegetUsersSuspenseQuery } from "../../../infrastructure/queries/user"
import { PATH_ROUTER } from "../../configuration";

const UsersPage = () => {
    const user = usegetUsersSuspenseQuery();
    const navigate = useNavigate();
    
  return (
    <>
        <p key={user.id}>{user.id} ---- {user.username}</p>;
        <button onClick={()=>{
            navigate(PATH_ROUTER.Page1)
        }}>Go to Page 1</button>
    </>
  );
};

export default UsersPage;
