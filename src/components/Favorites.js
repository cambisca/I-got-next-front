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

   
    const renderFavorites = favorites.map((fav) => {
        return <FavCard key={fav.id} favId={fav.id} court={fav.court} favorites={favorites} setFavorites={setFavorites} courts={courts}/>
    })
    

    return (
        <div class="fav-wrapper">
            <div class="home-courts-header" align="center">
                <h1 id="fav-header" class="court-detail-headers" align="center"> Home Courts </h1>
            </div>
            <div class="all-favs" align="center">
                {favorites.length <= 0 ? <h3 class="no-favs"> You have no favorite courts. </h3> : renderFavorites }
            </div>
        </div>
        
    )
}

export default Favorites;