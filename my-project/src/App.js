import "./App.css"
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopMangaAsync } from './topMangaSlice';
import MangaPage from './MangaPage';

function App() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const mangaList = useSelector((state) => state.topManga.mangaList);
  const status = useSelector((state) => state.topManga.status);
  const error = useSelector((state) => state.topManga.error);

  useEffect(() => {
    dispatch(fetchTopMangaAsync());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = mangaList.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(mangaList.length / itemsPerPage);

  const goToPrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Router>
      <div className="container">
        <h1 className="title">Top Manga</h1>
        <Routes>
          <Route path="/" element={
            <>
            <div className="manga-list">
              {currentItems.map((manga) => (

                <Link key={manga.id} to={`/manga/${manga.id}`} className="manga-item">
                     <img src={manga.image} alt={manga.title} className="image" />
                  <h3 className="manga-years">Год: {manga.issue_year}</h3>
                   <div className="manga-name">Название аниме:{manga.ru_name}</div>
                </Link>  
              ))}
              
            </div>
              <div className="pagination">
                <a
                  className="pagination-btn"
                  onClick={goToPrevPage}
                  disabled={currentPage === 1}>
                  <IoIosArrowBack  size={24} color="#A5A5A5"/>
                </a>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                  <button
                    key={pageNumber}
                    className={`one ${pageNumber === currentPage ? 'active' : ''}`}
                    onClick={() => goToPage(pageNumber)}>
                    {pageNumber}
                  </button>
                ))}
                <a
                  className="pagination-btn"
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}>
                  <IoIosArrowForward size={24} color="#A5A5A5"/>
                </a>
              </div>
            </>
          } />
          
        </Routes>
        <Routes>
          {currentItems.map((manga) => (
            <Route key={manga.id} path={`/manga/${manga.id}`} element={<MangaPage manga={manga} />} />
          ))}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
