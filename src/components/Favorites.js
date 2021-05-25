import React, {useEffect} from 'react' 
import FavCard from './FavCard'


function Favorites({ favorites, setFavorites }){


    useEffect(() => {
        fetch(`http://localhost:3000/favorites`)
        .then(response => response.json())
        .then((data) => {
            setFavorites(data)
        })
    },[])

   function handleDeleteFav(id){
       const updatedArray = favorites.filter((fav) => {
           return fav.id !== id 
       })
       setFavorites(updatedArray)
   }

    // let renderFavorites
    // if (favorites.length > 0) { 
        const renderFavorites = favorites.map((fav) => {
            
            return <FavCard key={fav.id} court={fav.court} onDeleteFav={handleDeleteFav}/>
        })
    // } 
    

    return (
        <div class="fav-wrapper">
            <div>
                <h1 class="home-courts-header" align="center"> Home Courts </h1>
            </div>
            <div class="all-favs">
                {renderFavorites}
            </div>
            {/* <div class="ball-decal">
                <img src="https://cdn.wallpapersafari.com/44/12/9EuaTb.gif" class="decal-image"/>
            </div> */}
        </div>
        
    )
}

export default Favorites;