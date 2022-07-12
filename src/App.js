import { useState, useEffect } from 'react';
import './App.css';
import API_KEY from './keys';
import MovieCard from './MovieCard';
import SearchIcon from './search.svg'
const App = () => {
  const APY_URL = `http://www.omdbapi.com?apikey=${API_KEY}`
  const [movies, setMovies] = useState([])
  const [title, setTitle] = useState('')
 
  const fetchData = async (title) => {
    const response = await fetch(`${APY_URL}&s=${title}`)
    const data = await response.json();
    console.log(data.search);
    setMovies(data.Search);
  }
  useEffect(() => {
    fetchData('all');
  }, []);

  return (
    <div className='app'>
      <div className='header'>
        <h1>Movies</h1>
      </div>
      <div className='search'>
        <input
          placeholder='Search'
          value={title}
          onChange={(seartTerm) => setTitle(seartTerm.target.value)}
        />
        <img src={SearchIcon} alt="search" onClick={() => fetchData(title)} />
      </div>
        {
          movies.length > 0 ?
          <div className='container'>
            {
              movies.map((movie) => <MovieCard movie={movie}/>)
            }
          </div>
          :(
            <div className='empty'>
              <h3>No Movies</h3>
            </div>
          )
        }
    </div>
  );
}

export default App;
