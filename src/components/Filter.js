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
            <div class="search-bar" align="center">
                {/* <input id="search-input" name="search" value={search} onChange={onSearchChange} placeholder = "Search..." />  */}
                <Input focus placeholder='Search...' value={search} onChange={onSearchChange}/>
            </div>
    
            <div class="borough-select">
                {/* <label class="borough-select-label"> Select a Borough </label>
                <select name="borough" onChange={onBoroughSelect}> 
                    <option value="All"> All </option>
                    <option value="Brooklyn"> Brooklyn </option>
                    <option value="Queens"> Queens </option>
                    <option value="New York"> Manhattan </option>
                    <option value="Bronx"> Bronx </option>
                    <option value="Staten Island"> Staten Island </option>
                </select> */}
                <Dropdown placeholder='Borough' fluid multiple selection options={options} />
            </div> 
        </div>
    )
}

export default Filter;