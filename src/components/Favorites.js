import React, {useEffect, useState} from 'react' 
import FavCard from './FavCard'


function Favorites({ currentUser, favorites, setFavorites }){

    
    

    useEffect(() => {
        fetch(`http://localhost:3000/favorites`)
        .then(response => response.json())
        .then((data) => {
            setFavorites(data)
        })
    },[])

    console.log(favorites)

    const renderFavorites = favorites.map((fav) => {
        return <FavCard court={fav.court}/>
    })

    console.log(currentUser)
    return (
        <div>
            {renderFavorites}
        </div>
    )
}

export default Favorites;