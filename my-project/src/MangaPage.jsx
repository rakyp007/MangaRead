import React from 'react';
import { Link } from 'react-router-dom';

function MangaPage({ manga }) {

    

  return (
    <div className="manga-page">
    <Link className='back' to="/">Back</Link>
      <div className="manga-info">
      <img src={manga.image} alt={manga.title} className="manga-image" />
      <div className="name">Название аниме:{manga.ru_name}</div>
      Информация:
      <div>Типы: {manga.type}</div>
      <div className="years">Год: {manga.issue_year}</div>
      <div className="name">Название аниме:{manga.description}</div>
      </div>
    </div>
  );
}

export default MangaPage;
