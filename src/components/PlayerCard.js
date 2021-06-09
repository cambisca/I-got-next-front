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
        <div class="fav-card">
            <div class="fav-image-box">
                <img src={image} class="fav-image"></img>
            </div>
    
            <div class="fav-name">
                <h3> {username} </h3>
                
            </div>

        </div>
        // <Card id="player-card">
        //     <Image src={image} wrapped ui={false} />
        //     <Card.Content>
        //     <Card.Header>{user.username}</Card.Header>
        //     <Card.Meta>
        //         <span className='date'>{user.position}</span>
        //     </Card.Meta>
        //     <Card.Description>
        //         {user.style}
        //     </Card.Description>
        //     </Card.Content>
        //     <Card.Content extra>
        //     <a>
        //         <Icon name='user' />
        //         {location}
        //     </a>
        //     </Card.Content>
        // </Card>
    )
}

export default PlayerCard;

