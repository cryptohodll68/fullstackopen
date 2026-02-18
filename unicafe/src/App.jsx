import { useState } from 'react'
const Button = (props) => <><button onClick={props.onClick}>{props.text}</button></>
const StatisticLine = (props) =><li>{props.text}: {props.value}</li> 
const Statistics = (props) => {
  if(props.good | props.neutral | props.bad){
  return (
    <>
      <ul>
        <StatisticLine text='good' value={props.good}></StatisticLine>
        <StatisticLine text='neutral'value={props.neutral}></StatisticLine>
        <StatisticLine text='bad'value={props.bad}></StatisticLine>
        <StatisticLine text='all'value={props.all}></StatisticLine>
        <StatisticLine text='average'value={props.avg}></StatisticLine>
        <StatisticLine text='positive'value={props.positive}></StatisticLine>
   
     </ul>
     </>  
  )} else {
    return(
      <div>No feedback given</div>
      
      
    )
  }

}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => {
    const newGood = good + 1
    setGood(newGood)
  }
   const addNeutral = () => {
    const newNeutral = neutral + 1
    setNeutral(newNeutral)
  }
   const addBad = () => {
    const newBad = bad + 1
    setBad(newBad)
  }
  const all = good + bad + neutral
  let avg = 0
  let positive = 0
  if(all !== 0){
    avg = ((good-bad)/all)
    positive = ((good/all)*100) 
  }
     

  return (
    <div>
      Give Feedback 
      <div>
      <Button text='good' onClick = {addGood}></Button>
      <Button text='neutral' onClick = {addNeutral}></Button>
      <Button text='bad' onClick = {addBad}></Button>
      </div>
      Statistics
      <Statistics good={good} neutral={neutral} bad={bad} all={all} avg={avg} positive={positive}></Statistics>
    </div>
  )
}

export default App