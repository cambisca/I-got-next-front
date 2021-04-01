import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Image, Reveal, Icon } from 'semantic-ui-react'

function CourtItem({courtObj}){

    const {id, name, address, borough, zip_code, condition, trains, img_url} = courtObj
    return (
        
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
                            <div class="item-condition">
                                <Icon name='fire'/>
                                <p class="court-item-condition">{condition}</p>
                            </div>
                        </Card.Description>
                        <Card.Description>
                            <Icon name='train'/>  <p class="court-item-condition">{trains}</p>
                        </Card.Description>
                    </Card.Content>
                </Card>
            </Reveal.Content>
        </Reveal>
        
    )
}


export default CourtItem;

