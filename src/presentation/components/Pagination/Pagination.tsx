
import "./Pagination.scss"
import { ChevronLeft, ChevronRight } from "lucide-react";

type paginationProps = {
    currentPage:number,
    totalPages:number,
    onPageChange: (page: number) => void;
}

const Pagination = ({currentPage,totalPages,onPageChange}:paginationProps) => {
    const rangePagination:number[] = Array.from({ length: 5 }, (_, i) => currentPage - 2 + i);

    return (
        <div className="pagination">
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage-1)}
            >
                <ChevronLeft size={18} />
            </button>
            
            <button
                key={'first'}
                className={1 === currentPage ? "active" : ""}
                onClick={() => onPageChange(1)}
                >
                    1
            </button>
            {rangePagination[0] > 2 && <span className="dots">…</span>}

            {rangePagination.filter((page => page>1 && page<totalPages)).map(page=> 
                (
                    <button
                        key={page}
                        className={page === currentPage ? "active" : ""}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                )
            )}
            {rangePagination[4] < totalPages - 1 && <span className="dots">…</span>}
            {totalPages > 1 && <button
                key={'last'}
                className={totalPages === currentPage ? "active" : ""}
                onClick={() => onPageChange(totalPages)}
                >
                    {totalPages}
            </button>}


            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage+1)}
            >
                <ChevronRight size={18} />
            </button>
        </div>

    )
}

export default Pagination