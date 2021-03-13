import React, { useEffect, useState } from 'react';
import './App.css'
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';
import NetflixLoading from './components/img/loading.gif';

export default () => {

  const [MovieList, setMovieList] = useState([]);
  const [FeaturedData, setFeaturedData] = useState(null)
  const [blackHeader, setBlackHeader] = useState(false)

  useEffect(()=>{
    //pegando a lista total
    const loadall = async () => {
    let list = await Tmdb.getHomeList();
    setMovieList(list);

    //pegando o Featured
    let originals = list.filter(i=>i.slug === 'originals');
    let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length -1))
    let chosen = originals[0].items.results[randomChosen];
    let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
    setFeaturedData(chosenInfo);
   }

   loadall();
  }, []);
  
  useEffect(()=>{
   const scrollListener = () => {
     if(window.scrollY > 10) {
       setBlackHeader(true);
     }else {
       setBlackHeader(false);
     }

   }
    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  //Header
  //Destaque
  //As listas
  //Rodapé básico

  return (
    <div className="page">

      <Header black={blackHeader}/>

      {FeaturedData &&
       <FeaturedMovie item={FeaturedData}/>
      }

        <section className="lists">
         {MovieList.map((item, key)=>(
         <MovieRow key={key} title={item.title} items={item.items}/>
       ))}
       </section>

       <footer>
         API do site Themoviedb.org<br></br>
         Direitos de imagem para Netflix.<br></br>
         Feito com <span role="img" aria-label="coração">♥</span> por Lucas Mendonça.
                 
       </footer>

       {MovieList.length <=0 &&
       <div className="loading">
         <img src={NetflixLoading} atl="Carregando" />
       </div>
     }
    </div>
  );
}