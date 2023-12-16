import { useState } from 'react'

const Header = (props) => {
  console.log('Header: ', props)
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Part = (props) => {
  console.log('Part: ', props)
  return (
    <>
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    </>
  )
}

const Content = (props) => {
  console.log('Content: ', props.parts)
  return (
    <>
      <Part part={props.parts[0]} />
      <Part part={props.parts[1]} />
      <Part part={props.parts[2]} />
    </>
  )
}

const Total = (props) => {
  console.log('Total: ', props)
  return (
    <>
      <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    </>
  )
}

const Hello = ({ name, age }) => {

  const bornYear = () => new Date().getFullYear() - age;

  return (
    <div>
      <p>
        Hola {name}, tienes {age} años, por lo que tú probablemente naciste en {bornYear()}</p>
    </div>
  )
}

const Display = ({ counter }) => <div>Contador: {counter}</div>


const Button = ({onSmash, text}) => <button onClick={onSmash}>{text}</button>

const App = () => {
  const [ counter, setCounter ] = useState(0)

  const increaseByOne = () => setCounter(counter + 1)
  const setToZero = () => setCounter(0)
  const decreaseByOne = () => setCounter(counter -1)

  const handleClick = () => {
    console.log('clicked')
  }
  
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
  const name = 'Peter'
  const age = 49

  console.log('rendering...', counter)

  return (
    <>
      <div>
        <Header course={course} />
        <Content parts={parts} />
        <Total parts={parts} />
      </div>
      <Hello name={name} age={age} />
      <Display counter={counter}/>
      <Button text="Añade al contador"  onSmash={increaseByOne}/>
      <Button text="Resetea contador"  onSmash={setToZero}/>
      <Button text="Resta al contador"  onSmash={decreaseByOne}/>
    </>
  )
}

export default App