const Person = ({ person, deletePerson}) => {
  return (
      <li key={person.id}>
        {person.name} {person.number}&nbsp;
        <button onClick={() => deletePerson(person.id)}>delete</button>
      </li>
    )
  }
export default Person