import React, {useState} from 'react'
import CourtItem from "./CourtItem"
import Filter from './Filter'
import CourtMap from './CourtMap'
import { Dropdown } from 'semantic-ui-react'
import Header from './Header'

function Discover({courts, courtActivity, search, setSearch, setBoroughSelect, courtSearch, displayTrains, findCourt}){
    

    function handleSearchChange(e){
        setSearch(e.target.value)
    }

    function handleBoroughSelect(e){
        setBoroughSelect(e.target.value)
    }


    const renderCourtItems = courtSearch.map((court) => {
        return <CourtItem key={court.id} court={court} courtActivity={courtActivity} findCourt={findCourt} displayTrains={displayTrains} />
    })

    return (
        <div class='discover-wrapper'>
            <Header />
            <div class="discover-container">
                <div class="map-container">
                    <CourtMap courts={courtSearch}/>
                </div>
                <Filter 
                        search={search} 
                        onSearchChange={handleSearchChange}
                        onBoroughSelect={handleBoroughSelect}
                />

                <div id="court-item-list">
                    {renderCourtItems}
                </div>
                    
                    
            </div>
        </div>
    )
}

export default Discover;