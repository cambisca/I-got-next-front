import React from 'react'

function Filter({search, onSearchChange, onBoroughSelect}){
    return (
        <div class="filter-wrapper">
            <div class="box1-filter-spacer">

            </div>
            <div class="search-bar">
                <input name="search" value={search} onChange={onSearchChange} placeholder = "Search..." />
            </div>
    
            <div class="borough-select">
                <label > Select a Borough </label>
                <select name="borough" onChange={onBoroughSelect}> 
                    <option value="All"> All </option>
                    <option value="Brooklyn"> Brooklyn </option>
                    <option value="Queens"> Queens </option>
                    <option value="New York"> Manhattan </option>
                    <option value="Bronx"> Bronx </option>
                    <option value="Staten Island"> Staten Island </option>
                </select>
            </div>
            <div class="box4-filter-spacer">

            </div>      
        </div>
    )
}

export default Filter;