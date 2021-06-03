import React from 'react' 
import { Link } from 'react-router-dom'
import { Card, Image, Reveal, Icon, Button } from 'semantic-ui-react'

function FavCard({court, onDeleteFav, courts}){

    const {id, name, address, borough, zip_code, condition, trains, img_url} = court

    const favCourtObj = courts.find(court => court.id === id)

    function handleDeleteClick(){
        fetch(`http://localhost:3000/favorites/${id}`, {
            method: 'DELETE',
        })
        .then(resp => resp.json)
        .then(onDeleteFav(id))
        onDeleteFav(id)
    }

    let favActivity;
    if (favCourtObj.runs.length > 40) {
        favActivity = "🔥🔥🔥🔥🔥"
    } else if (favCourtObj.runs.length > 20 && favCourtObj.runs.length < 30) {
        favActivity = "🔥🔥🔥🔥"
    } else if (favCourtObj.runs.length > 10 && favCourtObj.runs.length < 20) {
        favActivity = "🔥🔥🔥"
    } else if (favCourtObj.runs.length > 5 && favCourtObj.runs.length <= 10) {
        favActivity = "🔥🔥"
    } else if (favCourtObj.runs.length < 5) {
        favActivity = "🔥"
    }

    return (
        // <div class="fav-card-container" align="center">
            <div class="fav-card" align="center">
                <div class="fav-image-box">
                    <img src={img_url} alt={name} class="fav-image"></img>
                </div>
                
                <div class="fav-name">
                    <p class="fav-card-text">
                        <Link to={`/courts/${id}`} className="fav-card-text"> {name} </Link>
                    </p>
                    <p> {favActivity} </p>
                </div>

            </div>

        // </div>
        
        // <div>
        //     {court.name}
        //     <button class="delete-fav-button" onClick={handleDeleteClick}> Delete </button>
        // </div>
    )
}

export default FavCard;