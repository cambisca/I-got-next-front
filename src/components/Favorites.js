import React, {useEffect, useState} from 'react' 
import FavCard from './FavCard'


function Favorites({ currentUser, favorites, setFavorites }){

    
    console.log(currentUser.favorites)

    useEffect(() => {
        fetch(`http://localhost:3000/favorites`)
        .then(response => response.json())
        .then((data) => {
            setFavorites(data)
        })
    },[])

    console.log(currentUser)

    const renderFavorites = favorites.map((fav) => {
        return <FavCard court={fav.court}/>
    })

    return (
        <div>
            {renderFavorites}
        </div>
    )
}

export default Favorites;