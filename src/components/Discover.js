import React, {useState} from 'react'
import CourtItem from "./CourtItem"
import Filter from './Filter'
import CourtMap from './CourtMap'
import { Dropdown } from 'semantic-ui-react'

function Discover({courts, setCourts}){
    
    const [search, setSearch] = useState("")
    const [boroughSelect, setBoroughSelect] = useState("All")
    

    function handleSearchChange(e){
        setSearch(e.target.value)
    }

    function handleBoroughSelect(e){
        setBoroughSelect(e.target.value)
    }

    const filteredBorough = courts.filter((court) => {
        if (boroughSelect === "All") {
          return courts
        } else if (boroughSelect === "Brooklyn") {
          return court.borough === "Brooklyn"
        } else if (boroughSelect === "Queens") {
          return court.borough === "Queens"
        } else if (boroughSelect === "New York") {
          return court.borough === "New York"
        } else if (boroughSelect === "Bronx") {
            return court.borough === "Bronx"
        } else if (boroughSelect === "Staten Island") {
            return court.borough === "Staten Island"
        }
      });

    const courtSearch = filteredBorough.filter((court) => {
        return court.name.includes(search)
    })

    const renderCourtItems = courtSearch.map((court) => {
        return <CourtItem key={court.id} courtObj={court}/>
    })

    return (
        <div class="discover-container">
            {/* <Filter 
                search={search} 
                onSearchChange={handleSearchChange}
                onBoroughSelect={handleBoroughSelect}
            /> */}
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