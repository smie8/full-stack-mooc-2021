import React from 'react'

const Numbers = ({ searchResults, handleDelete }) => {
    return (
        <div>
            <h2>Numbers</h2>
            {searchResults.map(person => 
                <div key={person.name}>
                    {person.name}: {person.number}
                    <button onClick={() => handleDelete(person.id)}>delete</button>
                </div>)}
        </div>
    )
}

export default Numbers