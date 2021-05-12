import React from 'react' 
import { Link } from 'react-router-dom'
import { Card, Image, Reveal, Icon, Button } from 'semantic-ui-react'

function FavCard({court, onDeleteFav}){

    const {id, name, address, borough, zip_code, condition, trains, img_url} = court
  

    function handleDeleteClick(){
        fetch(`http://localhost:3000/favorites/${id}`, {
            method: 'DELETE',
        })
        .then(resp => resp.json)
        .then(onDeleteFav(id))
        onDeleteFav(id)
    }

    return (
        <div class="fav-card-container">
            <Reveal animated='move up'>
                <Reveal.Content visible>
                    <Image src={img_url} size='medium' />
                </Reveal.Content>
                <Reveal.Content hidden>
                    {/* <Card
                        header={<Link to={`/courts/${id}`}> {name}</Link>}
                        meta={borough}
                        description={<Icon name='fire' /> {condition}}
                    /> */}
                    <Card id="court-card">
                        <Card.Content>
                            <Card.Header> 
                                <Link to={`/courts/${id}`}>
                                    {name}
                                </Link> 
                            </Card.Header>
                            <Card.Description> {address}, {borough} NY {zip_code} </Card.Description>
                            <Card.Description>
                                <Icon name='fire'> <p class="court-item-condition">{condition}</p> </Icon>
                            </Card.Description>
                            <Card.Description>
                                <Icon name='train'/>  <p class="court-item-condition">{trains}</p>
                            </Card.Description>
                            <Button class="delete-fav-button" onClick={handleDeleteClick}> Delete </Button>
                        </Card.Content>
                    </Card>
                </Reveal.Content>
            </Reveal>
        </div>
        
        // <div>
        //     {court.name}
        //     <button class="delete-fav-button" onClick={handleDeleteClick}> Delete </button>
        // </div>
    )
}

export default FavCard;