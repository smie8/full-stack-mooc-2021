import React from 'react'

const Total = ({ parts }) => {

    const excercisesArr = parts.map(part => part.exercises)
    const sum = excercisesArr.reduce((a, b) => {
        return a + b
    })

    return (
      <b> 
        Total of excercises {sum}
      </b>
    )
}

export default Total