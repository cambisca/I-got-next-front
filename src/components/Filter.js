import React from 'react'

function Filter(){
    return (
        <div class="filter-wrapper">
            <div class="box1-filter-spacer">

            </div>
            <div class="search-bar">
                <input placeholder = "Search..." />
            </div>
    
            <div class="borough-select">
                <label > Select a Borough </label>
                <select > 
                    <option > Brooklyn </option>
                    <option > Queens </option>
                    <option > Manhattan </option>
                    <option > Bronx </option>
                    <option > Staten Island </option>
                </select>
            </div>
            <div class="box4-filter-spacer">

            </div>      
        </div>
    )
}

export default Filter;