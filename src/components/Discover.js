import React, {useState} from 'react'
import CourtItem from "./CourtItem"
import Filter from './Filter'
import CourtMap from './CourtMap'
import { Dropdown } from 'semantic-ui-react'

function Discover({courts, courtActivity, search, setSearch, setBoroughSelect, courtSearch}){
    

    function handleSearchChange(e){
        setSearch(e.target.value)
    }

    function handleBoroughSelect(e){
        setBoroughSelect(e.target.value)
    }


    const renderCourtItems = courtSearch.map((court) => {
        return <CourtItem key={court.id} courtObj={court} courtActivity={courtActivity}/>
    })

    return (
        <div class="discover-container">

            <div class="map-container-wrapper">
                <div class="map-container">
                    <CourtMap courts={courtSearch}/>
                </div>
                <Filter 
                        search={search} 
                        onSearchChange={handleSearchChange}
                        onBoroughSelect={handleBoroughSelect}
                />
            </div>
            
                
            <div id="court-item-list">
                {renderCourtItems}
            </div>
                
                
        </div>
    )
}

export default Discover;