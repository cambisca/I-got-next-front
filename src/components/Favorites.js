import React, {useEffect, useState} from 'react' 
import FavCard from './FavCard'


function Favorites({ currentUser, favorites, setFavorites }){

    
    console.log(favorites)

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

//    let displayCourtsHoopers
//     if (findCourt.name != ""){
//         displayCourtsHoopers = runs.map((run) => {
//             console.log(run.user)
//             return <PlayerCard user={run.user}/>
//     })
//     }

    let renderFavorites
    if (favorites != []) { 
        const renderFavorites = favorites.map((fav) => {
            return <FavCard key={fav.id} fav={fav} onDeleteFav={handleDeleteFav}/>
        }
    )} else {
        return <h1>No Favs</h1>
        } 
    

    return (
        <div>
            {renderFavorites}
        </div>
    )
}

export default Favorites;