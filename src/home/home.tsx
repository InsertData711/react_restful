import { useEffect, useRef, useState } from "react";
import axios from "axios";

// css
import "./home.css";
const Home = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const pageNumber = useRef(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://yts.mx/api/v2/list_movies.json?page=${pageNumber.current}`
        );
        pageNumber.current = response.data.data.page_number;
        setMovies(response.data.data.movies);
        setLoading(false);
      } catch (error) {
        console.error(`Error fetching data: ${error}`);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {movies ? (
        <>
          {Object.keys(movies).map((_, key) => (
            <div className="movie" key={key}>
              <div className="movie__title">{movies[key].title}</div>
              <div className="movie__description">
                {movies[key].description_full.slice(1, 100)}
              </div>
            </div>
          ))}
        </>
      ) : (
        <div>No data available</div>
      )}
    </>
  );
};

export default Home;
