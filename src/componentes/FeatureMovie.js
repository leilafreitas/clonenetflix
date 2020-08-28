import React from  'react';
import './FeatureMovie.css';

export default({filme})=>{
    //<a href="/watch/${filme.id}">Assistir</a>
    //<a href="/list/add/${filme.id}">Assistir</a>

    let firstDate= new Date(filme.first_air_date);
    let genres =[];
    for( let i of filme.genres){
        genres.push(i.name)
    }
    let description= filme.overview;
    if(description.length > 200){
        description = description.substring(0,200)+'...';
    }
    return (
       <section className="featured" style={{
        backgroundSize:'cover', 
        backgroundPosition: 'center',
        backgroundImage:`url(https://image.tmdb.org/t/p/original${filme.backdrop_path})`
       }}>
           <div className="featured--vertical">
               <div className="featured--horizontal">
                    <div className="featured--name">{filme.original_name}</div>
                    <div className="feature--info">
                        <div className="featured--points">{filme.vote_average} pontos</div>
                        <div className="featured--year">{firstDate.getFullYear()}</div>
                        <div className="featured--seasons">{filme.number_of_seasons} temporada{filme.number_of_seasons !== 1 ? 's':''}</div>
                    </div>
                    <div className="featured--description">
                        {description}
                    </div>
                    <div className="featured--button">
                        
                        <a href={`/watch/${filme.id}`} className="featured--watchbutton">Assistir</a>
                        <a href={`/list/add/${filme.id}`} className="featured--mylistbutton">+ Minha Lista</a>
                    </div>
                    <div className="featured--genres"> <strong>Gêneros:</strong>{genres.join(', ')}</div>
               </div>
               
            </div>
       </section>
    );
}