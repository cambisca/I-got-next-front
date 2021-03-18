import React, {useState, useEffect} from 'react'
import CourtItem from "./CourtItem"
import Filter from './Filter'

function Discover(){
    const [courts, setCourts] = useState([])

    useEffect(()=>{
        fetch(`http://localhost:3000/courts`)
        .then((response) => response.json())
        .then(data => {
            setCourts(data)
        })
    },[])

    console.log(courts)

    const renderCourtItems = courts.map((court) => {
        return <CourtItem key={court.id} courtObj={court}/>
    })

    return (
        <div class="discover-container">
            <Filter />
            <div class="list-map-container">
                <div class="empty-spacer">

                </div>
                <div class="court-list">
                    {renderCourtItems}
                </div>
                <div class="map-box">
                    MAP
                </div>
            </div>
        </div>
    )
}

export default Discover;