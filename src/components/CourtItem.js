import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Image, Icon } from 'semantic-ui-react' 
// semantic imports removed: Reveal

function CourtItem({court, courtActivity }){

    const {id, name, address, borough, zip_code, condition, trains, img_url} = court

    let fuegoActivity;
    if (court.runs.length > 20) {
        fuegoActivity = <h3 class="hot-indicator activity-indicator">hot</h3>
    } else if (court.runs.length > 10 && court.runs.length < 20) {
        fuegoActivity = <h3 class="decent-indicator activity-indicator">decent</h3>
    } else if (court.runs.length > 5 && court.runs.length <= 10) {
        fuegoActivity = <h3 class="chill-indicator activity-indicator">chill</h3>
    } else if (court.runs.length < 5) {
        fuegoActivity = <h3 class="slow-indicator activity-indicator">slow</h3>
    }

    // let displayTrains;
    // if (findCourt.trains.length > 0) {
    //     displayTrains = findCourt.trains.map((train) => train).join(', ')
    // }

    return (
        <div class="court-item-wrapper">
            <img src={img_url} alt={name} class="court-item-image"></img>
           
            <div class="court-card-info">
                <Link to={`/courts/${id}`} className="court-card-name"> {name} </Link>
                <p class="court-address"> {address}, {borough} {zip_code} </p>
                <p class="court-item-trains"> <Icon color='blue' name='train'/> {trains.join(',  ')} </p>
                <div class="court-item-condition-activity"> 
                    <span class="court-item-condition"> {condition} </span>
                    <span class="court-item-activity"> {fuegoActivity} </span> 
                </div>
            </div>
            
        </div>
        // <Reveal animated='move up'>
        //     <Reveal.Content visible>
        //         <Image src={img_url} size='medium' />
        //     </Reveal.Content>
        //     <Reveal.Content hidden>
                // <Card id="court-card">
                //     <Card.Content>
                //         <Card.Header> 
                //             <Link to={`/courts/${id}`}>
                //                 {name}
                //             </Link> 
                //         </Card.Header>
                //         <Card.Description> {address}, {borough} NY {zip_code} </Card.Description>
                //         <Card.Description>
                //             <div class="item-condition">
                //                 <Icon name='fire'/>
                //                 <p class="court-item-condition">{condition}</p>
                //             </div>
                //         </Card.Description>
                //         <Card.Description>
                //             <Icon name='train'/>  <p class="court-item-condition">{trains}</p>
                //         </Card.Description>
                //     </Card.Content>
                // </Card>
        //     </Reveal.Content>
        // </Reveal>
        
    )
}


export default CourtItem;

