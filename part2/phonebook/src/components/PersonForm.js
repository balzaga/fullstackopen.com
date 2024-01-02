const PersonForm = (props) => {
    return (
        <form onSubmit={props.addPerson}>
            <table>
                <tbody>
                    <tr>
                        <td>Name:</td>
                        <td><input id="name" value={props.newName} onChange={props.handleNameChange} /></td>
                    </tr>
                    <tr>
                        <td>Telephone number:</td>
                        <td><input value={props.newTelephone} onChange={props.handleTelephoneChange} /></td>
                    </tr>
                </tbody>
            </table>
            <div>
                <button type="submit">add person</button>
            </div>
        </form>
    )
}
export default PersonForm