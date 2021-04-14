import React from 'react'

const FilterBox = ({ searchName, handleSearchNameChange }) => {
    return (
        <div>
            filter shown with <input value={searchName} onChange={handleSearchNameChange} />
        </div>
    )
}

export default FilterBox
