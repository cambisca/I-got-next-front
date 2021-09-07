import React from 'react'
import { Dropdown, Input } from 'semantic-ui-react'


function Filter({search, onSearchChange, onBoroughSelect}){

    const options = [
        {key: "Bronx", text: "Bronx", value: "Bronx"},
        {key: "Brooklyn", text: "Brooklyn", value: "Brooklyn"}, 
        {key: "Manhattan", text: "Manhattan", value: "Manhattan"}, 
        {key: "Queens", text: "Queens", value: "Queens"}, 
        {key: "Staten Island", text: "Staten Island", value: "Staten Island"}
    ]


    return (
        <div class="filter-wrapper">
            <div className="borough-select" align="center">
                <input focus placeholder='Search...' value={search} onChange={onSearchChange}/>
            </div>
    
            <div class="borough-select" >
                <select className="dropdown-content" name="borough" onChange={onBoroughSelect}> 
                    <option > Borough </option>
                    <option value="All"> All </option>
                    <option value="Bronx"> Bronx </option>
                    <option value="Brooklyn"> Brooklyn </option>
                    <option value="New York"> Manhattan </option>
                    <option value="Queens"> Queens </option>
                    <option value="Staten Island"> Staten Island </option>
                </select>
            </div> 
        </div>
    )
}

export default Filter;