import React from 'react' 
// import { Card, Icon, Image } from 'semantic-ui-react'

function PlayerCard({user}){

    return (
        <div>
            <h1>
                {user.name}
            </h1>
        </div>
        // <Card className="player-card">
        //     <Image src='https://fansided.com/wp-content/uploads/getty-images/2020/04/1137840592.jpeg' wrapped ui={false} className="player-card-image"/>
        //     <Card.Content>
        //     <Card.Header>{user.name}</Card.Header>
        //     <Card.Meta>
        //         <span className='date'>{user.username}</span>
        //     </Card.Meta>
        //     <Card.Description>
        //         {user.location}
        //     </Card.Description>
        //     </Card.Content>
        //     <Card.Content extra>
        //     <a>
        //         <Icon name='user' />
        //         22 Friends
        //     </a>
        //     </Card.Content>
        // </Card>
    )
}

export default PlayerCard;