import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from './topMangaSlice';
import './App.css' 
function Pagination({ itemsPerPage, totalItems }) {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.topManga.currentPage);

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
  };

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((pageNumber) => (
          <li
            key={pageNumber}
            className={`page-item ${pageNumber === currentPage ? 'active' : ''}`}
          >
            <button
              className="page-link"
              onClick={() => handleClick(pageNumber)}
              style={{
                backgroundColor: pageNumber === currentPage ? '#007bff' : 'white',
                color: pageNumber === currentPage ? 'white' : 'black',
              }}
            >
              {pageNumber}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}


export default Pagination;

