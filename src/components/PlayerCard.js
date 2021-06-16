import React from 'react' 
import { Card, Icon, Image } from 'semantic-ui-react'

function PlayerCard({user}){
    const { image, username, style, height, location, position, age } = user

    const extra = (
        <a>
          <Icon name='location arrow' />
          {location}
        </a>
      )

    return (
        <div class="fav-card" aling="center">
            <div class="fav-image-box">
                <img class="fav-image" src={image} ></img>
            </div>
    
            <div class="fav-name">
                <h3 class="fav-card-text"> {username} </h3>
                <h3 class="fav-card-text"> {position} </h3>
            </div>

        </div>
    )
}

export default PlayerCard;

