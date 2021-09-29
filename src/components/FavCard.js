import React from 'react' 
import { Link } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'

function FavCard({favId, court, onDeleteFav, courts, favorites, setFavorites}){

    const {name, img_url} = court

    const favCourtObj = courts.find(c => c.id === court.id)

    function favDeleteRequest(){
        fetch(`http://localhost:3000/favorites/${favId}`,{
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(handleDeleteFav(favId))
    }

   function handleDeleteFav(id){
       const updatedArray = favorites.filter((fav) => {
           return fav.id !== id 
       })
       setFavorites(updatedArray)
   }

    let favActivity;
    if (favCourtObj.runs.length > 20 && favCourtObj.runs.length < 30) {
        favActivity = <h3 class="hot-indicator activity-indicator">hot</h3>
    } else if (favCourtObj.runs.length > 10 && favCourtObj.runs.length < 20) {
        favActivity = <h3 class="decent-indicator activity-indicator">decent</h3>
    } else if (favCourtObj.runs.length > 5 && favCourtObj.runs.length <= 10) {
        favActivity = <h3 class="chill-indicator activity-indicator">chill</h3>
    } else if (favCourtObj.runs.length < 5) {
        favActivity = <h3 class="slow-indicator activity-indicator">slow</h3>
    }

    return (
        <div class="fav-card" align="center">
            <div class="fav-image-box">
                <img src={img_url} alt={name} class="fav-image"></img>
            </div>
            
            <Link to={`/courts/${court.id}`} className="fav-card-text"> <h3> {name} </h3> </Link>
            
            <span> {favActivity} </span>
            <a class="delete-fav-a" onClick={favDeleteRequest}> <Icon name='trash' color='grey'/> </a>

        </div>
    )
}

export default FavCard;