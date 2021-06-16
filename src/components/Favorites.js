import React, {useEffect} from 'react' 
import FavCard from './FavCard'


function Favorites({ courts, favorites, setFavorites }){

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

//    function handleDeleteFavCard(id){
//        const favCardToDelete = renderFavorites.filter(fav => fav.key.parseInt() !== id)
//    }
   
    const renderFavorites = favorites.map((fav) => {
        return <FavCard key={fav.id} court={fav.court} onDeleteFav={handleDeleteFav} courts={courts}/>
    })
    

    return (
        <div class="fav-wrapper">
            <div class="home-courts-header" align="center">
                <h1 class="court-detail-headers" align="center"> Home Courts </h1>
            </div>
            <div class="all-favs" align="center">
                {renderFavorites}
            </div>
        </div>
        
    )
}

export default Favorites;