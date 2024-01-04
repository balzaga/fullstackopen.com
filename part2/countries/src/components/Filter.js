const Filter = (props) => {
    return (
        <table>
            <tbody>
                <tr>
                    <td>Find countries:</td>
                    <td><input value={props.filter} onChange={props.handleFilterChange} /></td>
                </tr>
            </tbody>
        </table>
    )
}
export default Filter