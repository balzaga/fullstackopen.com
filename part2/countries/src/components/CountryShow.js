import React, { useState } from 'react'
import Country from './Country'

const CountryShow = ({ country }) => {

    const [show, setShow] = useState(false)

    if (!show) {
        return (
            <div>{country.name.official}&nbsp;
                <button onClick={() => setShow(!show)}>
                    show
                </button>
            </div>
        )
    } else {
        return (
            <>
                <div>
                    {country.name.official}&nbsp;
                    <button onClick={() => setShow(!show)}>
                        don't show
                    </button>
                </div>
                <div>
                    <Country country={country} />
                </div>
            </>
        )

    }

}
export default CountryShow