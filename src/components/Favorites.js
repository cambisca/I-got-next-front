import React, {useEffect, useState} from 'react' 
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
            return <FavCard key={fav.id} fav={fav} onDeleteFav={handleDeleteFav}/>
        })
    // } 
    

    return (
        <div>
           {renderFavorites}
        </div>
    )
}

export default Favorites;