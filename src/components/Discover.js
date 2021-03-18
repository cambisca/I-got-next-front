import React, {useState, useEffect} from 'react'
import CourtItem from "./CourtItem"

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
        return <CourtItem courtObj={court}/>
    })

    return (
        <div class="discover-container">
            {renderCourtItems}
        </div>
    )
}

export default Discover;