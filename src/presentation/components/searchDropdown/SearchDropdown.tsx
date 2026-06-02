import { useNavigate } from "react-router-dom";
import "./SearchDropdown.scss";
import type { Dispatch, SetStateAction } from "react";

type LeadOptionProps = {
    email: string
    firstName: string
    id: string
    lastName: string
    phone: string
    setOpen: Dispatch<SetStateAction<boolean>>
}

export default function SearchDropdown({ id,firstName,lastName,phone,email,setOpen }: LeadOptionProps) {
    const navigate = useNavigate();
    const handleClick = ()=>{
        navigate('/lead/'+id)
        setOpen(false)
    }
    return (
        
        <div className="search-dropdown__item" key={id} onClick={()=> handleClick()}>
            <div className="title">
                <span>#{id}</span>
                <span>{firstName} {lastName}</span>
                <span>{phone}</span>
                <span>{email}</span>
            </div>
        </div>
    );
}