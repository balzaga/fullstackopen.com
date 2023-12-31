import Header from './Header'
import Total from './Total'
import Content from './Content'

const Course  = ({ course }) => {
    const totalExercises = course.parts.map(part => part.exercises).reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total sum={totalExercises} />
        </div>
    )
}

export default Course