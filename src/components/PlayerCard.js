import React from 'react' 

function PlayerCard({user}){

    const {name, height} = user
    console.log(user)
    return (
        <div class="player-card">
            <h1> {name} </h1>
        </div>
    )
}

export default PlayerCard;