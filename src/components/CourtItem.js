import React from 'react'

function CourtItem({courtObj}){

    const {name, address, borough, zip_code, condition, trains, img_url} = courtObj
    return (
        <div class="court-list-item">
            <div class="court-thumbnail-box">
                <img src={img_url} alt={name} class="court-thumbnail-image"></img>
            </div>
            <div class="court-detail-box">
                <h1> {name} </h1>
                <h2> {address}, {borough} {zip_code} </h2>
                <h3> condition: {condition} </h3>
                <h4> Nearby trains: {trains} </h4>
            </div>
           
        </div>
    )
}


export default CourtItem;

