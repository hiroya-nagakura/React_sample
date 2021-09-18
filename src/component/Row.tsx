import React, { useState, useEffect } from 'react'
import axios from 'plugins/axios'
import 'component/Row.scss'

type Props = {
  title: string,
  fetchUrl: string,
  isLargeRow?: boolean,
};

type Movie = {
  id: string,
  name: string,
  title: string,
  original_name: string,
  poster_path: string,
  backdrop_path: string,
};

export const Row = ({ title, fetchUrl, isLargeRow }: Props) => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <div className="Row">
      <h2>{title}</h2>
      <div className="Row-posters">
        {movies.map((movie, i) => (
          <img
            key={movie.id}
            className={`Row-poster ${isLargeRow && "Row-poster-large"}`}
            src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
            alt={movie.name}
          />
        ))}
      </div>
    </div>
  )
}