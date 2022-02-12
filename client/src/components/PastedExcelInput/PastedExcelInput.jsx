import { useEffect, useRef, useState } from "react";
import './pasted-excel-input.css'

const PastedExcelInput = (props) => {
    const [pastedData, setPastedData] = useState('')
    const [validationWarning, setValidationWarning] = useState(false)
    const inputRef = useRef(null);


    const onPaste = (e) => {
        if (validation(e)) {
            setValidationWarning(false)
            return setPastedData(e.target.value)
        }
        setValidationWarning(true)
        return setPastedData('')
    };

    const validation = (e) => {
        let rows = e.target.value.split(' ')
            .map(row => {
                let cell = row.split('	')
                return cell;
            })
        let firstRow = [...rows[0]]
        const uniqueColumnsNamesValidation = new Set(firstRow)
        return uniqueColumnsNamesValidation.size === firstRow.length
    };

    useEffect(() => {
        props.data(pastedData)
    }, [pastedData, props])

    useEffect(() => {
        inputRef.current.focus();
    }, [])


    return (
        <>
            <div className="get-input">
            <div className='instructions'>you can easily create the plot you need, try it out!</div>
                <label htmlFor="getData">Paste Your Data from Excel Here: </label>
                <input ref={inputRef} id="getData" onChange={(e) => onPaste(e)} />
                {validationWarning && <div style={{ color: 'red' }}>Columns names must be unique</div>}
            </div>
        </>
    )
}

export default PastedExcelInput;