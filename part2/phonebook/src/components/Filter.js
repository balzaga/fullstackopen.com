const Filter = (props) => {


    return (
        <table>
            <tbody>
                <tr>
                    <td>Filter shown with:</td>
                    <td><input value={props.filter} onChange={props.handleFilterChange} /></td>
                </tr>
            </tbody>
        </table>

    )
}

export default Filter
