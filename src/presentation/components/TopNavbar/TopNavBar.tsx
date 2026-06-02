import { useEffect, useRef, useState } from "react";
import "./TopNavBar.scss";
import { Search } from "lucide-react";
import { usegetSearchQuery } from "../../../infrastructure/queries/Typesense";
import { useDebounce } from "../../../hooks/useDebounce";
import SearchDropdown from "../searchDropdown/SearchDropdown";

export default function TopNavBar() {
    const [isOpen,setIsOpen ] = useState(false);
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query, 300);
    const data  = usegetSearchQuery(debouncedQuery);
    const response = data ? JSON.parse(data) : null;
    const hits = response?response.hits:null;
    const searchRef = useRef<HTMLDivElement>(null);


    useEffect(() => {

        const handleClickOutside = (event: MouseEvent) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

            document.removeEventListener(
                "keydown",
                handleEscape
            );
        };

    }, []);

    return (
        <header className="topnav">
        {/* Left: Brand */}
        <div className="topnav__search" >
            <Search size={18} />
            <input
            type="text"
            placeholder="Search leads, companies, deals..."
            value={query}
            onChange={(e) =>{ 
                setQuery(e.target.value)
                setIsOpen(true)
                }
            }
            onFocus={()=> setIsOpen(true)}
            />
            <div className="shortcut">⌘K</div>
        </div>

        <div className="search-dropdown" ref={searchRef}>
            {isOpen && hits && hits.map((hit:any) => (
                <SearchDropdown 
                    email={hit.document.email}
                    firstName={hit.document.firstName}
                    lastName={hit.document.lastName}
                    id={hit.document.id}
                    phone={hit.document.phone}
                    key={hit.document.id}
                    setOpen={setIsOpen}
                />
            ))}
        </div>
        </header>
    );
}