import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Image, Icon } from 'semantic-ui-react' 
// semantic imports removed: Reveal

function CourtItem({courtObj, courtActivity }){

    const {id, name, address, borough, zip_code, condition, trains, img_url} = courtObj

    let fuegoActivity;
    if (courtObj.runs.length > 20) {
        fuegoActivity = <h3 class="hot-indicator activity-indicator">hot</h3>
    } else if (courtObj.runs.length > 10 && courtObj.runs.length < 20) {
        fuegoActivity = <h3 class="decent-indicator activity-indicator">decent</h3>
    } else if (courtObj.runs.length > 5 && courtObj.runs.length <= 10) {
        fuegoActivity = <h3 class="chill-indicator activity-indicator">chill</h3>
    } else if (courtObj.runs.length < 5) {
        fuegoActivity = <h3 class="slow-indicator activity-indicator">slow</h3>
    }


    return (
        <div class="court-item-wrapper">
            <div class="court-card-pic">   
                <img src={img_url} alt={name} class="court-item-image"></img>
            </div>
            <div class="court-card-info">
                <div> <Link to={`/courts/${id}`} className="court-card-name"> {name} </Link> </div>
                <div> {address}, {borough} {zip_code} </div>
                <div> {condition} </div>
                <div> {fuegoActivity} </div>
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

