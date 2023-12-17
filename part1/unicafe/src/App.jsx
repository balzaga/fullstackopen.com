import { useState } from 'react'

const Headers = ({ text }) => <div><h1>{text}</h1></div>

const Button = ({onSmash, text}) => <button onClick={onSmash}>{text}</button>

const Display = ({ text, counter, isPercent }) => <div>{text} {counter} {isPercent=="true"?"%":""}</div>

const Statistics = ({ text, good, neutral, bad }) => {
  let result = 0
  let isPercent = false;
  if(text=="all"){
    result = good + neutral + bad
  }
  if(text=="average"){
    result = (good + neutral + bad)>0?100*(good-bad)/(good + neutral + bad):0
  }
  if(text =="positive") {
    isPercent = true
    result=(good)>0?100*good/(good + neutral + bad):0
  }

  return (
    <div>
      {text} {result} {isPercent==true?"%":""}
    </div>
  )
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  return (
    <div>
      <Headers text="give feedback" />
      <Button text="good"  onSmash={increaseGood}/>
      <Button text="neutral"  onSmash={increaseNeutral}/>
      <Button text="bad"  onSmash={increaseBad}/>
      <Headers text="statistics" />
      <Display text="good" counter={good} />
      <Display text="neutral" counter={neutral} />
      <Display text="bad" counter={bad} />
      <Statistics text="all" good={good} neutral={neutral} bad={bad} />
      <Statistics text="average" good={good} neutral={neutral} bad={bad}  />
      <Statistics text="positive" good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App