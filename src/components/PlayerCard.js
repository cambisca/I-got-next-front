import React from 'react' 

function PlayerCard({user}){

    const {name, username, height} = user

    return (
        <div class="player-card">
            <h1> {username} </h1>
        </div>
    )
}

export default PlayerCard;