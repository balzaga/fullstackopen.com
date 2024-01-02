const Person = ({ person }) => {
    return (
      <li key='{person.id}'>{person.name} - {person.telephone}</li>
    )
  }
  
  export default Person