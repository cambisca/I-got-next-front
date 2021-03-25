import React from 'react' 

function FavCard({fav, onDeleteFav}){

    const {id, court} = fav

    function handleDeleteClick(){
        fetch(`http://localhost:3000/favorites/${id}`, {
            method: 'DELETE',
        })
        .then(resp => resp.json)
        .then(onDeleteFav(id))
        onDeleteFav(id)
    }

    return (
        <div>
            {court.name}
            <button class="delete-fav-button" onClick={handleDeleteClick}> Delete </button>
        </div>
    )
}

export default FavCard;