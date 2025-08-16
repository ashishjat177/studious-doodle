const Pagination = ({totalPages, currentPage, handlePageClick}) => {
    // get previous three page numbers from current page
    const previousPages = Array.from({length: 3}, (_, index) => currentPage - 1 - index).filter((item) => item > 0).reverse();

    // get next three page numbers from current page
    const nextPages = Array.from({length: 3}, (_, index) => currentPage + index).filter((item) => item <= totalPages);

    const allPages = [...previousPages, ...nextPages];

    return (
        <div className="pagination-container">
            <button className='pagination-btn' onClick={() => handlePageClick(currentPage - 1)}> {'<'} </button>
           { allPages.map((page, index) => (
                <button className={`pagination-btn ${currentPage === page ? 'active' : ''}`} onClick={() => handlePageClick(page)} key={index}>{page}</button>
            ))}
            <button className='pagination-btn' onClick={() => handlePageClick(currentPage + 1)}> {'>'} </button>
        </div>
    )
}

export default Pagination;

