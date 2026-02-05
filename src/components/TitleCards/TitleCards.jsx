import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import { Link } from 'react-router-dom';

const TitleCards = ({title,category}) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNDU4NzMwMjk0OGNmMmUyMzdkYjUyYjBkYmE0YjM5ZCIsIm5iZiI6MTczNzExODA5My44NzUsInN1YiI6IjY3OGE1MThkOTNmNzQyY2MyOWFkMTE2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.k6WFrGCB0VrGg_HoKtgEB4c-1Hcrr4vLa29zSyvkOsc'
    }
  };

    const [apiData,setApiData] = useState([]);
    const cardsRef = useRef();

    const handleWheel = (e) =>{
      e.preventDefault();
      cardsRef.current.scrollLeft += e.deltaY;
    }
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${category ? category : 'now_playing'}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));

    cardsRef.current.addEventListener('wheel',handleWheel);
  },[])
  return (
    <div className='title-cards'>
      <h2>{title? title : 'Popular on Netflix'}</h2>
      <div className='card-list' ref={cardsRef}>
        {
          apiData.map((card,index)=>{
            return (
              <Link to={`/player/${card.id}`} className='card' key={index}>
                <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt="" />
                <p>{card.original_title}</p>
              </Link>
            )
          })
        }
      </div>
    </div>
  )
}

export default TitleCards
