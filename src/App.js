import React, { useEffect,useState } from 'react';
import Tmbd from './Tmdb';
import MovieRow from './componentes/MovieRow';
import './App.css';
import FeatureMovie from './componentes/FeatureMovie';
import Topo from './componentes/Topo/Topo'
export default()=> {
  const [movieList,setMovieList] = useState([]);
  const [featureData, setfeatureData]= useState(null);
  const [black,setblack]=useState(false);

  useEffect(()=>{
    const loadAll = async ()=>{
      //Pegando a lista total
      let list= await Tmbd.getHomeLis();
      setMovieList(list);
      //console.log(list)

      //Pegando o filme em destaque
      let originals= list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random()* (originals[0].items.results.length -1));
      let chosen = originals[0].items.results[randomChosen];
      //console.log(chosen);
      let chosenInfo= await Tmbd.getMovieInfo(chosen.id,'tv');
      console.log(chosenInfo)
      setfeatureData(chosenInfo);
    }
    loadAll();
  },[]);
  useEffect(()=>{
    const scrollListener = ()=>{
      if(window.scrollY > 10){
        setblack(true)
      }else{
        setblack(false)
      }
    }
    //quando houver qualquer evento de scroll, vai rodar essa função
    window.addEventListener('scroll',scrollListener);
    //remove esse monitoramento quando sairmos da pagina
    return ()=>{
      window.removeEventListener('scroll',scrollListener);
    }
  },[]);
  return (
    
    <div className="page">
      <Topo black={black}/>
      {featureData &&
        <FeatureMovie filme={featureData}/>
      }
      <section className="lists">
          {movieList.map((item,key)=>(
            <MovieRow key={key} title={item.title} items={item.items}/>
          ))}
      </section>
      <footer>
        Feito com amor pela B7Web
        <br/>
        Direitos de imagem para Netflix<br/>
        Dados oriundos do site Themoviedb.org

      </footer>
      {movieList <= 0 &&
      <div className="loading">
        <img src="https://www.filmelier.com/pt/br/news/wp-content/uploads/2020/03/netflix-loading.gif?x91507" alt="Carregando"/>
      </div>
      }
    </div>
  );
}
/*
<img width="512" height="256" alt="netflix loading" data-src="https://www.filmelier.com/pt/br/news/wp-content/uploads/2020/03/netflix-loading.gif?x91507" class="hero-blog hero-blog__img lazyloaded" src="https://www.filmelier.com/pt/br/news/wp-content/uploads/2020/03/netflix-loading.gif?x91507">*/

