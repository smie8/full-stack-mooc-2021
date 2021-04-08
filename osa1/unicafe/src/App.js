import React, { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.event}>
      {props.text}
    </button>
  )
}

const Statistics = (props) => {
  if (props.total > 0) {
    return (
      <div>
        <h2>statistics</h2>
        <table>
          <tbody>
            <StatisticLine  text="good" value={props.good} />
            <StatisticLine  text="neutral" value={props.neutral} />
            <StatisticLine  text="bad" value={props.bad} />
            <StatisticLine  text="all" value={props.total} />
            <StatisticLine  text="average" value={((props.good * 1) + (props.bad * (-1))) / props.total} />
            <StatisticLine  text="positive" value={props.good / props.total * 100 + ' %'} />
          </tbody>
        </table>
      </div>
    )
  } else {
    return (
      <div>
        <h2>statistics</h2>
        <p>no feedback given.</p>
      </div>
    )
  }

}

const StatisticLine  = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const handleClickGood = () => {
    setGood(good + 1)
    setTotal(total + 1)
  }

  const handleClickNeutral = () => {
    setNeutral(neutral + 1)
    setTotal(total + 1)
  }

  const handleClickBad = () => {
    setBad(bad + 1)
    setTotal(total + 1)
  }

  return (
    <div>
      <h2>give feedback</h2>
      <div>
        <Button text={'good'} event={handleClickGood} />
        <Button text={'neutral'} event={handleClickNeutral} />
        <Button text={'bad'} event={handleClickBad} />
      </div>

      <Statistics good={good} neutral={neutral} bad={bad} total={total} />
    </div>
  )
}

export default App